import React, { useEffect, useState } from "react";
import {
  logout,
  verify,
} from "./../../../composables/authentication/Authentication";
import { findOne } from "../../../composables/administrator/UserService";
import { FiUser } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import { MdOutlineReviews } from "react-icons/md";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleLogout = async () => {
    const { data } = await logout();

    if (data?.message === "Logged out successfully") {
      navigate("/sign-in");
    } else {
      showErrorToast(data?.meesage);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await verify();
        const { data } = await findOne(response?.data?.user?.id);

        setUser(data);
      } catch (error) {
        if (error.response.data.statusCode === 404) {
          navigate("/sign-in");
        } else {
          console.log(error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-light my-6">
        Welcome,{" "}
        <span className="font-medium">
          {user?.profile?.[0]?.firstname} {user?.profile?.[0]?.lastname}
        </span>
      </h1>
      <ul>
        <Link
          to={"/account"}
          state={{ user }}
          className={`flex items-center gap-2 text-lg border-t-[1px] 
            font-medium p-4 hover:bg-[#ecf3fdff] hover:text-red-500 cursor-pointer transition ${
              matchPath(`/account`, location.pathname) ? `text-red-500` : ``
            }`}
        >
          <FiUser
            size={25}
            className={`${
              matchPath("/account", location.pathname)
                ? `text-red-500`
                : `text-gray-500`
            }`}
          />
          Personal infomation
        </Link>
        <Link
          to={"/order-history"}
          className={`flex items-center gap-2 text-lg border-t-[1px] 
          font-medium p-4 hover:bg-[#ecf3fdff] hover:text-red-500 cursor-pointer transition ${
            matchPath(`/order-history`, location.pathname) ? `text-red-500` : ``
          }`}
        >
          <GoHistory
            size={25}
            className={`${
              matchPath("/order-history", location.pathname)
                ? `text-red-500`
                : `text-gray-500`
            }`}
          />
          Order History
        </Link>
        <Link
          to={"/my-review"}
          className={`flex items-center gap-2 text-lg border-t-[1px] 
            font-medium p-4 hover:bg-[#ecf3fdff] hover:text-red-500 cursor-pointer transition ${
              matchPath(`/my-review`, location.pathname) ? `text-red-500` : ``
            }`}
        >
          <MdOutlineReviews
            size={25}
            className={`${
              matchPath("/my-review", location.pathname)
                ? `text-red-500`
                : `text-gray-500`
            }`}
          />
          My Review
        </Link>
        <button
          onClick={handleLogout}
          className={`flex w-full items-center gap-2 text-lg border-t-[1px] 
            font-medium p-4 hover:bg-[#ecf3fdff] hover:text-red-500 cursor-pointer transition `}
        >
          <TbLogout2 size={25} className={`text-gray-500`} />
          Logout
        </button>
      </ul>
    </div>
  );
};

export default SideBar;
