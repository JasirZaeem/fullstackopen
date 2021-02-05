import React from "react";

type HeaderProps = {
  name: string;
};

export const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};
