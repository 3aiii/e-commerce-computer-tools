import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/user/Accounts/SideBar";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";

const AccountLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <div className="flex justify-center w-full min-h-screen">
        <div className="flex gap-4 w-[1280px] mt-4">
          <div className="w-1/4">
            <SideBar />
          </div>
          <div className="w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AccountLayout;
