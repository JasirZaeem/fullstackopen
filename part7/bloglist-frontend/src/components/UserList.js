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
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th />
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
  );
};

export default UserList;
