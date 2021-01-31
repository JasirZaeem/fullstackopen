const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const { UserInputError, AuthenticationError } = require("apollo-server-errors");

exports.resolvers = {
  Author: {
    bookCount: (root) =>
      Book.countDocuments({
        author: root.id,
      }),
  },

  Query: {
    authorCount: () => Author.collection.countDocuments(),

    allBooks: (root, args) => {
      if (args.genre) {
        return Book.find({
          genres: { $all: [args.genre.toLowerCase()] },
        }).populate("author", {
          name: 1,
          born: 1,
        });
      }

      return Book.find({}).populate("author", { name: 1, born: 1 });
    },

    allAuthors: () => Author.find({}),

    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let author = await Author.findOneAndUpdate(
        { name: args.author },
        { $inc: { bookCount: 1 } },
        { new: true }
      );
      try {
        if (!author) {
          author = new Author({ name: args.author });

          author = await author.save();
        }
      } catch (e) {
        if (e?.errors?.name?.kind === "unique") {
          throw new UserInputError(
            `Author name must be unique, ${args.title} exists`
          );
        }
        if (e?.errors?.name?.kind === "minlength") {
          throw new UserInputError(
            "Author name must be longer than 4 characters"
          );
        }
        throw new UserInputError(e);
      }
      const book = new Book({
        ...args,
        genres: args.genres.map((g) => g.toLowerCase()),
        author,
      });

      try {
        await book.save();
      } catch (e) {
        if (e?.errors?.title?.kind === "unique") {
          throw new UserInputError(
            `Book title must be unique, ${args.title} exists`
          );
        }
        if (e?.errors?.title?.kind === "minlength") {
          throw new UserInputError(
            "Book title must be longer than 2 characters"
          );
        }
        throw new UserInputError(e);
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const updatedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { $set: { born: args.setBornTo } },
        { new: true }
      );

      if (updatedAuthor) {
        return updatedAuthor;
      } else {
        return null;
      }
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });
      try {
        return user.save();
      } catch (e) {
        if (e?.errors?.username?.kind === "unique") {
          throw new UserInputError(
            `Username must be unique, ${args.title} exists`
          );
        }

        if (e?.errors?.username?.kind === "minlength") {
          throw new UserInputError("Username must be longer than 3 characters");
        }
        throw new UserInputError(e);
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};
