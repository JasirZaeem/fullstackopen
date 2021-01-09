import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import { addUserFromLocalStorage } from "./reducers/userReducer";

import LoginForm from "./components/LoginForm";
import UserPage from "./components/UserPage";
import Toast from "./components/Toast";
import UserList from "./components/UserList";

import { Switch, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import Menu from "./components/Menu";
import Blog from "./components/Blog";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addUserFromLocalStorage());
  }, [dispatch]);

  return (
    <div>
      <Menu />
      <Toast />

      <Switch>
        <Route path={"/users/:id"}>
          <UserPage />
        </Route>
        <Route path={"/blogs/:id"}>
          <Blog />
        </Route>
        <Route path={"/users"}>
          <UserList />
        </Route>
        <Route path={"/blogs"}>
          <Blogs />
        </Route>
        <Route path="/">
          <LoginForm />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
