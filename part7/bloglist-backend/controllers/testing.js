const testingRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const initialBlogs = require("../tests/utls/sampleBlogList");
const initialUsers = require("../tests/utls/sampleUserList");

testingRouter.post("/reset", async (req, res, next) => {
  try {
    await Promise.all([Blog.deleteMany({}), User.deleteMany({})]);
    await Promise.all([
      Blog.insertMany(initialBlogs),
      User.insertMany(initialUsers),
    ]);
    res.status(200).json({message: "database reset"});
  } catch (e) {
    next(e);
  }
});

module.exports = testingRouter;
