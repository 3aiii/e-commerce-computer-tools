import React, { useState, useRef, useEffect } from "react";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const [order, setOrder] = useState({
    status: "Processing",
  });

  const tabs = ["All", "Pending", "Processing", "Shipped", "Delivered"];
  const tabRefs = useRef([]);
  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    if (tabRefs.current[activeIndex]) {
      const { offsetWidth, offsetLeft } = tabRefs.current[activeIndex];
      setUnderlineStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [activeTab]);

  return (
    <div className="my-6">
      <div>
        <h1 className="text-xl font-semibold">Order History</h1>
      </div>
      <div className="relative border-b-[1px] my-6">
        <ul className="flex gap-6 relative">
          {tabs.map((tab, index) => (
            <li
              key={tab}
              ref={(el) => (tabRefs.current[index] = el)}
              className={`px-4 py-3 cursor-pointer ${
                activeTab === tab ? "text-red-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
        <div
          className="absolute bottom-0 h-1 bg-red-500 transition-all duration-300"
          style={underlineStyle}
        ></div>
      </div>
      <div className="border-[1px] rounded-lg mb-6">
        <div className="flex justify-between px-8 py-4 border-b-[1px]">
          <h4 className="font-semibold text-lg">
            Invoice No. #ECO-250312-001{" "}
            <span className="font-light text-xs text-[#979797]">
              (Total 1 pieces)
            </span>
          </h4>
          <div
            className={`flex justify-center items-center p-[2px] px-2 gap-1
              rounded-md font-normal cursor-default w-fit ${
                order.status === "Pending"
                  ? "bg-orange-100 text-orange-600"
                  : order.status === "Processing"
                  ? "bg-blue-100 text-blue-600"
                  : order.status === "Shipped"
                  ? "bg-yellow-100 text-yellow-600"
                  : order.status === "Delivered"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            {order.status}
          </div>
        </div>
        <div className="grid grid-cols-3 px-8 py-4 border-b-[1px] bg-[#F5F5F5]">
          <div className="flex flex-col">
            <label className="text-[#777777] font-base">Order Date</label>
            <span className="font-medium">Jul 28, 2024, 12:59 AM</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <label>Total</label>
            <span className="text-[#777777] font-base">(including Tax)</span>
          </div>
          <div className="text-3xl text-red-500 font-semibold flex justify-end items-center">
            ฿1,335
          </div>
        </div>
        <div className="flex px-8 py-4 hover:bg-[#ecf3fdff] transition">
          <div className="flex gap-4 w-2/3">
            <img
              className="w-[80px] h-[80px] object-contain rounded-lg bg-white p-2"
              src={`https://www.pngarts.com/files/4/PC-Mouse-PNG-Image-Transparent.png`}
            />
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              <h3 className="font-light">
                ขาตั้งจอคอมพิวเตอร์ ERGONOZ EGN-FMAV2-D Monitor Arm
              </h3>
              <span className="text-[#858585] text-sm font-light">
                Quantity : 1
              </span>
            </div>
          </div>
          <div className="flex justify-end items-center w-1/3">
            <button
              className="rounded-lg px-12 py-2 bg-red-200 hover:bg-red-300 
              text-red-500 transition font-medium text-md"
            >
              Receipt
            </button>
          </div>
        </div>
      </div>
      <div className="border-[1px] rounded-lg mb-6">
        <div className="flex justify-between px-8 py-4 border-b-[1px]">
          <h4 className="font-semibold text-lg">
            Invoice No. #ECO-250312-001{" "}
            <span className="font-light text-xs text-[#979797]">
              (Total 1 pieces)
            </span>
          </h4>
          <div
            className={`flex justify-center items-center p-[2px] px-2 gap-1
              rounded-md font-normal cursor-default w-fit ${
                order.status === "Pending"
                  ? "bg-orange-100 text-orange-600"
                  : order.status === "Processing"
                  ? "bg-blue-100 text-blue-600"
                  : order.status === "Shipped"
                  ? "bg-yellow-100 text-yellow-600"
                  : order.status === "Delivered"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            {order.status}
          </div>
        </div>
        <div className="grid grid-cols-3 px-8 py-4 border-b-[1px] bg-[#F5F5F5]">
          <div className="flex flex-col">
            <label className="text-[#777777] font-base">Order Date</label>
            <span className="font-medium">Jul 28, 2024, 12:59 AM</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <label>Total</label>
            <span className="text-[#777777] font-base">(including Tax)</span>
          </div>
          <div className="text-3xl text-red-500 font-semibold flex justify-end items-center">
            ฿1,335
          </div>
        </div>
        <div className="flex px-8 py-4 hover:bg-[#ecf3fdff] transition">
          <div className="flex gap-4 w-2/3">
            <img
              className="w-[80px] h-[80px] object-contain rounded-lg bg-white p-2"
              src={`https://www.pngarts.com/files/4/PC-Mouse-PNG-Image-Transparent.png`}
            />
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              <h3 className="font-light">
                ขาตั้งจอคอมพิวเตอร์ ERGONOZ EGN-FMAV2-D Monitor Arm
              </h3>
              <span className="text-[#858585] text-sm font-light">
                Quantity : 1
              </span>
            </div>
          </div>
          <div className="flex justify-end items-center w-1/3">
            <button
              className="rounded-lg px-12 py-2 bg-red-200 hover:bg-red-300 
              text-red-500 transition font-medium text-md"
            >
              Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
