export const NOTIFICATION_SUCCESS = "success";
export const NOTIFICATION_ERROR = "error";
export const NOTIFICATION_DURATION_MED = 5; // Seconds

const SET_NOTIFICATION = "SET_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

const initialState = { message: "", type: "", removalTimeoutID: null };
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

export const setNewNotification = (message, type, durationInSeconds) => {
  return (dispatch) => {
    dispatch({
      type: SET_NOTIFICATION,
      notification: {
        message,
        type,
        removalTimeoutID: setTimeout(() => {
          dispatch(removeNotification());
        }, durationInSeconds * 1000),
      },
    });
  };
};

export default reducer;
