import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import BlogListItem from "./BlogListItem";
import CreateBlog from "./CreateBlog";
import { addBlog, addInitialBlogs } from "../reducers/blogReducer";
import {
  NOTIFICATION_DURATION_MED,
  NOTIFICATION_ERROR,
  NOTIFICATION_SUCCESS,
  setNewNotification,
} from "../reducers/notificationReducer";

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [createBlogVisible, setCreateBlogVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(addInitialBlogs());
    }
  }, [dispatch, user]);
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

  return (
    <div>
      <div>
        {createBlogVisible ? <CreateBlog addNewBlog={addNewBlog} /> : null}
        {user ? (
          <button
            id={"new-blog-form-control-btn"}
            onClick={() => setCreateBlogVisible(!createBlogVisible)}
          >
            {createBlogVisible ? "cancel" : "new blog"}
          </button>
        ) : null}
      </div>

      <h1>Blogs</h1>
      <div className={"blog-list"}>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogListItem key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default Blogs;
