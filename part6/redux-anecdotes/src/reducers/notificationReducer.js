const SET_NOTIFICATION = "SET_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

const initialState = { content: "", removalTimeoutID: null };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      if (state.removalTimeoutID) {
        clearTimeout(state.removalTimeoutID);
      }
      return action.notification;
    case REMOVE_NOTIFICATION:
      return initialState;
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
      notification: {
        content: notification,
        removalTimeoutID: setTimeout(() => {
          dispatch(removeNotification());
        }, durationInSeconds * 1000),
      },
    });
  };
};

export default reducer;
