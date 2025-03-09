import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { formatDateTime } from "../../../utils/formatDateTime";
import { IMAGE_URL } from "../../../secret";
import { formatPrice } from "../../../utils/formatPrice";
import { findOne } from "../../../composables/administrator/UserService";

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
            (label === "Role" &&
              (value === "USER"
                ? `bg-sky-100 text-sky-600`
                : `bg-rose-100 text-rose-600`)) ||
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

const User = () => {
  const location = useLocation();
  const { slug } = useParams();
  const { id } = location?.state?.user;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await findOne(id);
      setUsers(data);
    };

    fetchProduct();
  }, []);

  return (
    <div className="flex gap-4 my-6">
      <div className="input-layout-left h-fit">
        <h1 className="text-xl">User Image</h1>
        <div className="my-4 mb-1">
          {users?.profile?.[0].image === null ||
          users?.profile?.[0].image === "" ? (
            <img
              src={`https://placehold.co/350x200`}
              alt="users"
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
              <SwiperSlide>
                <img
                  src={`${IMAGE_URL}/${users?.profile?.[0].image}`}
                  alt="Product"
                  className="w-full mb-8 h-56 object-contain border-gray-300"
                />
              </SwiperSlide>
            </Swiper>
          )}
        </div>
      </div>
      <div className="w-2/3 bg-white rounded-md border border-gray-300">
        <div className="px-6 p-4 text-xl">
          <h1>User Details</h1>
        </div>
        <table className="w-full border-collapse">
          <tbody>
            <TableRow
              label="Firstname"
              value={`${users?.profile?.[0]?.firstname}`}
            />
            <TableRow
              label="Lastname"
              value={`${users?.profile?.[0]?.lastname}`}
            />
            <TableRow label="Email" value={users?.email} />
            <TableRow
              label="Address"
              value={users?.profile?.[0]?.address}
              alignTop
            />
            <TableRow label="Role" value={users?.role} isHighlighted />
            <TableRow
              label="Phone"
              value={formatPrice(users?.profile?.[0]?.phone)}
            />
            <TableRow
              label="Created At"
              value={formatDateTime(users?.createdAt)}
            />
            <TableRow
              label="Update At"
              value={formatDateTime(users?.updatedAt)}
            />
          </tbody>
        </table>
        <div className="flex justify-end gap-2 border-t rounded-br-md rounded-bl-md bg-gray-100 border-gray-300 p-2 py-4">
          <Link
            to="/administrator/users"
            className="cancel-button flex items-center gap-2"
          >
            <FaArrowLeftLong /> Cancel
          </Link>
          <Link
            to={`/administrator/users/${slug}/edit`}
            state={{ users }}
            className="edit-button flex items-center gap-2"
          >
            <FaRegEdit /> Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
