import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import {
  NOTIFICATION_DURATION_MED,
  NOTIFICATION_ERROR,
  NOTIFICATION_SUCCESS,
  setNewNotification,
} from "../reducers/notificationReducer";

import { useHistory } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id));
  const user = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const history = useHistory();

  const deleteBlogHandler = async (blog) => {
    try {
      const deletionConfirmed = window.confirm(
        `Delete blog ${blog.title} by ${blog.author} ?`
      );
      if (!deletionConfirmed) return;
      await dispatch(deleteBlog(blog));
      dispatch(
        setNewNotification(
          `Deleted blog "${blog.title}" by ${blog.author}`,
          NOTIFICATION_ERROR,
          NOTIFICATION_DURATION_MED
        )
      );
      history.push("/blogs");
    } catch (e) {
      console.log({ e });
      dispatch(
        setNewNotification(
          `Failed to delete blog "${blog.title}" by ${blog.author}`,
          NOTIFICATION_ERROR,
          NOTIFICATION_DURATION_MED
        )
      );
    }
  };

  const likeBlogHandler = async (blog) => {
    try {
      await dispatch(likeBlog(blog));
    } catch (e) {
      console.log({ e });
      dispatch(
        setNewNotification(
          `Failed to like blog "${blog.title}" by ${blog.author}`,
          NOTIFICATION_SUCCESS,
          NOTIFICATION_DURATION_MED
        )
      );
    }
  };

  const blogStyle = {
    padding: "10px",
    border: "solid",
    borderWidth: 2,
    margin: "2px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  };

  const pStyle = {
    display: "inline-block",
    margin: "0px",
  };

  return blog ? (
    <div style={blogStyle} className={"blog"}>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <p style={pStyle}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        <span className={"likes"}>likes {blog.likes}</span>
        {user ? (
          <button
            className={"like-btn"}
            onClick={() => {
              likeBlogHandler(blog);
            }}
          >
            like
          </button>
        ) : null}
        <br />
        Added by {blog.user.name} ({blog.user.username})
        <br />
        {user?.username === blog.user.username ? (
          <button
            className={"delete-blog-btn"}
            onClick={() => deleteBlogHandler(blog)}
          >
            remove
          </button>
        ) : null}
      </p>
    </div>
  ) : (
    "BLog not found"
  );
};

export default Blog;
