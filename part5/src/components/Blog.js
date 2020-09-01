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
      <div className="blog">
        {blog.title} {blog.author}{" "}
        <button className="unwrapBtn" onClick={() => setUnwrapped(!unwrapped)}>
          {unwrapped ? "hide" : "view"}
        </button>
      </div>
      <div
        id="AdditionalInfo"
        className="additionalInfo"
        style={additionalInfoWrapper}
      >
        <div className="url">{blog.url}</div>
        <div className="likes">
          likes {blog.likes}{" "}
          <button onClick={() => increaseLikes(blog)}>like</button>
        </div>
        <div>{blog.user.username}</div>
        <div style={removeBtnVisibility}>
          <button
            id="removeBtn"
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
