const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("unique identifier property of the blog posts is named id", async () => {
  const blogs = await (await api.get("/api/blogs")).body;
  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
