const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const authenticated = require("../middlewares/authenticated");

// For domain/api/blogs

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return res.json(blogs);
});

blogsRouter.post("/", authenticated, async (req, res, next) => {
  try {
    const { title, author, url, likes = 0 } = req.body;

    if (!title || !url) {
      return res.status(400).end();
    }

    const user = await User.findById(req.user.id);
    const blog = new Blog({ title, author, url, likes, user: user._id });
    const savedBlog = await blog.save();
    user.blogs = [...user.blogs, blog._id];
    await user.save();
    return res.status(201).json(savedBlog);
  } catch (e) {
    next(e);
  }
});

blogsRouter.delete("/:id", authenticated, async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(204).end();
    }
    if (blog.user.toString() !== req.user.id) {
      return next({
        name: "AuthError",
        message: "You are not authorized to delete this blog",
      });
    }

    const [user] = await Promise.all([
      User.findById(req.user.id),
      Blog.findByIdAndDelete(req.params.id),
    ]);

    user.blogs = user.blogs.filter((blog) => blog.toString() !== req.params.id);

    await user.save();

    return res.status(204).end();
  } catch (e) {
    next(e);
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;

  const fieldsToUpdate = Object.entries({ title, author, url, likes }).reduce(
    (toUpdate, [field, value]) => {
      if (value !== undefined) {
        toUpdate[field] = value;
      }
      return toUpdate;
    },
    {}
  );

  const updatedPost = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: fieldsToUpdate },
    { new: true }
  );

  return res.status(201).json(updatedPost);
});

module.exports = blogsRouter;
