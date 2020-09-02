import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

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
          id="username-input"
          type="text"
          value={username || ""}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password-input"
          type="password"
          value={password || ""}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );

  const createNewBlog = async (blogData) => {
    if (!blogData.title || !blogData.author || !blogData.url) {
      setErrorMessage("All inputs must be filled!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      const newBlog = {
        title: blogData.title,
        author: blogData.author,
        url: blogData.url,
      };
      blogService.create(newBlog);
      setNotificationMessage("a new blog " + newBlog.title + " added");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const increaseLikes = (blogData) => {
    const updatedBlog = {
      user: blogData.user.id,
      likes: Number(blogData.likes + 1),
      author: blogData.author,
      title: blogData.title,
      url: blogData.url,
    };
    blogService.update(blogData.id, updatedBlog);
    setNotificationMessage("you liked the post " + blogData.title);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const sortBlogsByLikes = (prev, next) => {
    if (prev.likes < next.likes) {
      return 1;
    }
    if (prev.likes > next.likes) {
      return -1;
    }
    return 0;
  };

  const removeBlog = (blogData) => {
    if (
      window.confirm(
        "Remove blog " + blogData.title + " by " + blogData.author + " ?"
      )
    ) {
      blogService.remove(blogData.id);
      setNotificationMessage(
        "you removed the post " + blogData.title + " by " + blogData.author
      );
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <span style={{ color: "red" }}>{errorMessage}</span>
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div className="error-message" style={{ color: "red" }}>
        {errorMessage}
      </div>
      <div className="notification-message" style={{ color: "green" }}>
        {notificationMessage}
      </div>
      <span>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </span>
      <Togglable buttonLabel="create new blog">
        <NewBlogForm createNewBlog={(newBlog) => createNewBlog(newBlog)} />
      </Togglable>
      <main>
        {blogs.sort(sortBlogsByLikes).map((blog) => (
          <Blog
            blogAddedByUser={blog.user.username === user.username}
            removeBlog={(blogData) => removeBlog(blogData)}
            increaseLikes={(blogData) => increaseLikes(blogData)}
            key={blog.id}
            blog={blog}
          />
        ))}
      </main>
    </div>
  );
};

export default App;
