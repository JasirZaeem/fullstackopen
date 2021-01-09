import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentOnBlog, deleteBlog, likeBlog } from "../reducers/blogReducer";
import {
  NOTIFICATION_DURATION_MED,
  NOTIFICATION_DANGER,
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

  const [newComment, setNewComment] = useState("");
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
          NOTIFICATION_DANGER,
          NOTIFICATION_DURATION_MED
        )
      );
      history.push("/blogs");
    } catch (e) {
      console.log({ e });
      dispatch(
        setNewNotification(
          `Failed to delete blog "${blog.title}" by ${blog.author}`,
          NOTIFICATION_DANGER,
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

  const addComment = async (e) => {
    try {
      e.preventDefault();
      await dispatch(commentOnBlog(blog, newComment));
      setNewComment("");
    } catch (e) {
      console.log({ e });
      dispatch(
        setNewNotification(
          `Could not comment on ${blog.title}`,
          NOTIFICATION_DANGER,
          NOTIFICATION_DURATION_MED
        )
      );
    }
  };

  return blog ? (
    <>
      <div className={"blog card m-2"}>
        <div className={"card-header"}>
          <h1 className={"Card-title"}>{blog.title}</h1>
          <h3 className={"card-subtitle text-muted"}>by {blog.author}</h3>
        </div>
        <div className={"card-body"}>
          <a href={blog.url}>{blog.url}</a>
          <br />

          {user ? (
            <button
              className={"like-btn btn btn-success mt-3"}
              onClick={() => {
                likeBlogHandler(blog);
              }}
            >
              Like{" "}
              <span className={"likes badge bg-secondary"}>{blog.likes}</span>
            </button>
          ) : (
            <span className={"likes badge bg-primary"}>Likes {blog.likes}</span>
          )}
        </div>
        <div
          className={
            "card-footer d-flex align-items-center justify-content-between"
          }
        >
          Added by {blog.user.name} ({blog.user.username})
          {user?.username === blog.user.username ? (
            <button
              className={"btn btn-danger delete-blog-btn"}
              onClick={() => deleteBlogHandler(blog)}
            >
              remove
            </button>
          ) : null}
        </div>
      </div>
      <div className="card m-2">
        <div className="card-header">
          <h2 className={"card-title"}>Comments</h2>
          {user ? (
            <>
              <hr />
              <form onSubmit={addComment}>
                <div className={"input-group"}>
                  <input
                    type={"text"}
                    className={"form-control"}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button className={"btn btn-primary"}>add comment</button>
                </div>
              </form>
            </>
          ) : null}
        </div>
        <ul className="list-group list-group-flush">
          {blog.comments.map(({ text, id }) => (
            <li key={id} className={"list-group-item"}>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </>
  ) : (
    "BLog not found"
  );
};

export default Blog;
