import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { addBlog, deleteBlog, likeBlog } from "../reducers/blogReducer";
import {
  setNewNotification,
  NOTIFICATION_DURATION_MED,
  NOTIFICATION_ERROR,
  NOTIFICATION_SUCCESS,
} from "../reducers/notificationReducer";

const UserPage = () => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false);

  const { user, blogs } = useSelector(({ user, blogs }) => ({ user, blogs }));
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    dispatch(logoutUser());
  };

  const addNewBlog = async (blogData) => {
    try {
      const newBlog = await dispatch(addBlog(blogData));
      dispatch(
        setNewNotification(
          `Added new blog "${newBlog.title}" by ${newBlog.author}`,
          NOTIFICATION_SUCCESS,
          NOTIFICATION_DURATION_MED
        )
      );
      setCreateBlogVisible(false);
    } catch (e) {
      console.log({ e });
      dispatch(
        setNewNotification(
          `Failed to add new blog "${blogData.title}" by ${blogData.author}`,
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

  return (
    <div>
      <h1>Blogs</h1>
      <div>
        <p>
          {user.name} ({user.username}) logged in
        </p>
        <button onClick={logoutHandler}>logout</button>
      </div>
      <div>
        {createBlogVisible ? <CreateBlog addNewBlog={addNewBlog} /> : null}
        <button
          id={"new-blog-form-control-btn"}
          onClick={() => setCreateBlogVisible(!createBlogVisible)}
        >
          {createBlogVisible ? "cancel" : "new blog"}
        </button>
      </div>
      <div className={"blog-list"}>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlogHandler={likeBlogHandler}
              isCreatedByUser={user.username === blog.user.username}
              deleteBlogHandler={
                user.username === blog.user.username ? deleteBlogHandler : null
              }
            />
          ))}
      </div>
    </div>
  );
};

export default UserPage;
