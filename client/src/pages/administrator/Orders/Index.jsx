import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import NoDataTable from "../../../components/administrator/NoDataTable";
import Pagination from "../../../components/administrator/Pagination";
import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";
import { formatPrice } from "../../../utils/formatPrice";
import { findAll } from "../../../composables/administrator/OrderService";
import { formatDateTime } from "./../../../utils/formatDateTime";
import { FiPrinter } from "react-icons/fi";

const Index = () => {
  const [order, setOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [activeOrderStatus, setActiveOrderStatus] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const fetchs = async () => {
    const { data } = await findAll(
      currentPage,
      itemsPerPage,
      searchTerm,
      activeOrderStatus
    );
    setOrder(data);
  };

  const handlePrinter = async (product) => {
    return;
  };

  useEffect(() => {
    fetchs();
  }, [currentPage, searchTerm, itemsPerPage, activeOrderStatus]);

  return (
    <div className="index-border-div">
      <div className="index-title-div">
        <div className="flex justify-between items-center">
          <h1 className="flex gap-2 items-center index-topic">
            <AiOutlineShoppingCart />
            Orders
          </h1>
        </div>
      </div>
      {/* Dropdown และ Search */}
      <div className="flex justify-between items-center my-2 w-full p-4 py-2">
        <label className="flex items-center space-x-2 text-gray-600 font-light">
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <span>entries</span>
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center space-x-2 h-full text-gray-600 font-light">
            <select
              value={activeOrderStatus}
              onChange={(e) => {
                setActiveOrderStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </label>
          <input
            type="text"
            placeholder="🔍 Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input font-light px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {/* ตารางแสดงสินค้า */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md">
          <thead>
            <tr>
              <th className="table-th w-16">NO</th>
              <th className="table-th">INVOICE NO.</th>
              <th className="table-th">FIRSTNAME - LASTNAME</th>
              <th className="table-th">CREATED AT</th>
              <th className="table-th w-36">TOTAL PRICE</th>
              <th className="table-th w-36">STATUS</th>
              <th className="table-th w-48 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {order?.data?.length > 0 ? (
              order?.data?.map((order, index) => (
                <tr key={order.id} className="border-b hover:bg-gray-100">
                  <td className="tbody-td text-center">
                    {startIndex + index + 1}
                  </td>
                  <td className="tbody-td text-center">
                    <span
                      className={`p-[2px] px-2 rounded-md bg-blue-100 text-blue-600 
                        font-normal cursor-default`}
                    >
                      {order.invoiceNo}
                    </span>
                  </td>
                  <td className="tbody-td">
                    {order.user.profile?.[0]?.firstname}{" "}
                    {order.user.profile?.[0]?.lastname}
                  </td>
                  <td className="tbody-td text-center">
                    {formatDateTime(order.createdAt)}
                  </td>
                  <td className="tbody-td text-center">
                    {formatPrice(order.total)}
                  </td>
                  <td className="tbody-td text-center">
                    <div
                      className={`flex justify-center items-center p-[2px] px-2 gap-1
                        rounded-md font-normal cursor-default w-fit mx-auto
                        ${
                          order.status === "Pending"
                            ? "bg-orange-100 text-orange-600"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-600"
                            : order.status === "Shipped"
                            ? "bg-yellow-100 text-yellow-600"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      <GoDotFill size={20} />
                      {order.status}
                    </div>
                  </td>

                  <td className="p-4 flex  justify-center gap-2">
                    <Link
                      to={`/administrator/orders/${order.invoiceNo}`}
                      state={{ order }}
                      className="view-button"
                    >
                      <AiOutlineEye size={20} />
                    </Link>
                    <button className="print-button">
                      <FiPrinter size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <NoDataTable />
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mb-4">
        <Pagination
          totalPages={order?.pagination?.totalPages}
          currentPage={order?.pagination?.currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Index;
