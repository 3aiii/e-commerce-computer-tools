import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";

const IndexLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <div className="flex justify-center w-full ">
        <div className="w-[1280px]">
          <Outlet />
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default IndexLayout;
