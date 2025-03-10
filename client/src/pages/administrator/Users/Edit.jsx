import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IMAGE_URL } from "../../../secret";
import { toast } from "react-toastify";
import { showErrorToast } from "../../../components/ToastNotification";
import {
  findOne,
  image,
  update,
} from "../../../composables/administrator/UserService";

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location?.state?.user;

  const [imageArray, setImagaeArray] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [imageData, setImage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
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
    const file = Array.from(e.target.files);
    const newImagePreview = file.map((file) => URL.createObjectURL(file));

    if (file.length > 0) {
      setImagePreview(newImagePreview);
      setImage(file?.[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageData && imageData.size > 1048576) {
      showErrorToast("กรุณาอัปโหลดไฟล์ขนาดไม่เกิน 1MB");
      return;
    }

    try {
      const response = await update(id, user);
      if (response.status === 200) {
        if (imageData) {
          await image(imageData, response?.data?.id);
        }

        toast.success("ปรับแก้ผู้ใช้งานสำเร็จ!", {
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
    } catch (error) {
      if (error.response.data.statusCode === 400) {
        showErrorToast("กรุณาอัปโหลดไฟล์ jpeg | jpg | png ");
      } else if (error.response.data.statusCode === 413) {
        showErrorToast("กรุณาอัปโหลดไฟล์ความจุไม่เกิน 1 MB ");
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await findOne(id);

      setImagaeArray(data?.profile?.[0]?.image);
      setUser({
        email: data?.email,
        password: "",
        firstname: data?.profile?.[0]?.firstname,
        lastname: data?.profile?.[0]?.lastname,
        phone: data?.profile?.[0]?.phone || "",
        address: data?.profile?.[0]?.address || "",
        role: data?.role,
      });
    };

    fetchUser();
  }, []);

  return (
    <div className="flex gap-4 mt-6">
      <div className="input-layout-left h-fit">
        <h1 className="text-xl">User Image</h1>
        <div className="my-4 mb-1">
          {!imageArray ? (
            <img
              src={`https://placehold.co/350x200`}
              alt="User"
              className="w-full h-56 object-contain border-gray-300"
            />
          ) : (
            <img
              src={`${IMAGE_URL}/${imageArray}`}
              alt="User"
              className="w-full mb-8 h-56 object-contain border-gray-300"
            />
          )}
        </div>
        <div className="w-full mt-4">
          {imagePreview?.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-xl">Selected Images</h3>
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
              type="email"
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
            />
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
            <label className="text-md">Phone</label>
            <input
              type="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Password"
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md">Address</label>
            <textarea
              type="address"
              name="address"
              value={user.address}
              onChange={handleChange}
              placeholder="Address"
              className="input-field h-36  resize-none"
            ></textarea>
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

export default Edit;
