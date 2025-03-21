import React, { useEffect, useState } from "react";
import { findAll as findAllProducts } from "../composables/administrator/ProductService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { default as CateCard } from "../components/user/Categories/Card";
import { default as HeroCard } from "./../components/user/Hero/Card";
import { default as ProductCard } from "./user/Products/Card";
import MockHero from "../components/user/Hero/MockHero";
import Service from "../components/user/Hero/Service";
import { TbTruckDelivery, TbHeadset } from "react-icons/tb";
import { findProductByCategory } from "../composables/user/CategoryService";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [productsBestSelling, setProductsBestSelling] = useState([]);
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
    const fetchProducts = async () => {
      const { data } = await findAllProducts(1, 12, "", "active");
      setProducts(data?.data);
    };

    const fetchProductssBestSelling = async () => {
      const { data } = await findAllProducts(1, 6, "", "active");
      setProductsBestSelling(data?.data);
    };

    fetchProducts();
    fetchProductssBestSelling();
  }, []);

  return (
    <div>
      <div className="flex gap-2">
        <div className="w-2/3 mt-2">
          <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
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
            <CateCard order={1} />
            <CateCard order={2} />
            <CateCard order={3} />
          </div>
        </div>
      </div>

      <div className="mt-4 border-b-[1px] pb-12">
        <HeroCard name={"Best Selling Products !"} navigateTo={"/products"} />
        <div className="grid grid-cols-6 gap-4 mt-4">
          {productsBestSelling.map((product, index) => (
            <ProductCard data={product} key={index} />
          ))}
        </div>
      </div>

      <div className="my-12">
        <MockHero />
      </div>

      <div className="mt-4 border-b-[1px] pb-12">
        <HeroCard name={"Explore Our Products"} navigateTo={`/products`} />
        <div className="grid grid-cols-6 gap-4 mt-4">
          {products.map((product, index) => (
            <ProductCard data={product} key={index} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 items-center mt-12 my-12">
        <Service
          icon={TbTruckDelivery}
          Topic="FREE AND FAST DELIVERY"
          Desc="Free delivery for all orders over $140"
        />
        <Service
          icon={TbHeadset}
          Topic="24/7 CUSTOMER SERVICE"
          Desc="Friendly 24/7 customer support"
        />
        <Service
          icon={TbTruckDelivery}
          Topic="FREE AND FAST DELIVERY"
          Desc="Free delivery for all orders over $140"
        />
      </div>
    </div>
  );
};

export default Index;
