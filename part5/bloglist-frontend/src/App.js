import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import UserPage from "./components/UserPage";
import Toast from "./components/Toast";
import "./index.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [toastMessage, setToastMessage] = useState({
    text: "",
    type: null,
  });
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    if (user) {
      (async () => {
        setBlogs(await blogService.getAllBlogs());
      })();
    }
  }, [user]);

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await blogService.loginUser(username, password);
      const blogs = await blogService.getAllBlogs();
      setUser(user);
      setBlogs(blogs);
      window.localStorage.setItem("user", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log({ e });
      setToastMessage({
        text: "Wrong username or password",
        type: "error",
      });
      setTimeout(() => setToastMessage({ text: "", type: null }), 5000);
    }
  };

  const logoutHandler = async () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const addBlogHandler = async (blogData) => {
    try {
      const newBlog = blogService.addBlog(blogData, user.token);
      delete newBlog.user;
      setBlogs([...blogs, newBlog]);
      setToastMessage({
        text: `Added new blog "${blogData.title}" by ${blogData.author}`,
        type: "success",
      });
      setTimeout(() => setToastMessage({ text: "", type: null }), 5000);
    } catch (e) {
      console.log({ e });
      setToastMessage({
        text: `Failed to add new blog "${blogData.title}" by ${blogData.author}`,
        type: "error",
      });
      setTimeout(() => setToastMessage({ text: "", type: null }), 5000);
    }
  };

  return (
    <div>
      {toastMessage.text ? (
        <Toast message={toastMessage.text} type={toastMessage.type} />
      ) : null}
      {user === null ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          loginHandler={loginHandler}
        />
      ) : (
        <UserPage
          user={user}
          blogs={blogs}
          logoutHandler={logoutHandler}
          addBlogHandler={addBlogHandler}
        />
      )}
    </div>
  );
};

export default App;
