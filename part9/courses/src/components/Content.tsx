import React from "react";
import { CoursePart } from "../index";
import { Part } from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

export const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </div>
  );
};
