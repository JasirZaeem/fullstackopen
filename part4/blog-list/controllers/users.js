const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// For domain/api/users

usersRouter.get("/", async (req, res) => {
  return res.json(
    await User.find({}).populate("blogs", { url: 1, title: 1, author: 1 })
  );
});

usersRouter.post("/", async (req, res, next) => {
  try {
    let { username, name, password } = req.body;

    username = username?.trim();
    name = name?.trim();

    if (!username || !name || !password) {
      return next({
        name: "ValidationError",
        message: "username, name and password are required fields",
      });
    }

    if (password.length < 3) {
      return next({
        name: "ValidationError",
        message: "Password must be at least 3 character long",
      });
    }

    const SALT_ROUNDS = 10;
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({ username, name, passwordHash });
    return res.status(201).json(await user.save());
  } catch (e) {
    next(e);
  }
});

usersRouter.delete("/:id", async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  return res.status(304).end();
});

usersRouter.put("/:id", async (req, res) => {
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

  const updatedPost = await User.findByIdAndUpdate(
    req.params.id,
    { $set: fieldsToUpdate },
    { new: true }
  );

  return res.status(201).json(updatedPost);
});

module.exports = usersRouter;
