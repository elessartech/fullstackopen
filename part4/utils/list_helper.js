const dummy = (bloglist) => {
  return 1;
};

const totalLikes = (bloglist) => {
  const totalLikesCallback = (acc, cur) => Number(acc) + Number(cur);
  return bloglist.length === 0
    ? 0
    : bloglist.map((blog) => blog.likes).reduce(totalLikesCallback);
};

const favoriteBlog = (bloglist) => {
  if (bloglist.length === 0) {
    return 0;
  }
  const favoriteBlogCallback = (acc, cur) =>
    acc.likes > cur.likes ? acc : cur;
  const favBlog = bloglist.reduce(favoriteBlogCallback);
  return { title: favBlog.title, author: favBlog.author, likes: favBlog.likes };
};

const mostBlogs = (bloglist) => {
  if (bloglist.length === 0) {
    return 0;
  }
  const authors = bloglist.map((blog) => blog.author);
  const findMode = (arr) => {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  };
  const hasMostBlogsAuthor = findMode([...authors]);
  return {
    author: hasMostBlogsAuthor,
    blogs: authors.filter((author) => author === hasMostBlogsAuthor).length,
  };
};

const mostLikes = (bloglist) => {
  if (bloglist.length === 0) {
    return 0;
  }
  const likes = bloglist.map((blog) => blog.likes);
  const mostLikesCallback = (prev, cur) => Math.max(prev, cur);
  const mostLikesNum = likes.reduce(mostLikesCallback);
  const blogWithMostLikes = bloglist.filter(
    (blog) => blog.likes === mostLikesNum
  )[0];
  return { author: blogWithMostLikes.author, likes: blogWithMostLikes.likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
