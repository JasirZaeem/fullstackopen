import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  removeNotification,
  setNewNotification,
} from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const newAnecdote = await anecdotesService.createAnecdote(content);
    event.target.anecdote.value = "";
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNewNotification(`Added "${content}"`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name={"anecdote"} />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
