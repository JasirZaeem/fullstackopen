import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    anecdotes.reduce((votes, _, idx) => {
      return { ...votes, [idx]: 0 };
    }, {})
  );

  const handleVoting = () => {
    setVotes({ ...votes, [selected]: votes[selected] + 1 });
  };

  const showRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  let maxVotedAnecdoteKey = Object.keys(votes).reduce((maxKey, key) => {
    return votes[key] > votes[maxKey] ? key : maxKey;
  }, "0");

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => handleVoting()}>vote</button>
      <button onClick={() => showRandomAnecdote()}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotedAnecdoteKey]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
