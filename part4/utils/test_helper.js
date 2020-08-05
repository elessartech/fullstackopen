const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "You Don’t Need College Anymore, Says Google",
    author: "David Leibowitz",
    url:
      "https://medium.com/discourse/you-dont-need-college-anymore-says-google-102d4beec668",
    likes: 5200,
  },
  {
    title: "A.I. Is Not Going to Magically Deliver a Coronavirus Vaccine",
    author: "Corinne Purtill",
    url:
      "https://onezero.medium.com/a-i-is-not-going-to-magically-deliver-a-coronavirus-vaccine-6c9fb58af521",
    likes: 3,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
