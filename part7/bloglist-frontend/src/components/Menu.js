import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const Menu = () => {
  const user = useSelector(({ user }) => user);

  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = async () => {
    dispatch(logoutUser());
    history.push("/");
  };
  return (
    <nav className={"navbar navbar-light bg-light"}>
      <ul className={"nav"}>
        <li>
          <Link to={"/users"} className={"nav-link"}>
            Users
          </Link>
        </li>
        <li>
          <Link to={"/blogs"} className={"nav-link"}>
            Blogs
          </Link>
        </li>
      </ul>
      <div className={"user-section"}>
        {user ? (
          <>
            {user.name} ({user.username})
            <button type={"button"} className={"btn btn-danger m-2"} onClick={logoutHandler}>
              LogOut
            </button>
          </>
        ) : (
          <>
            <button type={"button"} className={"btn btn-success m-2"} onClick={() => history.push("/")}>
              LogIn
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Menu;
