import { MdOutlineDiscount } from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri";
import React, { useState } from "react";

const DiscountCoupon = ({ coupon, setCoupon, setDiscountObject }) => {
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const validCoupons = {
    TEST: 10,
    FREESHIP: "Free Shipping",
  };

  const applyCoupon = () => {
    if (validCoupons[coupon]) {
      setAppliedCoupon(coupon);
      setDiscountObject(validCoupons);
    } else {
      alert("Invalid coupon");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountObject([])
  };

  return (
    <div className="border-[1px] rounded-lg px-6 py-4">
      <h1 className="flex gap-4 items-center font-medium">
        <MdOutlineDiscount size={23} className="text-gray-500 opacity-80" />
        Discount coupon
      </h1>

      {appliedCoupon ? (
        <div className="mt-4 flex justify-between items-center bg-green-100 text-green-700 px-4 py-2 rounded-md">
          <span>
            Applied: <strong>{appliedCoupon}</strong>
          </span>
          <RiCloseCircleLine
            size={20}
            className="cursor-pointer text-red-500"
            onClick={removeCoupon}
          />
        </div>
      ) : (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full font-light text-base px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div className="flex justify-end">
            <button
              onClick={applyCoupon}
              className="w-fit text-center px-4 py-1 bg-red-500 mt-2
              hover:bg-red-600 text-white rounded-md transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountCoupon;
