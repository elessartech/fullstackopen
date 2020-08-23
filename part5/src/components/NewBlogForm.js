import React from "react";
import PropTypes from "prop-types";

const NewBlogForm = ({
  onSubmit,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <React.Fragment>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          title:{" "}
          <input
            value={title || ""}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            value={author || ""}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            value={url || ""}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </React.Fragment>
  );
};

NewBlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
};

export default NewBlogForm;
