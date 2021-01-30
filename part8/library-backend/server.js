const config = require("./utils/config");
const { MONGO_URI, JWT_SECRET } = config;

const mongoose = require("mongoose");
const User = require("./models/user");

const jwt = require("jsonwebtoken");

const { ApolloServer } = require("apollo-server");

const { typeDefs } = require("./typedefs");
const { resolvers } = require("./resolvers");

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
