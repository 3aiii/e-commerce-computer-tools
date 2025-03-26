import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { findAll } from "../../../composables/user/ReviewService";
import { verify } from "../../../composables/authentication/Authentication";
import { IMAGE_URL } from "../../../secret";

const MyReview = () => {
  const [activeTab, setActiveTab] = useState("Waiting");
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const [reviewProduct, setReviewProduct] = useState([]);
  const tabs = ["Waiting", "Reviewed"];
  const tabRefs = useRef([]);
  console.log(reviewProduct);
  useEffect(() => {
    const fetchReviews = async () => {
      const user = await verify();
      const { data } = await findAll(user?.data?.user?.id, activeTab);
      setReviewProduct(data);
    };
    fetchReviews();
  }, [activeTab]);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    if (tabRefs.current[activeIndex]) {
      const { offsetWidth, offsetLeft } = tabRefs.current[activeIndex];
      setUnderlineStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [activeTab]);

  return (
    <div className="my-6">
      <h1 className="text-xl font-semibold">My Review</h1>
      <p className="text-sm font-base text-[#757575]">
        Comment about products through reviews.
      </p>

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

      {activeTab === "Waiting" &&
        (reviewProduct?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 py-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
              alt="No Reviews"
              className="w-32 h-32 mb-4 filter brightness-0 invert-[20%] sepia-[100%] saturate-[5000%] hue-rotate-[350deg] contrast-[1.2]"
            />
            <p className="text-lg font-semibold">No waiting reviews</p>
            <p className="text-sm text-gray-400">
              Products awaiting your review will appear here.
            </p>
          </div>
        ) : (
          reviewProduct?.map((reviewPro, index) => (
            <div className="border-[1px] rounded-lg my-6" key={index}>
              <div className="flex justify-between px-8 py-4 hover:bg-[#ecf3fdff] transition border-b-[1px]">
                <div className="flex gap-4 w-2/3">
                  <img
                    className="w-[80px] h-[80px] object-contain rounded-lg bg-white p-2"
                    src={`${IMAGE_URL}/${reviewPro?.product?.ProductImage?.[0]?.url}`}
                    alt={reviewPro?.product?.name}
                  />
                  <div className="flex flex-col justify-center items-start gap-1 w-full">
                    <div className="font-semibold">
                      # {reviewPro?.order?.invoiceNo}
                    </div>
                    <h3 className="font-light break-words break-all">
                      {reviewPro?.product?.name}
                    </h3>
                    <span className="text-[#858585] text-sm font-light">
                      Quantity : {reviewPro?.quantity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center my-2 mr-4">
                <button className="rounded-lg px-12 py-2 bg-red-200 hover:bg-red-300 text-red-500 transition font-medium text-md">
                  Rating
                </button>
              </div>
            </div>
          ))
        ))}

      {activeTab === "Reviewed" &&
        (reviewProduct?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 py-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
              alt="No Reviews"
              className="w-32 h-32 mb-4 filter brightness-0 invert-[20%] sepia-[100%] saturate-[5000%] hue-rotate-[350deg] contrast-[1.2]"
            />
            <p className="text-lg font-semibold">No reviews yet</p>
            <p className="text-sm text-gray-400">
              Your reviewed products will appear here.
            </p>
          </div>
        ) : (
          reviewProduct?.map((reviewPro, index) => (
            <div className="border-[1px] rounded-lg my-6" key={index}>
              <div className="flex gap-6 px-8 py-4 bg-[#F5F5F5]">
                <img
                  className="w-[80px] h-[80px] object-contain rounded-lg bg-white p-2"
                  src={`${IMAGE_URL}/${reviewPro?.product?.ProductImage?.[0]?.url}`}
                  alt="Reviewed Product"
                />
                <div className="flex flex-col justify-center gap-2 w-full">
                  <h3 className="font-light">{reviewPro?.product?.name}</h3>
                </div>
                <div className="flex items-center gap-2 px-5 py-2 rounded-xl w-fit h-fit text-white bg-red-500 text-xl font-semibold">
                  <FaStar className="text-yellow-300" size={20} />
                  <span>5.0</span>
                </div>
              </div>
              <div className="grid grid-cols-2 items-start px-8 py-6 gap-6">
                <div className="flex items-center gap-6">
                  <ul className="flex flex-col text-gray-700 font-medium text-md w-full">
                    {[
                      "Material",
                      "Functionality",
                      "Complementary",
                      "Used",
                      "Worth",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        {item}{" "}
                        <div className="w-full rounded-md h-2 bg-red-500"></div>{" "}
                        <span className="text-red-500">5</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4">
                    <img
                      className="w-[50px] h-[50px] object-cover rounded-full"
                      src="https://f.ptcdn.info/381/083/000/s9n7im1o6bkINsVTgUOV0-o.jpg"
                      alt="Reviewer"
                    />
                    <div>
                      <h4 className="font-medium text-lg">honeyhney839</h4>
                      <span className="text-[#757575] text-sm font-light">
                        Review Date: October 3, 2024
                      </span>
                    </div>
                  </div>
                  <div className="border-[1px] w-full rounded-md px-4 py-2 font-light text-sm">
                    "Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry..."
                  </div>
                </div>
              </div>
            </div>
          ))
        ))}
    </div>
  );
};

export default MyReview;
