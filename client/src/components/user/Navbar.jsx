import React, { useEffect, useRef, useState } from "react";
import { TbCategory } from "react-icons/tb";
import { IMAGE_URL } from "../../secret";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { findAll } from "../../composables/administrator/CategoryService";
import {
  logout,
  verify,
} from "../../composables/authentication/Authentication";
import { findOne } from "../../composables/administrator/UserService";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCateogries] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    const { data } = await logout();

    if (data?.message === "Logged out successfully") {
      navigate("/sign-in");
    } else {
      showErrorToast(data?.meesage);
    }
  };

  useEffect(() => {
    const fetchs = async () => {
      const { data } = await findAll(1, 99, "", "active");
      setCateogries(data?.data);
    };

    fetchs();
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
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 left-0 z-[999] flex justify-center w-full bg-white py-2
        transition-all duration-300 ${
          isScrolled ? "bg-white border-b-[1px] shadow-md" : "bg-transparent"
        }`}
    >
      <div>
        <div className="flex w-[1280px] justify-between">
          <div className="flex items-center gap-4">
            <Link
              to={"/"}
              className="text-2xl font-bold tracking-wider text-red-500"
            >
              DRACULA STORE
            </Link>
            <Link
              to={"/products"}
              className="flex items-center text-sm px-2 py-1 gap-2 text-red-500 cursor-pointer
                  font-semibold bg-[#fae4e4] rounded-md transition hover:bg-red-200"
            >
              <TbCategory size={25} /> <span>ALL PRODUCT</span>
            </Link>
          </div>
          <div className="relative inline-block">
            <div className={`flex gap-${user ? `4` : `3`}`}>
              <Link to={"/cart"}>
                <IoCartOutline
                  size={35}
                  className="text-gray-500 hover:text-red-600 hover:bg-red-200 
                          rounded-full transition cursor-pointer p-1"
                />
              </Link>
              {user.length !== 0 ? (
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
                    alt="User"
                  />
                  <span>
                    {user?.profile?.[0]?.firstname}{" "}
                    {user?.profile?.[0]?.lastname}
                  </span>
                </div>
              ) : (
                <>
                  <Link
                    to={"/sign-in"}
                    className={`rounded-md font-semibold px-4 p-2 bg-red-500 text-white
                           hover:bg-red-400 transition`}
                  >
                    SIGN IN
                  </Link>
                  <Link
                    to={"/sign-up"}
                    className={`rounded-md font-semibold px-4 p-2 bg-transparent text-red-500
                           hover:bg-red-500 hover:text-white border-[1px] transition`}
                  >
                    SIGN UP
                  </Link>
                </>
              )}
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
                  to={"/account"}
                  state={{ user }}
                  onClick={() => setDropdownOpen(false)}
                >
                  <li className="flex gap-2 px-10 py-2 hover:text-red-500 hover:bg-gray-100 cursor-pointer">
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
        <div className="flex">
          <ul className="flex flex-wrap gap-4 pt-2">
            {categories.map((category, index) => (
              <Link
                to={`/categories/${category.name}`}
                state={{ category }}
                className={`bg-[#f4f6f8] hover:bg-red-200 text-red-500 transition rounded-md 
                  px-4 py-1 font-normal w-fit cursor-pointer ${
                    matchPath(`/categories/${category.name}`, location.pathname)
                      ? `bg-red-200`
                      : ``
                  }`}
                key={index}
              >
                {category.name}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
