require("dotenv").config();

const PORT = process.env.PORT;
let MONGO_URI = process.env.MONGO_URI;

if (process.env.NODE_ENV === "test") {
  MONGO_URI = process.env.TEST_MONGO_URI;
}

module.exports = {
  PORT,
  MONGO_URI,
};
