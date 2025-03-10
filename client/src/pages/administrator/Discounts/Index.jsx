import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import NoDataTable from "../../../components/administrator/NoDataTable";
import Pagination from "../../../components/administrator/Pagination";
import DeleteModal from "../../../components/administrator/Modal/DeleteModal";

import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";
import { GrRevert } from "react-icons/gr";
import { formatDateTime } from "./../../../utils/formatDateTime";
import { MdOutlineDiscount } from "react-icons/md";
import { showErrorToast } from "../../../components/ToastNotification";
import { Link } from "react-router-dom";
import {
  findAll,
  remove,
} from "../../../composables/administrator/DiscountService";

const Index = () => {
  const [discount, setDiscount] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const fetchs = async () => {
    const { data } = await findAll(currentPage, itemsPerPage, searchTerm);
    setDiscount(data);
  };

  const handleDelete = async (discount) => {
    const response = await remove(discount?.id);

    if (response?.status === 200) {
      toast.success(
        `${response?.data?.status ? `คืนกลับ` : `ลบ`}หมวดหมู่เสร็จสิ้น!`,
        {
          position: "bottom-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            fetchs();
          },
        }
      );
    }
  };

  useEffect(() => {
    fetchs();
  }, [currentPage, itemsPerPage, searchTerm]);

  return (
    <div className="index-border-div">
      <div className="index-title-div">
        <div className="flex justify-between items-center">
          <h1 className="flex gap-2 items-center index-topic">
            <MdOutlineDiscount />
            Discount
          </h1>
          <Link
            to="/administrator/discount/create"
            className="flex items-center gap-2 create-button"
          >
            <LuPlus />
            <span>Add Discount</span>
          </Link>
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
        <div>
          <input
            type="text"
            placeholder="🔍 Search..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="font-light px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {/* ตารางแสดงสินค้า */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md">
          <thead>
            <tr>
              <th className="table-th w-16">NO</th>
              <th className="table-th">CODE</th>
              <th className="table-th">DISCOUND (%)</th>
              <th className="table-th">CREATED AT</th>
              <th className="table-th">UPDATED AT</th>
              <th className="table-th w-36">STATUS</th>
              <th className="table-th w-48 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {discount?.data?.length > 0 ? (
              discount?.data?.map((discount, index) => (
                <tr key={discount.id} className="border-b hover:bg-gray-100">
                  <td className="tbody-td text-center">
                    {startIndex + index + 1}
                  </td>
                  <td className="tbody-td text-center">
                    <span
                      className={`p-[2px] px-2 rounded-md bg-blue-100 text-blue-600 
                        font-normal cursor-default`}
                    >
                      {discount.code}
                    </span>
                  </td>
                  <td className="tbody-td text-center">
                    <span
                      className={`p-[2px] px-2 rounded-md bg-red-100 text-red-600 
                        font-normal cursor-default`}
                    >
                      {discount.discount}%
                    </span>
                  </td>
                  <td className="tbody-td text-center">
                    {formatDateTime(discount.createdAt)}
                  </td>
                  <td className="tbody-td text-center">
                    {formatDateTime(discount.updatedAt)}
                  </td>
                  <td className="tbody-td text-center">
                    <div
                      className={`flex justify-center items-center p-[2px] px-2 gap-1
                              rounded-md font-normal cursor-default w-fit mx-auto
                              ${
                                discount.status
                                  ? `bg-green-100 text-green-600`
                                  : `bg-orange-100 text-orange-600`
                              }
                            `}
                    >
                      <GoDotFill size={20} />
                      {discount.status ? `ACTIVE` : `DELETED`}
                    </div>
                  </td>

                  <td className="p-4 flex  justify-center gap-2">
                    <Link
                      to={`/administrator/discount/${discount.code}/edit`}
                      state={{ discount }}
                      className="edit-button"
                    >
                      <AiOutlineEdit size={20} />
                    </Link>

                    {discount?.status ? (
                      <DeleteModal
                        onConfirm={() => handleDelete(discount)}
                        product={discount}
                      />
                    ) : (
                      <button
                        onClick={() => handleDelete(discount)}
                        className="revert-button"
                      >
                        <GrRevert size={20} />
                      </button>
                    )}
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
          totalPages={discount?.pagination?.totalPages}
          currentPage={discount?.pagination?.currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Index;
