import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setUsers(await blogService.getAllUsers());
      } catch (e) {
        console.log({ e });
      }
    };
    getUsers();
  }, []);

  return (
    <div className={"card m-2"}>
      <div className={"card-header"}>
        <h1 className={"card-title"}>Users</h1>
      </div>
      <div className={"card-body"}>
        <table className={"table table-striped"}>
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.length
              ? users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </td>
                    <td>{user.blogs.length}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
