import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { FiBox, FiUsers } from "react-icons/fi";
import { MdOutlineCategory, MdOutlineDiscount } from "react-icons/md";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { findOne } from "../../composables/administrator/UserService";
import { IMAGE_URL } from "../../secret";
import {
  logout,
  verify,
} from "../../composables/authentication/Authentication";
import { showErrorToast } from "../ToastNotification";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [user, setUser] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isActive = (path) =>
    location.pathname === path || matchPath(path, location.pathname);

  const getLinkClassName = (path) =>
    isActive(path) ? "active-link-navbar-admin" : "inactive-link-navbar-admin";

  const getUnderlineClassName = (path) =>
    isActive(path)
      ? "underline-active-navbar-admin"
      : "underline-inactive-navbar-admin";

  const handleLogout = async () => {
    const { data } = await logout();

    if (data?.message === "Logged out successfully") {
      navigate("/sign-in");
    } else {
      showErrorToast(data?.meesage);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await verify();
      const { data } = await findOne(response?.data?.user?.id);

      setUser(data);
    };

    fetchUser();
  }, []);

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
    <div className="w-full h-fit bg-white">
      <div className="flex justify-center min-h-16 border-b-[1px] border-gray-200">
        <div className="flex justify-between items-center w-[1280px]">
          <Link
            to={"/administrator/dashboard"}
            className="w-fit text-xl text-blue-600 font-semibold"
          >
            E-COMMERCE PANEL
          </Link>

          <div className="relative inline-block">
            <div
              onClick={toggleDropdown}
              className="flex gap-4 items-center cursor-pointer"
            >
              <img
                className={`w-[40px] h-[40px] object-cover rounded-full`}
                src={
                  user?.profile?.[0]?.image === null ||
                  user?.profile?.[0]?.image === ""
                    ? `https://placehold.co/40x40`
                    : `${IMAGE_URL}/${user?.profile?.[0]?.image}`
                }
                alt="Admin"
              />
              <span>
                {user?.profile?.[0]?.firstname} {user?.profile?.[0]?.lastname}
              </span>
            </div>

            {/* Dropdown Menu */}
            <div
              ref={dropdownRef}
              className={`absolute right-0 mt-2 w-56 bg-white border 
              border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-300 ease-out transform ${
                dropdownOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <ul className="py-2 text-gray-500">
                <Link
                  to={"/administrator/profile"}
                  state={{ user }}
                  onClick={() => setDropdownOpen(false)}
                >
                  <li className="flex gap-2 px-10 py-2 hover:text-blue-500 hover:bg-gray-100 cursor-pointer">
                    <IoSettingsOutline className="text-xl" />
                    Setting
                  </li>
                </Link>
              </ul>
              <div
                onClick={handleLogout}
                className="flex  items-center gap-2 border-t px-10 py-2 bg-red-500 text-white
                   hover:bg-red-600 cursor-pointer transition rounded-br-md rounded-bl-md"
              >
                <CiLogout className="text-xl" /> ออกจากระบบ
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center min-h-16">
        <div className="flex text-lg font-light gap-4 items-center w-[1280px]">
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
            className={`link-navbar-text ${
              isActive("/administrator/products") ||
              isActive("/administrator/products/create") ||
              isActive("/administrator/products/:id/edit") ||
              isActive("/administrator/products/:id")
                ? "active-link-navbar-admin"
                : "inactive-link-navbar-admin"
            }`}
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
            className={`link-navbar-text ${
              isActive("/administrator/orders") ||
              isActive("/administrator/orders/:id")
                ? "active-link-navbar-admin"
                : "inactive-link-navbar-admin"
            }`}
          >
            <AiOutlineShoppingCart size={20} />
            <span>Orders</span>
            <span
              className={`underline-navbar-text ${
                isActive("/administrator/orders") ||
                isActive("/administrator/orders/:id")
                  ? "underline-active-navbar-admin"
                  : "underline-inactive-navbar-admin"
              }`}
            />
          </Link>

          {/* Categories Link */}
          <Link
            to="/administrator/categories"
            className={`link-navbar-text ${
              isActive("/administrator/categories") ||
              isActive("/administrator/categories/create") ||
              isActive("/administrator/categories/:id/edit")
                ? "active-link-navbar-admin"
                : "inactive-link-navbar-admin"
            }`}
          >
            <MdOutlineCategory size={20} />
            <span>Categories</span>
            <span
              className={`underline-navbar-text ${
                isActive("/administrator/categories") ||
                isActive("/administrator/categories/create") ||
                isActive("/administrator/categories/:id/edit")
                  ? "underline-active-navbar-admin"
                  : "underline-inactive-navbar-admin"
              }`}
            />
          </Link>

          {/* Users Link */}
          <Link
            to="/administrator/users"
            className={`link-navbar-text ${
              isActive("/administrator/users") ||
              isActive("/administrator/users/create") ||
              isActive("/administrator/users/:id/edit") ||
              isActive("/administrator/users/:id")
                ? "active-link-navbar-admin"
                : "inactive-link-navbar-admin"
            }`}
          >
            <FiUsers size={20} />
            <span>Users</span>
            <span
              className={`underline-navbar-text ${
                isActive("/administrator/users") ||
                isActive("/administrator/users/create") ||
                isActive("/administrator/users/:id/edit") ||
                isActive("/administrator/users/:id")
                  ? "underline-active-navbar-admin"
                  : "underline-inactive-navbar-admin"
              }`}
            />
          </Link>

          {/* Discount Link */}
          <Link
            to="/administrator/discount"
            className={`link-navbar-text ${
              isActive("/administrator/discount") ||
              isActive("/administrator/discount/create") ||
              isActive("/administrator/discount/:slug/edit")
                ? "active-link-navbar-admin"
                : "inactive-link-navbar-admin"
            }`}
          >
            <MdOutlineDiscount size={20} />
            <span>Discount</span>
            <span
              className={`underline-navbar-text ${
                isActive("/administrator/discount") ||
                isActive("/administrator/discount/create") ||
                isActive("/administrator/discount/:slug/edit")
                  ? "underline-active-navbar-admin"
                  : "underline-inactive-navbar-admin"
              }`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
