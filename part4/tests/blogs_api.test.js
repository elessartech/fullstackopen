const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");

const api = supertest(app);

const helper = require("../utils/test_helper");
const { initialBlogs } = require("../utils/test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");

  helper.initialBlogs.forEach(async (note) => {
    let blogObject = new Blog(note);
    await blogObject.save();
    console.log("saved");
  });
  console.log("done");
});

describe("when there is initially some blogs saved", () => {
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
});

describe("addition of a new note", () => {
  test("a valid note can be added", async () => {
    const newBlog = {
      title: "Introduction to Machine Learning in Python",
      author: "Maksim Ilmast",
      url:
        "https://medium.com/@maksimilmast/introduction-to-machine-learning-in-python-31c2cdbccf66",
      likes: 31,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((n) => n.title);
    expect(contents).toContain("Introduction to Machine Learning in Python");
  });

  test("blog without likes is not added", async () => {
    const newBlog = {
      title: "Introduction to Machine Learning in Python",
      author: "Maksim Ilmast",
      url:
        "https://medium.com/@maksimilmast/introduction-to-machine-learning-in-python-31c2cdbccf66",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
