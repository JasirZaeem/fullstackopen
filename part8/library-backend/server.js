const { v1: uuid } = require("uuid");
const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const config = require("./utils/config");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-errors");

const { MONGO_URI, JWT_SECRET } = config;

console.info("Connecting to database");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.info("Connected to database");
  })
  .catch((error) => {
    console.error("Failed to connect", { error });
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favouriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Author: {
    bookCount: (root) =>
      Book.countDocuments({
        author: root.id,
      }),
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),

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

      let author = await Author.findOne({ name: args.author });
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
        return book.save();
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req?.headers.authorization;
    if (auth?.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      return { currentUser: await User.findById(decodedToken.id) };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
