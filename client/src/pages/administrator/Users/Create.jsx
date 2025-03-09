import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { findAll } from "../../../composables/administrator/CategoryService";
import {
  create,
  image,
} from "../../../composables/administrator/ProductService";
import { toast } from "react-toastify";
import { showErrorToast } from "./../../../components/ToastNotification";

const Create = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState([]);
  const [imageData, setImage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview([previewUrl]);
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await create(updateProduct);

    if (response.status === 201) {
      if (imageData) {
        await image(imageData, response?.data?.id);
      }

      toast.success("สร้างสินค้าสำเร็จ!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          navigate("/administrator/users");
        },
      });
    } else {
      showErrorToast("เกิดข้อผิดพลาด โปรดลองดูอีกครั้ง");
    }
  };

  return (
    <div className="flex gap-4 mt-6">
      <div className="input-layout-left h-fit">
        <h1 className="text-xl">User Image</h1>
        <div className="my-4 mb-1 ">
          {imagePreview.length > 0 ? (
            <div className="mt-4">
              <div className="flex gap-2 mt-2">
                {imagePreview.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-56 object-contain rounded-md border border-gray-300"
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <label className="flex flex-col items-center justify-center w-full px-4 py-8 mb-2 bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition">
                <svg
                  className="w-10 h-10 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V12M7 12V8M7 12h10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="text-gray-600">Click to upload a file</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  multiple
                />
              </label>
              <div className="text-[#868686] font-light text-sm text-center mt-2">
                PNG or JPG no larger than 1 MB
              </div>
            </>
          )}
        </div>
      </div>
      <div className="input-layout-right">
        <h1 className="text-xl">User Details</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mt-4">
            <label className="text-md">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-field"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              className="input-field"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-full gap-1">
              <label className="text-md">Firstname</label>
              <input
                type="text"
                name="firstname"
                value={user.firstname}
                onChange={handleChange}
                placeholder="Firstname"
                className="input-field"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-md">Lastname</label>
              <input
                type="text"
                name="lastname"
                value={user.lastname}
                onChange={handleChange}
                placeholder="Lastname"
                className="input-field"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md">
              Role<span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value={""} disabled>
                กรุณาเลือกประเภทของผู้ใช้งาน
              </option>
              <option value={"USER"}>USER</option>
              <option value={"ADMIN"}>ADMIN</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 border-t-[1px] border-gray-300 p-2 pt-4 ">
            <Link
              to={"/administrator/users"}
              className="cancel-button flex items-center gap-2"
            >
              <FaArrowLeftLong /> Cancel
            </Link>
            <button
              type="submit"
              className="update-button flex items-center gap-2"
            >
              <FaSave /> Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
