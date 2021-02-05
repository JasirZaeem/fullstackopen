import React from "react";
import { assertNever, CoursePart } from "../index";

type PartProps = {
  coursePart: CoursePart;
};

export const Part: React.FC<PartProps> = ({ coursePart }) => {
  let dataToShow;

  switch (coursePart.name) {
    case "Using props to pass data": {
      dataToShow = (
        <>
          <p>Group Project Count: {coursePart.groupProjectCount}</p>
        </>
      );
      break;
    }
    case "Fundamentals": {
      dataToShow = (
        <>
          <p>{coursePart.description}</p>
        </>
      );
      break;
    }
    case "Deeper type usage": {
      dataToShow = (
        <>
          <p>{coursePart.description}</p>
          <a href={coursePart.exerciseSubmissionLink}>
            {coursePart.exerciseSubmissionLink}
          </a>
        </>
      );
      break;
    }
    default: {
      return assertNever(coursePart);
    }
  }

  return (
    <div>
      <h4>{coursePart.name}</h4>
      <p>Exercises: {coursePart.exerciseCount}</p>
      {dataToShow}
    </div>
  );
};
