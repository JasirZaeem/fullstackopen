const SET_NOTIFICATION = "SET_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

const reducer = (state = "", action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.notification;
    case REMOVE_NOTIFICATION:
      return "";
    default:
      return state;
  }
};

export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION,
  };
};

export const setNewNotification = (notification, durationInSeconds) => {
  return (dispatch) => {
    dispatch({
      type: SET_NOTIFICATION,
      notification,
    });
    setTimeout(() => {
      dispatch(removeNotification());
    }, durationInSeconds * 1000);
  };
};

export default reducer;
