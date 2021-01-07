import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { addUserFromLocalStorage } from "./reducers/userReducer";

import LoginForm from "./components/LoginForm";
import UserPage from "./components/UserPage";
import Toast from "./components/Toast";

const App = () => {
  const user = useSelector(({ user }) => user);
  const { message: toastMessage } = useSelector(
    ({ notification }) => notification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addUserFromLocalStorage());
  }, [dispatch]);

  return (
    <div>
      {toastMessage ? <Toast /> : null}
      {user === null ? <LoginForm /> : <UserPage />}
    </div>
  );
};
export default App;
