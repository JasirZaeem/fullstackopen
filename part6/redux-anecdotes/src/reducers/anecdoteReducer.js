import anecdotesService from "../services/anecdotes";
import anecdotes from "../services/anecdotes";

const VOTE = "VOTE";
const ADD = "ADD";
const ADD_INITIAL = "ADD_INITIAL";

const reducer = (state = [], action) => {
  switch (action.type) {
    case VOTE:
      return state.map((oldAnecdote) =>
        oldAnecdote.id !== action.anecdote.id ? oldAnecdote : action.anecdote
      );
    case ADD:
      return [...state, action.data];
    case ADD_INITIAL:
      return action.anecdotes;
    default:
      return state;
  }
};

export const voteOnAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.voteAnecdote(anecdote);
    dispatch({
      type: VOTE,
      anecdote: updatedAnecdote,
    });
    return updatedAnecdote;
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createAnecdote(content);
    dispatch({
      type: ADD,
      data: newAnecdote,
    });
    return newAnecdote;
  };
};

export const addInitialAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_INITIAL,
      anecdotes: await anecdotesService.getAll(),
    });
  };
};

export default reducer;
