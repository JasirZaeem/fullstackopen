import Blog from "./Blog";
import CreateBlog from "./CreateBlog";

const UserPage = ({ user, blogs, logoutHandler, addBlogHandler }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <p>
        {user.name} ({user.username}) logged in
      </p>
      <button onClick={logoutHandler}>logout</button>
      <CreateBlog addBlogHandler={addBlogHandler} />

      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
