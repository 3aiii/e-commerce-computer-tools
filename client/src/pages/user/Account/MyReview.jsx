import React from "react";
import { FaStar } from "react-icons/fa";

const MyReview = () => {
  return (
    <div className="my-6">
      <div>
        <h1 className="text-xl font-semibold">My Review</h1>
        <p className="text-sm font-base text-[#757575]">
          Comment about products through reviews.
        </p>
      </div>
      <div className="border-[1px] rounded-lg my-6">
        <div className="flex gap-6 px-8 py-4 bg-[#F5F5F5]">
          <img
            className="w-[80px] h-[80px] object-contain rounded-lg bg-white p-2"
            src={`https://www.pngarts.com/files/4/PC-Mouse-PNG-Image-Transparent.png`}
          />
          <div className="flex flex-col justify-center  gap-2 w-full">
            <h3 className="font-light">
              ขาตั้งจอคอมพิวเตอร์ ERGONOZ EGN-FMAV2-D Monitor Arm
            </h3>
          </div>
          <div
            className="flex items-center gap-2 px-5 py-2 rounded-xl 
            w-fit h-fit text-white bg-red-500 text-xl font-semibold"
          >
            <FaStar className="text-yellow-300" size={20} />
            <span>5.0</span>
          </div>
        </div>
        <div className="grid grid-cols-2 items-start px-8 py-6 gap-6">
          <div className="flex items-center gap-6">
            <ul className="flex flex-col text-gray-700 font-medium text-md w-full">
              <li className="flex items-center gap-2">
                Material{" "}
                <div className="w-full rounded-md h-2 bg-red-500"></div>{" "}
                <span className="text-red-500">5</span>
              </li>
              <li className="flex items-center gap-2">
                Functionality{" "}
                <div className="w-full rounded-md h-2 bg-red-500"></div>{" "}
                <span className="text-red-500">5</span>
              </li>
              <li className="flex items-center gap-2">
                Complementary{" "}
                <div className="w-full rounded-md h-2 bg-red-500"></div>{" "}
                <span className="text-red-500">5</span>
              </li>
              <li className="flex items-center gap-2">
                Used <div className="w-full rounded-md h-2 bg-red-500"></div>{" "}
                <span className="text-red-500">5</span>
              </li>
              <li className="flex items-center gap-2">
                Worth <div className="w-full rounded-md h-2 bg-red-500"></div>{" "}
                <span className="text-red-500">5</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <img
                className="w-[50px] h-[50px] object-cover rounded-full"
                src="https://f.ptcdn.info/381/083/000/s9n7im1o6bkINsVTgUOV0-o.jpg"
              />
              <div>
                <h4 className="font-medium text-lg">honeyhney839</h4>
                <span className="text-[#757575] text-sm font-light">
                  Review date : October 3, 2024
                </span>
              </div>
            </div>
            <div className="border-[1px] w-full rounded-md px-4 py-2 font-light text-sm">
              "Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReview;
