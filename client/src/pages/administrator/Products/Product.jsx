import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const TableRow = ({ label, value, isHighlighted, alignTop }) => (
  <tr className="w-full">
    <td
      className={`text-left w-1/2 border-t border-r px-6 py-2 font-light break-words ${
        alignTop ? "align-top" : ""
      }`}
    >
      {label}
    </td>

    <td className={`w-1/2 border-t px-4 py-2 font-light`}>
      {isHighlighted ? (
        <span
          className={` p-[2px] px-2 rounded-md ${
            (label === "Category" && `bg-blue-100 text-blue-600`) ||
            (label === "Tax" && `bg-red-100 text-red-600`)
          } font-normal`}
        >
          {value}
        </span>
      ) : (
        <span>{value}</span>
      )}
    </td>
  </tr>
);

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    tax: "",
    description: "",
    image: [
      "https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/07/Computer/VY229HF-1.jpg",
      "https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/07/Computer/VY229HF-5.jpg",
    ],
  });

  return (
    <div className="flex gap-4 my-6">
      <div className="input-layout-left h-fit">
        <h1 className="text-xl">Product Image</h1>
        <div className="my-4 mb-1">
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper h-56"
          >
            {product.image.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt="Product"
                  className="w-full mb-4 h-56 object-contain border-gray-300"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="w-2/3 bg-white rounded-md border border-gray-300">
        <div className="px-6 p-4 text-xl">
          <h1>Product Details</h1>
        </div>
        <table className="w-full border-collapse">
          <tbody>
            <TableRow label="Name" value="Product 1" />
            <TableRow label="Slug" value="product-1" />
            <TableRow
              label="Description"
              value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              alignTop
            />
            <TableRow label="Category" value="Electronics" isHighlighted />
            <TableRow label="Price" value="299" />
            <TableRow label="Tax" value="7 %" isHighlighted />
            <TableRow label="Created At" value="23 Jan 2025" />
          </tbody>
        </table>
        <div className="flex justify-end gap-2 border-t rounded-br-md rounded-bl-md bg-gray-100 border-gray-300 p-2 py-4">
          <Link
            to={`/administrator/products/${slug}/edit`}
            className="edit-button flex items-center gap-2"
          >
            <FaRegEdit /> Edit
          </Link>
          <Link
            to="/administrator/products"
            className="cancel-button flex items-center gap-2"
          >
            <FaArrowLeftLong /> Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
