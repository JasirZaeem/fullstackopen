import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteOnAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state).sort(
    (anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteOnAnecdote(id));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
