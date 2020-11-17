import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  let total = good + bad + neutral
  return (
    <div>
      <h1>statistics</h1>
      {
        total ?
          <table>
            <tbody>
              <Statistic text={"good"} value={good}/>
              <Statistic text={"neutral"} value={neutral}/>
              <Statistic text={"bad"} value={bad}/>
              <Statistic text={"all"} value={total}/>
              <Statistic text={"average"} value={(good - bad) / (total)}/>
              <Statistic text={"positive"} value={`${good * 100 / (total)} %`}/>
            </tbody>
          </table>
          : "No feedback given"
      }
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App/>,
  document.getElementById('root')
)
