import React from "react";

const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Part = ({part: {name, exercises}}) => {
  return <p>{name} {exercises}</p>
}

const Content = ({parts}) => {
  return parts.map(part => <Part key={part.name} part={part}/>)
}

const Total = ({parts}) => {
  return <p>Number of exercises {parts.reduce((sum, {exercises}) => sum + exercises, 0)}</p>
}

const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App