import React, { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, blogAddedByUser, increaseLikes, removeBlog }) => {
  const [unwrapped, setUnwrapped] = useState(false);

  const additionalInfoWrapper = { display: unwrapped ? "" : "none" };
  const removeBtnVisibility = { display: blogAddedByUser ? "" : "none" };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setUnwrapped(!unwrapped)}>
          {unwrapped ? "hide" : "view"}
        </button>
      </div>
      <div id="AdditionalInfo" style={additionalInfoWrapper}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={() => increaseLikes(blog)}>like</button>
        </div>
        <div>{blog.user.username}</div>
        <div style={removeBtnVisibility}>
          <button
            style={{ backgroundColor: "blue" }}
            onClick={() => removeBlog(blog)}
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
