import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";

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
    <div className={"card m-2"}>
      <div className={"card-header"}>
        <h1 className={"card-title"}>{user.name}</h1>
        <hr />
        <h3 className={"card-subtitle text-muted"}>Added blogs</h3>
      </div>

      <ul className="list-group list-group-flush">
        {user.blogs.length
          ? user.blogs.map((blog) => (
              <li key={blog.id} className={"list-group-item"}>
                {blog.title}
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
