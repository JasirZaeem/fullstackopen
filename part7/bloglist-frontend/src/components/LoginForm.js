import { useState } from "react";
import { loginUser } from "../reducers/userReducer";
import {
  NOTIFICATION_DURATION_MED,
  NOTIFICATION_ERROR,
  setNewNotification,
} from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser(username, password));
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log({ e });
      dispatch(
        setNewNotification(
          "Wrong username or password",
          NOTIFICATION_ERROR,
          NOTIFICATION_DURATION_MED
        )
      );
    }
  };
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandler}>
        username
        <input
          id={"username"}
          type={"text"}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        password
        <input
          id={"password"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button id={"login-button"} type={"submit"}>
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
