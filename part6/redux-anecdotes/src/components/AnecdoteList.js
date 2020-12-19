import React from "react";
import { connect } from "react-redux";
import { voteOnAnecdote } from "../reducers/anecdoteReducer";
import { setNewNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({ anecdotes, voteOnAnecdote, setNewNotification }) => {
  const vote = async (anecdote) => {
    const updatedAnecdote = await voteOnAnecdote(anecdote);
    setNewNotification(`You voted "${updatedAnecdote.content}"`, 5);
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

const mapStateToProps = (state) => {
  if (!state.query) {
    return {
      anecdotes: state.anecdotes.sort(
        (anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes
      ),
    };
  }
  return {
    anecdotes: state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.query.toLowerCase())
      )
      .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes),
  };
};

const mapDispatchToProps = {
  voteOnAnecdote,
  setNewNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
