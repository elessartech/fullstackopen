import React, { useState } from "react";

const NewBlogForm = ({ createNewBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeUrl = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createNewBlog({
      author: author,
      url: url,
      title: title,
    });

    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={addBlog}>
        <div>
          title: <input id="title" value={title} onChange={handleChangeTitle} />
        </div>
        <div>
          author:{" "}
          <input id="author" value={author} onChange={handleChangeAuthor} />
        </div>
        <div>
          url: <input id="url" value={url} onChange={handleChangeUrl} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
