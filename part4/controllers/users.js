const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.password || !body.username) {
    return response.status(401).json({
      message: "as password as username must be entered",
    });
  } else {
    const user = await User.findOne({ username: body.username });
    if (body.password.length < 3 || body.username.length < 3) {
      return response.status(401).json({
        message:
          "both username and password must be at least 3 characters long",
      });
    }
    if (user) {
      return response.status(401).json({
        message: "the username must be unique",
      });
    }
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
