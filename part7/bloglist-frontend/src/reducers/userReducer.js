import blogService from "../services/blogs";
import { addInitialBlogs } from "./blogReducer";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ADD_USER_FROM_LOCALSTORAGE = "ADD_USER_FROM_LOCALSTORAGE";

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_FROM_LOCALSTORAGE:
      return action.user;
    case LOGIN:
      return action.user;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export const addUserFromLocalStorage = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({
        type: ADD_USER_FROM_LOCALSTORAGE,
        user,
      });
      dispatch(addInitialBlogs());
    }
  };
};
export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await blogService.loginUser(username, password);
    dispatch({
      type: LOGIN,
      user,
    });
    dispatch(addInitialBlogs());
    window.localStorage.setItem("user", JSON.stringify(user));
    return user;
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("user");
    dispatch({
      type: LOGOUT,
    });
  };
};
export default reducer;
