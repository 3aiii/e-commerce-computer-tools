import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import NoDataTable from "../../../components/administrator/NoDataTable";
import Pagination from "../../../components/administrator/Pagination";
import DeleteModal from "../../../components/administrator/Modal/DeleteModal";
import {
  create,
  findAll,
  findOne,
  remove,
  update,
} from "../../../composables/administrator/CategoryService";
import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";
import { GrRevert } from "react-icons/gr";
import { formatDateTime } from "./../../../utils/formatDateTime";
import { MdOutlineCategory } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { showErrorToast } from "../../../components/ToastNotification";

const Index = () => {
  const [categoryInsertData, setCategoryInsertData] = useState({
    id: "",
    name: "",
  });
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [edit, setEdit] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const fetchs = async () => {
    const { data } = await findAll(currentPage, itemsPerPage, searchTerm);
    setCategory(data);
  };

  const fetch = async (id) => {
    const { data } = await findOne(id);
    setCategoryInsertData({ id, name: data?.name });
  };

  const handleUpdate = async () => {
    try {
      const response = await update(categoryInsertData?.id, categoryInsertData);

      if (response?.status === 200) {
        toast.success(`แก้ไขสินค้าเสร็จสิ้น!`, {
          position: "bottom-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            setCategoryInsertData({ name: "" });
            setEdit(false);
            fetchs();
          },
        });
      }
    } catch (error) {
      if (error.response.data.message) {
        showErrorToast(`โปรดพิมพ์ชื่อประเภทหมวดหมู่`);
      } else {
        showErrorToast(error);
      }
    }
  };

  const handleCreate = async () => {
    try {
      const response = await create(categoryInsertData?.name);
      if (response?.status === 201) {
        toast.success(`เพิ่มสินค้าเสร็จสิ้น!`, {
          position: "bottom-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            setCategoryInsertData({ name: "" });
            fetchs();
          },
        });
      }
    } catch (error) {
      if (error.response.data.message) {
        showErrorToast(`โปรดพิมพ์ชื่อประเภทหมวดหมู่`);
      } else {
        showErrorToast(error);
      }
    }
  };

  const handleDelete = async (category) => {
    const response = await remove(category?.id);

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
            <MdOutlineCategory />
            Categories
          </h1>
          <div className="flex gap-2">
            <input
              value={categoryInsertData?.name}
              type="text"
              onChange={(e) =>
                setCategoryInsertData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="font-light px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {edit ? (
              <>
                <button
                  className={`flex items-center gap-2 bg-yellow-500 rounded-md focus:outline-none
                    text-white px-3 cursor-pointer hover:bg-yellow-600 transition`}
                  onClick={() => handleUpdate()}
                >
                  <AiOutlineEdit />
                  <span>Edit</span>
                </button>
                <button
                  className={`flex items-center gap-2 bg-gray-400 rounded-md focus:outline-none
                    text-white px-3 cursor-pointer hover:bg-gray-500 transition`}
                  onClick={() => {
                    setEdit(false);
                    setCategoryInsertData({ name: "" });
                  }}
                >
                  <FaArrowLeftLong />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                className={`flex items-center gap-2 bg-green-500 rounded-md focus:outline-none
                    text-white px-3 cursor-pointer hover:bg-green-600 transition`}
                onClick={() => handleCreate()}
              >
                <LuPlus />
                <span>Add Category</span>
              </button>
            )}
          </div>
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
            className="font-light px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      {/* ตารางแสดงสินค้า */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md">
          <thead>
            <tr>
              <th className="table-th w-16">NO</th>
              <th className="table-th">NAME</th>
              <th className="table-th">CREATED AT</th>
              <th className="table-th">UPDATED AT</th>
              <th className="table-th w-36">STATUS</th>
              <th className="table-th w-48 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {category?.data?.length > 0 ? (
              category?.data?.map((category, index) => (
                <tr key={category.id} className="border-b hover:bg-gray-100">
                  <td className="tbody-td text-center">
                    {startIndex + index + 1}
                  </td>
                  <td className="tbody-td text-center">
                    <span
                      className={`p-[2px] px-2 rounded-md bg-blue-100 text-blue-600 
                        font-normal cursor-default`}
                    >
                      {category.name}
                    </span>
                  </td>
                  <td className="tbody-td text-center">
                    {formatDateTime(category.createdAt)}
                  </td>
                  <td className="tbody-td text-center">
                    {formatDateTime(category.updatedAt)}
                  </td>
                  <td className="tbody-td text-center">
                    <div
                      className={`flex justify-center items-center p-[2px] px-2 gap-1
                              rounded-md font-normal cursor-default w-fit mx-auto
                              ${
                                category.status
                                  ? `bg-green-100 text-green-600`
                                  : `bg-orange-100 text-orange-600`
                              }
                            `}
                    >
                      <GoDotFill size={20} />
                      {category.status ? `ACTIVE` : `DELETED`}
                    </div>
                  </td>

                  <td className="p-4 flex  justify-center gap-2">
                    <button
                      onClick={() => {
                        fetch(category?.id);
                        setEdit(true);
                      }}
                      className="edit-button"
                    >
                      <AiOutlineEdit size={20} />
                    </button>

                    {category?.status ? (
                      <DeleteModal
                        onConfirm={() => handleDelete(category)}
                        product={category}
                      />
                    ) : (
                      <button
                        onClick={() => handleDelete(category)}
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
          totalPages={category?.pagination?.totalPages}
          currentPage={category?.pagination?.currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Index;
