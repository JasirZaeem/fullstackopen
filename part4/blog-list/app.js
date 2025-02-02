const config = require("./utils/config");

const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

// Utils

const logger = require("./utils/logger");

// Routes

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const authRouter = require("./controllers/auth");

// Middlewares

const getToken = require("./middlewares/getToken");

const mongoUrl = config.MONGO_URI;

logger.info("Connecting to database");

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("Connected to database");
  })
  .catch((error) => {
    logger.error("Failed to connect", { error });
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(getToken);
// Blogs route, /api/blogs

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).json({ error: "malformed id" });
  } else if (err.name === "ValidationError") {
    if (err?.errors?.username?.kind === "unique") {
      return res.status(409).json({ error: "username must be unique" });
    }
    return res.status(400).json({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "invalid token",
    });
  } else if (err.name === "AuthError") {
    return res.status(401).json({ error: err.message });
  }

  next(err);
};

app.use(errorHandler);

module.exports = app;
