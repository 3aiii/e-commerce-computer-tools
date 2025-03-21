import React from "react";
import { Link } from "react-router-dom";

const MockHero = () => {
  return (
    <div className="relative flex items-center">
      <img src="mock-hero.png" className="w-full" />
      <Link
        to={"/products"}
        className="absolute px-12 py-3 bottom-24 left-16 bg-red-500 text-white 
            text-center font-light rounded-md hover:bg-red-400 transition"
      >
        GET IT NOW !
      </Link>
    </div>
  );
};

export default MockHero;
