import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        className={`flex gap-8 p-8 overflow-hidden w-[1000px] bg-white rounded-xl border border-gray-200`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
