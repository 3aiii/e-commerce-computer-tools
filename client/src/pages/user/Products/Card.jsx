import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../../secret";
import { formatPrice } from "../../../utils/formatPrice";

const Card = ({ data }) => {
  return (
    <Link
      to={`/product/${data?.slug}`}
      state={{ data }}
      className="bg-white rounded-xl shadow-lg overflow-hidden p-3 flex flex-col items-center cursor-pointer 
             transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
    >
      <div className="relative w-full h-[140px] flex justify-center items-center">
        {data?.ProductImage?.length === 0 ? (
          <img
            src={`https://placehold.co/180x140`}
            alt="Product"
            className="w-[180px] h-full object-contain"
          />
        ) : (
          <img
            src={`${IMAGE_URL}/${data?.ProductImage?.[0]?.url}`}
            alt="Mouse"
            className="w-[180px] h-full object-contain"
          />
        )}
      </div>
      <div className="w-full flex flex-col gap-y-1 mt-2">
        <span className="text-xs text-white px-2 py-1 bg-red-500 rounded-md w-fit">
          {data?.category?.name}
        </span>
        <h1 className="text-sm font-light leading-tight line-clamp-2">
          {data?.name}
        </h1>
        <span className="text-md font-medium text-gray-900">
          ฿{formatPrice(data?.price)}
        </span>
      </div>
    </Link>
  );
};

export default Card;
