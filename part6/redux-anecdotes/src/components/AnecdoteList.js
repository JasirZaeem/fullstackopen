import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteOnAnecdote } from "../reducers/anecdoteReducer";
import { setNewNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (!state.query) {
      return state.anecdotes.sort(
        (anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes
      );
    }
    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.query.toLowerCase())
      )
      .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes);
  });

  const dispatch = useDispatch();

  const vote = async (anecdote) => {
    const updatedAnecdote = await dispatch(voteOnAnecdote(anecdote));
    dispatch(setNewNotification(`You voted "${updatedAnecdote.content}"`, 5));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
