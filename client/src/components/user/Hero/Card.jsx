import React from "react";
import { Link } from "react-router-dom";

const Card = ({ name, navigateTo }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4 w-fit items-center">
        <div className="flex-grow w-4 rounded-sm h-10 bg-red-500"></div>
        <span className="font-semibold text-xl text-red-500">{name}</span>
      </div>
      <Link to={navigateTo} className="navigate-button font-light">
        View All
      </Link>
    </div>
  );
};

export default Card;
