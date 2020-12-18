import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import anecdoteReducer from "./reducers/anecdoteReducer";
import queryReducer from "./reducers/queryReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  query: queryReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
