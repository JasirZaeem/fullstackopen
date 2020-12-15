import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  let total = good + bad + neutral;
  return (
    <div>
      <h1>statistics</h1>
      {total ? (
        <table>
          <tbody>
            <Statistic text={"good"} value={good} />
            <Statistic text={"neutral"} value={neutral} />
            <Statistic text={"bad"} value={bad} />
            <Statistic text={"all"} value={total} />
            <Statistic text={"average"} value={(good - bad) / total} />
            <Statistic text={"positive"} value={`${(good * 100) / total} %`} />
          </tbody>
        </table>
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

const store = createStore(reducer);

const App = () => {
  // destructure out values
  const { good, neutral, bad } = store.getState();

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => store.dispatch({ type: "GOOD" })}>good</button>
      <button onClick={() => store.dispatch({ type: "NEUTRAL" })}>
        neutral
      </button>
      <button onClick={() => store.dispatch({ type: "BAD" })}>bad</button>
      <button onClick={() => store.dispatch({ type: "ZERO" })}>reset</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
