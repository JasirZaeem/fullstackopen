import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";

//TODO: page for a single user

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getUser = async (id) => {
      try {
        setUser(
          (await blogService.getAllUsers()).find((user) => user.id === id)
        );
      } catch (e) {
        console.log({ e });
      }
    };
    getUser(id);
  }, [id]);

  return user ? (
    <div>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.length
          ? user.blogs.map((blog) => (
              <li key={blog.id}>
                <p>{blog.title}</p>
              </li>
            ))
          : null}
      </ul>
    </div>
  ) : (
    "User Not Found"
  );
};

export default UserPage;
