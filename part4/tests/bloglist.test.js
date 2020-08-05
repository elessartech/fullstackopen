const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

const listWithMultipleBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "James Hetfield",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 12,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "James Hetfield",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 14,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(31);
  });
});

describe("favorite blog", () => {
  test("return the most liked blog", () => {
    const returnedList = listHelper.favoriteBlog(listWithMultipleBlogs);
    expect(returnedList).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "James Hetfield",
      likes: 14,
    });
  });
});

describe("most blogs", () => {
  test("return the author who has the largest amount of blogs", () => {
    const returnedList = listHelper.mostBlogs(listWithMultipleBlogs);
    expect(returnedList).toEqual({ author: "James Hetfield", blogs: 2 });
  });
});

describe("most likes", () => {
  test("return the author, whose blog posts have the largest amount of likes", () => {
    const returnedList = listHelper.mostLikes(listWithMultipleBlogs);
    expect(returnedList).toEqual({ author: "James Hetfield", likes: 14 });
  });
});
