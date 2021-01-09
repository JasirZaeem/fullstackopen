import { useState } from "react";
import { loginUser } from "../reducers/userReducer";
import {
  NOTIFICATION_DURATION_MED,
  NOTIFICATION_DANGER,
  setNewNotification,
} from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(({ user }) => user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser(username, password));
      // setUsername("");
      // setPassword("");
      history.push("/blogs");
    } catch (e) {
      console.log({ e });
      dispatch(
        setNewNotification(
          "Wrong username or password",
          NOTIFICATION_DANGER,
          NOTIFICATION_DURATION_MED
        )
      );
    }
  };
  const formStyle = {
    maxWidth: 500,
  };
  return !user ? (
    <div className={"text-center"}>
      <div className={"card mx-auto my-5"} style={formStyle}>
        <form onSubmit={loginHandler}>
          <div className={"card-header"}>
            <h1 className="h1 mb-3 fw-normal card-title">
              Log in to application
            </h1>
          </div>
          <div className={"card-body p-3"}>
            <input
              id={"username"}
              type={"text"}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="form-control"
              placeholder={"Username"}
              required
            />
            <input
              id={"password"}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              placeholder={"Password"}
              required
            />
          </div>
          <div className={"card-footer"}>
            <button
              id={"login-button"}
              type={"submit"}
              className={"btn btn-lg btn-primary"}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to={"/blogs"} />
  );
};

export default LoginForm;
