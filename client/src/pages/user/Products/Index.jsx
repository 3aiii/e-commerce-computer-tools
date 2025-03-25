import React, { useEffect, useState } from "react";
import { TbCategory } from "react-icons/tb";
import { findAll } from "../../../composables/administrator/ProductService";
import Card from "./Card";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await findAll(1, 99, searchTerm, "active");
      setProducts(data?.data);
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <div className="mt-4">
      <div className="text-white bg-[url('/bg-category.jpg')] bg-right-top w-[1280px] h-[200px] object-contain rounded-xl">
        <div className="flex items-center gap-3 font-light text-md pl-8 pt-4 mb-2 h-[50px] cursor-default">
          <span>Home</span>
          <div className="w-1 h-1 rounded-full bg-red-500"></div>
          <span>All Product</span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center justify-center bg-red-500 rounded-tr-xl rounded-br-xl w-20 h-20">
            <TbCategory size={48} />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold">All Product</h1>
            <p className="w-[640px] text-sm">
              Welcome to DRACULA, your one-stop shop for high-performance
              computer equipment. From powerful graphics cards to
              precision-driven peripherals, we provide the latest tech to fuel
              your passion.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="font-light">
          มีสินค้าทั้งหมด{" "}
          <span className="font-semibold">“{products?.length}” </span>
          ชิ้น
        </div>
        <div>
          <input
            type="text"
            placeholder="🔍 Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96 font-light px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {products?.map((product, index) => (
          <Card data={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Index;
