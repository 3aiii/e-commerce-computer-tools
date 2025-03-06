import React from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { FiBox, FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-fit">
      <div className="flex justify-center min-h-16 border-b-[2px] border-gray-200">
        <div className="flex justify-between items-center xl:w-[1180px] 2xl:w-[1580px]">
          <div className="w-fit text-xl text-orange-600 font-semibold">
            Laventory
          </div>
          <div className="flex gap-4 items-center cursor-pointer">
            <img
              className="w-[40px] h-[40px] rounded-full"
              src="https://placehold.co/40x40"
            />
            <span>ADMIN</span>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center min-h-16 border-b-[2px] border-gray-200">
        <div className="flex text-lg font-light gap-4 items-center xl:w-[1180px] 2xl:w-[1580px]">
          <Link
            to={"/administrator/dashboard"}
            className="flex items-center gap-2 cursor-pointer text-gray-500"
          >
            <AiOutlineHome size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to={"/administrator/Products"}
            className="flex items-center gap-2 cursor-pointer text-gray-500"
          >
            <FiBox size={20} />
            <span>Products</span>
          </Link>
          <Link
            to={"/administrator/Orders"}
            className="flex items-center gap-2 cursor-pointer text-gray-500"
          >
            <AiOutlineShoppingCart size={20} />
            <span>Orders</span>
          </Link>
          <Link
            to={"/administrator/Categories"}
            className="flex items-center gap-2 cursor-pointer text-gray-500"
          >
            <MdOutlineCategory size={20} />
            <span>Categories</span>
          </Link>
          <Link
            to={"/administrator/Users"}
            className="flex items-center gap-2 cursor-pointer text-gray-500"
          >
            <FiUsers size={20} />
            <span>Users</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
