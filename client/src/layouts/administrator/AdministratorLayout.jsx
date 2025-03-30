import React, { useEffect } from "react";
import Navbar from "../../components/administrator/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { verify } from "../../composables/authentication/Authentication";

const AdministratorLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const response = await verify();

      if (response.status === 200) {
        if (response?.data?.user?.role === "ADMIN") {
          navigate("/administrator/dashboard");
        } else {
          navigate("/");
        }
      }
    };

    verifyUser();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex justify-center w-full bg-[#f7f8fc] min-h-screen">
        <div className="w-[1280px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdministratorLayout;
