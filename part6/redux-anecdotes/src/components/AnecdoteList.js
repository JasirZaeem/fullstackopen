import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteOnAnecdote } from "../reducers/anecdoteReducer";
import {
  removeNotification,
  setNewNotification,
} from "../reducers/notificationReducer";

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

  const vote = (id, content) => {
    dispatch(voteOnAnecdote(id));
    dispatch(setNewNotification(`You voted "${content}"`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
