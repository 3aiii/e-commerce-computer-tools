import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { findOne } from "../../../composables/administrator/ProductService";
import { formatDateTime } from "../../../utils/formatDateTime";
import { IMAGE_URL } from "../../../secret";
import { formatPrice } from "../../../utils/formatPrice";

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
  const location = useLocation();
  const { slug } = useParams();
  const { id } = location?.state?.product;
  const [product, setProduct] = useState([]);
  
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await findOne(id);
      setProduct(data);
    };

    fetchProduct();
  }, []);

  return (
    <div className="flex gap-4 my-6">
      <div className="input-layout-left h-fit">
        <h1 className="text-xl">Product Image</h1>
        <div className="my-4 mb-1">
          {product?.ProductImage?.length === 0 ? (
            <img
              src={`https://placehold.co/350x200`}
              alt="Product"
              className="w-full h-56 object-contain border-gray-300"
            />
          ) : (
            <Swiper
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {product?.ProductImage?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${IMAGE_URL}/${img?.url}`}
                    alt="Product"
                    className="w-full mb-8 h-56 object-contain border-gray-300"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
      <div className="w-2/3 bg-white rounded-md border border-gray-300">
        <div className="px-6 p-4 text-xl">
          <h1>Product Details</h1>
        </div>
        <table className="w-full border-collapse">
          <tbody>
            <TableRow label="Name" value={product?.name} />
            <TableRow label="Slug" value={product?.slug} />
            <TableRow
              label="Description"
              value={product?.description}
              alignTop
            />
            <TableRow
              label="Category"
              value={product?.category?.name}
              isHighlighted
            />
            <TableRow label="Price" value={formatPrice(product?.price)} />
            <TableRow
              label="Tax"
              value={product?.tax + " " + `%`}
              isHighlighted
            />
            <TableRow
              label="Created At"
              value={formatDateTime(product?.createdAt)}
            />
            <TableRow
              label="Update At"
              value={formatDateTime(product?.updatedAt)}
            />
          </tbody>
        </table>
        <div className="flex justify-end gap-2 border-t rounded-br-md rounded-bl-md bg-gray-100 border-gray-300 p-2 py-4">
          <Link
            to="/administrator/products"
            className="cancel-button flex items-center gap-2"
          >
            <FaArrowLeftLong /> Cancel
          </Link>
          <Link
            to={`/administrator/products/${slug}/edit`}
            state={{ product }}
            className="edit-button flex items-center gap-2"
          >
            <FaRegEdit /> Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
