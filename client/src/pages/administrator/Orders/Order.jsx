import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { formatDateTime } from "../../../utils/formatDateTime";
import { IMAGE_URL } from "../../../secret";
import { formatPrice } from "../../../utils/formatPrice";
import { findOne } from "../../../composables/administrator/OrderService";

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
          className={` p-[2px] px-2 rounded-md ${
            (label === "Invoice No." && `bg-blue-100 text-blue-600`) ||
            (label === "Total" && `bg-teal-100 text-teal-600`) ||
            (label === "Discount" && `bg-red-100 text-red-600`) ||
            (value === "Pending"
              ? "bg-orange-100 text-orange-600"
              : value === "Processing"
              ? "bg-blue-100 text-blue-600"
              : value === "Shipped"
              ? "bg-yellow-100 text-yellow-600"
              : value === "Delivered"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600")
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

const Order = () => {
  const location = useLocation();
  const { slug } = useParams();
  const { id } = location?.state?.order;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await findOne(id);
      setOrders(data);
    };

    fetchProduct();
  }, []);
  
  return (
    <div className="flex gap-4 my-6">
      <div className="input-layout-left h-fit">
        <h1 className="text-xl">Order Image</h1>
        <div className="my-4 mb-1">
          {orders?.OrderImage?.url === null ||
          orders?.OrderImage?.length === 0 ? (
            <img
              src={`https://placehold.co/350x200`}
              alt="orders"
              className="w-full h-56 object-contain border-gray-300"
            />
          ) : (
            <img
              src={`${IMAGE_URL}/${orders?.OrderImage?.[0]?.url}`}
              alt="Product"
              className="w-full mb-8 h-90 object-contain rounded-lg border-gray-300"
            />
          )}
        </div>
      </div>
      <div className="w-2/3 bg-white rounded-md border border-gray-300">
        <div className="px-6 p-4 text-xl">
          <h1>Order Details</h1>
        </div>
        <table className="w-full border-collapse">
          <tbody>
            <TableRow
              label="Invoice No."
              value={`${orders?.invoiceNo}`}
              isHighlighted
            />
            <TableRow
              label="Code"
              value={`${orders?.discount ? orders?.discount?.code : `-`}`}
            />
            <TableRow
              label="Discount"
              isHighlighted
              value={`${orders?.discount ? orders?.discount?.discount : `-`} %`}
            />
            <TableRow
              label="Total"
              value={`${formatPrice(orders?.total)} `}
              isHighlighted
            />
            <TableRow
              label="Firstname"
              value={`${orders?.user?.profile?.[0]?.firstname}`}
            />
            <TableRow
              label="Lastname"
              value={`${orders?.user?.profile?.[0]?.lastname}`}
            />
            <TableRow label="Email" value={orders?.user?.email} />
            <TableRow
              label="Address"
              value={orders?.user?.profile?.[0]?.address}
              alignTop
            />
            <TableRow
              label="Phone"
              value={formatPrice(orders?.user?.profile?.[0]?.phone)}
            />
            <TableRow
              label="Status"
              value={formatPrice(orders?.status)}
              isHighlighted
            />
            <TableRow
              label="Ordered At"
              value={formatDateTime(orders?.createdAt)}
            />
            {orders?.OrderDetails && orders?.OrderDetails.length > 0 && (
              <>
                <tr>
                  <td colSpan="2" className="border-t px-6 py-2 text-xl">
                    Order Items
                  </td>
                </tr>
                {orders?.OrderDetails?.map((detail, index) => (
                  <tr key={index} className="w-full border-t">
                    <td className="text-left w-1/2 border-r px-6 py-2 font-light break-words">
                      {detail?.product?.name}{" "}
                      <span className="font-medium p-[2px] px-2 rounded-md text-violet-600 bg-violet-100">
                        (x{detail.quantity})
                      </span>
                    </td>
                    <td className="w-1/2 px-4 py-2 font-light break-all break-words">
                      {formatPrice(detail?.subtotal)}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        <div className="flex justify-end gap-2 border-t rounded-br-md rounded-bl-md bg-gray-100 border-gray-300 p-2 py-4">
          <Link
            to="/administrator/orders"
            className="cancel-button flex items-center gap-2"
          >
            <FaArrowLeftLong /> Cancel
          </Link>
          <Link
            to={`/administrator/orders/${slug}/edit`}
            state={{ orders }}
            className="edit-button flex items-center gap-2"
          >
            <FaRegEdit /> Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Order;
