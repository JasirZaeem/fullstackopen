import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import { useState } from "react";
import PropTypes from "prop-types";

const UserPage = ({
  user,
  blogs,
  logoutHandler,
  addBlogHandler,
  likeBlogHandler,
  deleteBlogHandler,
}) => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false);

  const addNewBlog = (blogData) => {
    addBlogHandler(blogData);
    setCreateBlogVisible(false);
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
        <button onClick={() => setCreateBlogVisible(!createBlogVisible)}>
          {createBlogVisible ? "cancel" : "new blog"}
        </button>
      </div>
      <div>
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

UserPage.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  logoutHandler: PropTypes.func.isRequired,
  addBlogHandler: PropTypes.func.isRequired,
  likeBlogHandler: PropTypes.func.isRequired,
  deleteBlogHandler: PropTypes.func.isRequired,
};

export default UserPage;
