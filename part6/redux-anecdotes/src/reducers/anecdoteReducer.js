const VOTE = "VOTE";
const ADD = "ADD";
const ADD_INITIAL = "ADD_INITIAL";

const reducer = (state = [], action) => {
  switch (action.type) {
    case VOTE:
      return state.map((anecdote) =>
        anecdote.id !== action.data.id
          ? anecdote
          : {
              ...anecdote,
              votes: anecdote.votes + 1,
            }
      );
    case ADD:
      return [...state, action.data];
    case ADD_INITIAL:
      return action.anecdotes;
    default:
      return state;
  }
};

export const voteOnAnecdote = (id) => {
  return {
    type: VOTE,
    data: { id },
  };
};

export const createAnecdote = (data) => {
  return {
    type: ADD,
    data,
  };
};

export const addInitialAnecdotes = (anecdotes) => {
  return {
    type: ADD_INITIAL,
    anecdotes,
  };
};

export default reducer;
