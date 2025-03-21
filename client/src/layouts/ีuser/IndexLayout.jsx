import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/user/Navbar";

const IndexLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <div className="flex justify-center w-full min-h-screen">
        <div className="w-[1280px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default IndexLayout;
