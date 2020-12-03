const config = require("./utils/config");

const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

// Utils

const logger = require("./utils/logger");

// Routes

const blogsRouter = require("./controllers/blogs");

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

// Blogs route, /api/blogs

app.use("/api/blogs", blogsRouter);

module.exports = app;
