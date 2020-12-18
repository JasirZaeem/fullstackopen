const SET_QUERY = "SET_QUERY";

const reducer = (state = "", action) => {
  switch (action.type) {
    case SET_QUERY:
      return action.query.trim();
    default:
      return state;
  }
};

export const setQuery = (query) => {
  return {
    type: SET_QUERY,
    query,
  };
};

export default reducer;
