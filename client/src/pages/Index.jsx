import React, { useEffect, useState } from "react";
import { findAll } from "../composables/administrator/CategoryService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Card from "../components/user/Categories/Card";

const Index = () => {
  const [categories, setCateogries] = useState([]);
  const imageArray = [
    {
      url: "https://www.finnix.co/wp-content/uploads/2022/12/221213-FINNIX-Mercular-Image-Deal-Banner-FINNIX-Website-1564x880-December.png",
    },
    { url: "https://images7.alphacoders.com/737/737400.jpg" },
    {
      url: "https://mercular.s3.ap-southeast-1.amazonaws.com/images/landing-pages/2019/11/Surprise%20Sale/Surprise-sale-DSL-1.jpg",
    },
  ];

  useEffect(() => {
    const fetchs = async () => {
      const { data } = await findAll(1, 99, "", "active");
      setCateogries(data?.data);
    };

    fetchs();
  }, []);

  return (
    <div className="flex gap-2">
      <div className="w-2/3 mt-2">
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {imageArray.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${img.url}`}
                alt="Product"
                className="w-[848px] h-[400px] object-cover border border-gray-300 rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-1/3 bg-red-500 rounded-lg p-4">
        <h1 className="text-xl font-semibold text-white pb-3">
        🔥 Best Seller ตลอดกาล!
        </h1>
        <div className="flex flex-col gap-4">
          <Card order={1} />
          <Card order={2} />
          <Card order={3} />
        </div>
      </div>
    </div>
  );
};

export default Index;
