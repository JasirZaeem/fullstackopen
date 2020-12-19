import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNewNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ removeNotification, setNewNotification }) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const newAnecdote = await createAnecdote(content);
    event.target.anecdote.value = "";

    setNewNotification(`Added "${newAnecdote.content}"`, 5);
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

const mapStateToProps = null;
const mapDispatchToProps = {
  setNewNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
