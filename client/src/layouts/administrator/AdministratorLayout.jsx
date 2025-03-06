import React from "react";
import Navbar from "../../components/administrator/Navbar";
import { Outlet } from "react-router-dom";

const AdministratorLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex justify-center w-full bg-[#f7f8fc] h-screen">
        <div className="xl:w-[1180px] 2xl:w-[1580px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdministratorLayout;
