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
    <nav>
      <Link to={"/users"}>Users</Link>
      <Link to={"/blogs"}>Blogs</Link>

      {user ? (
        <>
          {user.name} ({user.username})
          <button type={"button"} onClick={logoutHandler}>
            LogOut
          </button>
        </>
      ) : (
        <>
          <button type={"button"} onClick={() => history.push("/")}>
            LogIn
          </button>
        </>
      )}
    </nav>
  );
};

export default Menu;
