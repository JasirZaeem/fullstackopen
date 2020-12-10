import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import { useState } from "react";

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

export default UserPage;
