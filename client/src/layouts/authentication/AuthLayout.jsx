import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { verify } from "../../composables/authentication/Authentication";

const AuthLayout = () => {
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
