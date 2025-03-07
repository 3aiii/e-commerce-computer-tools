import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const Create = () => {
  const [imagePreview, setImagePreview] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreview = files.map((file) => URL.createObjectURL(file));

    if (files.length > 0) {
      setImagePreview(newImagePreview);
    }
  };

  return (
    <div className="flex gap-4 mt-6">
      <div className="input-layout-left h-fit">
        <h1 className="text-xl">Product Image</h1>
        <div className="my-4 mb-1 ">
          {imagePreview?.length > 0 ? (
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
              <label className="flex flex-col items-center justify-center w-full px-4 py-6 mb-2 bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition">
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
        <h1 className="text-xl">Product Details</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 mt-4">
            <label className="text-md">
              Name<span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="Name" className="input-field" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md">
              Category<span className="text-red-500">*</span>
            </label>
            <select className="input-field">
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-full gap-1">
              <label className="text-md">
                Price<span className="text-red-500">*</span>
              </label>
              <input type="text" placeholder="Price" className="input-field" />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-md">Tax</label>
              <input type="text" placeholder="Tax" className="input-field" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-md">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Description"
              className="input-field h-24 resize-none"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 border-t-[1px] border-gray-300 p-2 pt-4 ">
            <button className="update-button flex items-center gap-2">
              <FaSave /> Create
            </button>
            <Link
              to={"/administrator/products"}
              className="cancel-button flex items-center gap-2"
            >
              <FaArrowLeftLong /> Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
