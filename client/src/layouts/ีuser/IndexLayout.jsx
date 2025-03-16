import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/user/Navbar";

const IndexLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default IndexLayout;
