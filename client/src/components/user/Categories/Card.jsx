import React from "react";
import { IMAGE_URL } from "../../../secret";

const Card = ({ order, index }) => {
  return (
    <div className="flex items-center bg-white rounded-xl p-4 gap-4 relative shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div
        className="absolute -top-2 -left-2 flex items-center justify-center w-8 h-8 
        bg-red-500 text-white rounded-full border-2 border-white shadow-md text-md font-semibold"
      >
        {index + 1}
      </div>
      <img
        src={`${
          order?.ProductImage?.[0]
            ? `${IMAGE_URL}/${order?.ProductImage?.[0]?.url}`
            : `https://placehold.co/70x70`
        }`}
        className="object-cover w-[70px] h-[70px] rounded-lg border border-gray-300"
      />
      <div className="cursor-default">
        <span className="text-red-500 text-sm font-semibold">
          หมวดหมู่: {order?.category?.name}
        </span>
        <h2 className="line-clamp-2 font-medium text-gray-800 text-base">
          {order?.name}
        </h2>
      </div>
    </div>
  );
};

export default Card;
