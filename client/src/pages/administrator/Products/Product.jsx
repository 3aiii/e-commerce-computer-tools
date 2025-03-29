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
import { FaStar, FaUser } from "react-icons/fa";

const TableRow = ({ label, value, isHighlighted, alignTop }) => (
  <tr className="w-full">
    <td
      className={`text-left w-1/2 border-t border-r px-6 py-2 font-light break-words ${
        alignTop ? "align-top" : ""
      }`}
    >
      {label}
    </td>

    <td className={`w-1/2 border-t px-4 py-2 font-light break-all break-words`}>
      {isHighlighted ? (
        <span
          className={` p-[2px] px-2 rounded-md break-words ${
            (label === "Category" && `bg-blue-100 text-blue-600`) ||
            (label === "Tax" && `bg-red-100 text-red-600`)
          } font-normal`}
        >
          {value}
        </span>
      ) : (
        <>
          <span className="flex items-center gap-2">
            {label === "Total Rating" ? (
              <FaStar className="text-yellow-400" size={20} />
            ) : null}
            {label === "Review Count" ? (
              <FaUser className="text-gray-400" size={20} />
            ) : null}
            {value}
          </span>
        </>
      )}
    </td>
  </tr>
);

const Product = () => {
  const location = useLocation();
  const { slug } = useParams();
  const { id } = location?.state?.product;
  const [product, setProduct] = useState([]);

  const avgRating = product?.ratings?.[0]?._avg?.totalRating || 0;
  const reviewCount = product?.ratings?.[0]?._count?.productId || 0;

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
              {product?.data?.ProductImage?.map((img, index) => (
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
            <TableRow label="Name" value={product?.data?.name} />
            <TableRow label="Slug" value={product?.data?.slug} />
            <TableRow
              label="Description"
              value={product?.data?.description}
              alignTop
            />
            <TableRow
              label="Category"
              value={product?.data?.category?.name}
              isHighlighted
            />
            <TableRow label="Price" value={formatPrice(product?.data?.price)} />
            <TableRow
              label="Tax"
              value={product?.data?.tax + " " + `%`}
              isHighlighted
            />
            <TableRow label="Total Rating" value={avgRating} />
            <TableRow label="Review Count" value={reviewCount} />
            <TableRow
              label="Created At"
              value={formatDateTime(product?.data?.createdAt)}
            />
            <TableRow
              label="Update At"
              value={formatDateTime(product?.data?.updatedAt)}
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
            state={{ product: product?.data }}
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
