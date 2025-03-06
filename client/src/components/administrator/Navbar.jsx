import React from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { FiBox, FiUsers } from "react-icons/fi";
import { MdOutlineCategory, MdOutlineDiscount } from "react-icons/md";
import { Link, matchPath, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || matchPath(path, location.pathname);

  const getLinkClassName = (path) =>
    isActive(path) ? "active-link-navbar-admin" : "inactive-link-navbar-admin";

  const getUnderlineClassName = (path) =>
    isActive(path)
      ? "underline-active-navbar-admin"
      : "underline-inactive-navbar-admin";

  return (
    <div className="w-full h-fit bg-white">
      <div className="flex justify-center min-h-16 border-b-[1px] border-gray-200">
        <div className="flex justify-between items-center xl:w-[1180px] 2xl:w-[1580px]">
          <div className="w-fit text-xl text-blue-600 font-semibold">
            E-COMMERCE PANEL
          </div>
          <div className="flex gap-4 items-center cursor-pointer">
            <img
              className="w-[40px] h-[40px] rounded-full"
              src="https://placehold.co/40x40"
              alt="Admin"
            />
            <span>ADMIN</span>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center min-h-16">
        <div className="flex text-lg font-light gap-4 items-center xl:w-[1180px] 2xl:w-[1580px]">
          {/* Dashboard Link */}
          <Link
            to="/administrator/dashboard"
            className={`link-navbar-text ${getLinkClassName(
              "/administrator/dashboard"
            )}`}
          >
            <AiOutlineHome size={20} />
            <span>Dashboard</span>
            <span
              className={`underline-navbar-text ${getUnderlineClassName(
                "/administrator/dashboard"
              )}`}
            />
          </Link>

          {/* Products Link */}
          <Link
            to="/administrator/products"
            className={`link-navbar-text ${getLinkClassName(
              "/administrator/Products"
            )}`}
          >
            <FiBox size={20} />
            <span>Products</span>
            <span
              className={`underline-navbar-text ${
                isActive("/administrator/products") ||
                isActive("/administrator/products/create") ||
                isActive("/administrator/products/:id/edit") ||
                isActive("/administrator/products/:id")
                  ? "underline-active-navbar-admin"
                  : "underline-inactive-navbar-admin"
              }`}
            />
          </Link>

          {/* Orders Link */}
          <Link
            to="/administrator/orders"
            className={`link-navbar-text ${getLinkClassName(
              "/administrator/orders"
            )}`}
          >
            <AiOutlineShoppingCart size={20} />
            <span>Orders</span>
            <span
              className={`underline-navbar-text ${getUnderlineClassName(
                "/administrator/orders"
              )}`}
            />
          </Link>

          {/* Categories Link */}
          <Link
            to="/administrator/categories"
            className={`link-navbar-text ${getLinkClassName(
              "/administrator/categories"
            )}`}
          >
            <MdOutlineCategory size={20} />
            <span>Categories</span>
            <span
              className={`underline-navbar-text ${getUnderlineClassName(
                "/administrator/categories"
              )}`}
            />
          </Link>

          {/* Users Link */}
          <Link
            to="/administrator/users"
            className={`link-navbar-text ${getLinkClassName(
              "/administrator/users"
            )}`}
          >
            <FiUsers size={20} />
            <span>Users</span>
            <span
              className={`underline-navbar-text ${getUnderlineClassName(
                "/administrator/users"
              )}`}
            />
          </Link>

          {/* Discount Link */}
          <Link
            to="/administrator/discount"
            className={`link-navbar-text ${getLinkClassName(
              "/administrator/discount"
            )}`}
          >
            <MdOutlineDiscount size={20} />
            <span>Discount</span>
            <span
              className={`underline-navbar-text ${getUnderlineClassName(
                "/administrator/discount"
              )}`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
