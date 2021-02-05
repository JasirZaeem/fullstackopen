import React from "react";
import { CoursePart } from "../index";

type TotalProps = {
  courseParts: CoursePart[];
};

export const Total: React.FC<TotalProps> = ({ courseParts }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};
