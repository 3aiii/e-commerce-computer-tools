import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <Link to={"/sign-in"}>Sign in</Link>
      <Link to={"/sign-up"}>Sign up</Link>
    </div>
  );
};

export default Index;
