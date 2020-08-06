const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const content = new Blog(request.body);
  const parsedContent = JSON.parse(JSON.stringify(content));
  if (
    !parsedContent.hasOwnProperty("likes") ||
    (!parsedContent.hasOwnProperty("url") &&
      !parsedContent.hasOwnProperty("title"))
  ) {
    response.status(400).end();
  } else {
    const result = await content.save();
    response.status(201).json(result);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const updatedContent = new Blog(request.body);
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.status(204).end();
});

module.exports = blogsRouter;
