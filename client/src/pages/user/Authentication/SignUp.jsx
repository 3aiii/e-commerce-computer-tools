import React, { useState } from "react";
import { Link } from "react-router-dom";
import { showErrorToast } from "../../../components/ToastNotification";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showErrorToast("Passwords do not match! Please try again.");
      return;
    }
    console.log("Sign In Data:", formData);
  };

  return (
    <>
      <div className="w-1/3">
        <img
          src="/sign-up-image.png"
          className="w-full h-full rounded-xl object-cover"
          alt="Sign In"
        />
      </div>
      <div className="flex flex-col w-2/3">
        <h2 className="text-4xl font-base text-gray-700">Sign Up</h2>
        <p className="text-sm font-light text-gray-500 mb-4 mt-4">
          Let’s get you all st up so you can access your personal account.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 mb-2">
            <div className="w-full">
              <label className="block text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="input-field"
                placeholder="First Name"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="input-field"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <div className="w-full">
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
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Create Account
          </button>
          <div className="text-center mt-4">
            <p className="text-base font-light">
              Already have an account?{" "}
              <Link to={"/sign-in"} className="text-orange-500">
                sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
