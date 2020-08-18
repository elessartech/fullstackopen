const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");

const api = supertest(app);

const helper = require("../utils/test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
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

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Introduction to Machine Learning in Python",
      author: "Maksim Ilmast",
      url:
        "https://medium.com/@maksimilmast/introduction-to-machine-learning-in-python-31c2cdbccf66",
      likes: 31,
    };

    await api
      .post("/api/blogs")
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjVmMzE3NGQwZTM5ZTBiMDc2NGI4ZDNiMSIsImlhdCI6MTU5NzE1NTk2MX0.exKf4T-71vmrO-DL2-neU8Jn6k0cuFS8CV2BMYfVHnM"
      )
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("Introduction to Machine Learning in Python");
  });

  test("if the likes property is missing from the request, it will default to the value 0", async () => {
    const newBlog = {
      title: "Introduction to Machine Learning in Python",
      author: "Maksim Ilmast",
      url:
        "https://medium.com/@maksimilmast/introduction-to-machine-learning-in-python-31c2cdbccf66",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .end((err, res) => expect(res.body.likes).toEqual(0));
  });

  test("blog without title and url is not added", async () => {
    const newBlog = {
      author: "Maksim Ilmast",
      likes: 31,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("update of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = { ...blogsAtStart[0] };

    blogToUpdate.author = "Maksim Ilmast";

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const authors = blogsAtEnd.map((blog) => blog.author);

    expect(authors).toContain(blogToUpdate.author);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
