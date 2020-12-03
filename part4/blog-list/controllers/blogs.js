const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// For domain/api/blogs

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const { title, author, url, likes = 0 } = req.body;

  if (!title || !url) {
    return res.status(400).end();
  }

  const blog = new Blog({ title, author, url, likes });
  const savedBlog = await blog.save();
  return res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  return res.status(304).end();
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
