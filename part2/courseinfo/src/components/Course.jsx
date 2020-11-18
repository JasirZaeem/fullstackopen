import React from "react";

const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Part = ({ part: { name, exercises } }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};
const Content = ({ parts }) => {
  return parts.map((part) => <Part key={part.name} part={part} />);
};

const Total = ({ parts }) => {
  return (
    <p>
      <strong>
        Number of exercises{" "}
        {parts.reduce((sum, { exercises }) => sum + exercises, 0)}
      </strong>
    </p>
  );
};

export const Course = ({ course: { id, name, parts } }) => {
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};
