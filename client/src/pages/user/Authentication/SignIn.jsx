import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { login } from "../../../composables/authentication/Authentication";
import { showErrorToast } from "../../../components/ToastNotification";
import { toast } from "react-toastify";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(formData);

    if (response.status === 201) {
      toast.success("เข้าสู่ระบบสำเร็จ!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          window.location.reload();
        },
      });
    } else {
      showErrorToast("เกิดข้อผิดพลาด โปรดลองดูอีกครั้ง");
    }
  };

  return (
    <>
      <div className="flex flex-col w-1/2">
        <h2 className="text-4xl font-base text-[#313131]">Sign In</h2>
        <p className="text-base text-[#313131] opacity-75 mb-4 mt-2 font-light">
          Sign in to access your account and manage your preferences
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
          <div className="text-center mt-4">
            <p className="text-base font-light">
              Don't have an account?{" "}
              <Link to={"/sign-up"} className="text-orange-500">
                sign up
              </Link>
            </p>
            <div className="flex items-center mt-6">
              <div className="h-[1px] w-full bg-[#313131] opacity-25 "></div>
              <p className="text-[#313131] opacity-50 font-light w-fit px-4">
                OR
              </p>
              <div className="h-[1px] w-full bg-[#313131] opacity-25 "></div>
            </div>
            <div className="flex justify-center gap-2 mt-4 ">
              <Link
                to={"/sign-in"}
                className="flex w-1/3 items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 transition duration-300"
              >
                <FaGoogle /> Google
              </Link>
              <Link
                to={"/sign-in"}
                className="flex w-1/3 items-center justify-center gap-2 bg-blue-700 text-white px-4 py-3 rounded-md hover:bg-blue-800 transition duration-300"
              >
                <FaFacebook /> Facebook
              </Link>
              <Link
                to={"/sign-in"}
                className="flex w-1/3 items-center justify-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-md hover:bg-gray-900 transition duration-300"
              >
                <FaGithub /> GitHub
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="w-1/2">
        <img
          src="/sign-in-image.png"
          className="w-full h-full object-cover"
          alt="Sign In"
        />
      </div>
    </>
  );
};

export default SignIn;
