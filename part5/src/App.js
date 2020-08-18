import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.location.href = "/";
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username || ""}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password || ""}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const createNewBlog = async () => {
    if (!title || !author || !url) {
      setErrorMessage("All inputs must be filled!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      };
      blogService.create(newBlog);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <span>
          {user.username} logged in{" "}
          <button onClick={handleLogout}>logout</button>
        </span>
      </div>
      <h2>create new</h2>
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
      <button onClick={createNewBlog}>create</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
