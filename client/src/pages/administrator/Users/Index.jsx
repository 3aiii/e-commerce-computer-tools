import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import NoDataTable from "../../../components/administrator/NoDataTable";
import { FiUsers } from "react-icons/fi";
import Pagination from "../../../components/administrator/Pagination";
import DeleteModal from "../../../components/administrator/Modal/DeleteModal";
import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";
import { GrRevert } from "react-icons/gr";
import {
  findAll,
  remove,
} from "../../../composables/administrator/UserService";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const fetchs = async () => {
    const { data } = await findAll(currentPage, itemsPerPage, searchTerm);
    setUsers(data);
  };

  const handleDelete = async (user) => {
    const response = await remove(user?.id);

    if (response?.status === 200) {
      toast.success(
        `${response?.data?.status ? `คืนกลับ` : `ลบ`}ผู้ใช้งานเสร็จสิ้น!`,
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
  }, [currentPage, searchTerm, itemsPerPage]);

  return (
    <div className="index-border-div">
      <div className="index-title-div">
        <div className="flex justify-between items-center">
          <h1 className="flex gap-2 items-center index-topic">
            <FiUsers />
            Users
          </h1>
          <Link
            to="/administrator/users/create"
            className="flex items-center gap-2 create-button"
          >
            <LuPlus />
            <span>Add User</span>
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
        <div className="flex items-center text-gray-600 font-light gap-2">
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
              <th className="table-th w-24">ROLE</th>
              <th className="table-th">NAME</th>
              <th className="table-th">EMAIL</th>
              <th className="table-th w-36">STATUS</th>
              <th className="table-th w-48 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.length > 0 ? (
              users?.data?.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="tbody-td text-center">
                    {startIndex + index + 1}
                  </td>
                  <td className="tbody-td text-center">
                    <div
                      className={`flex justify-center items-center p-[2px] px-2 gap-1
                        rounded-md font-normal cursor-default w-fit mx-auto
                        ${
                          user.role !== "ADMIN"
                            ? `bg-sky-100 text-sky-600`
                            : `bg-rose-100 text-rose-600`
                        }
                      `}
                    >
                      {user.role}
                    </div>
                  </td>
                  <td className="tbody-td text-left">
                    {user.profile?.[0]?.firstname} {user.profile?.[0]?.lastname}
                  </td>
                  <td className="tbody-td text-left">{user.email}</td>
                  <td className="tbody-td text-center">
                    <div
                      className={`flex justify-center items-center p-[2px] px-2 gap-1
                        rounded-md font-normal cursor-default w-fit mx-auto
                        ${
                          user.status
                            ? `bg-green-100 text-green-600`
                            : `bg-orange-100 text-orange-600`
                        }
                      `}
                    >
                      <GoDotFill size={20} />
                      {user.status ? `ACTIVE` : `DELETED`}
                    </div>
                  </td>
                  <td className="p-4 flex  justify-center gap-2">
                    <Link
                      to={`/administrator/users/${user.profile?.[0]?.firstname}`}
                      state={{ user }}
                      className="view-button"
                    >
                      <AiOutlineEye size={20} />
                    </Link>
                    <Link
                      to={`/administrator/users/${user.profile?.[0]?.firstname}/edit`}
                      state={{ user }}
                      className="edit-button"
                    >
                      <AiOutlineEdit size={20} />
                    </Link>

                    {user?.status ? (
                      <DeleteModal
                        onConfirm={() => handleDelete(user)}
                        product={user}
                      />
                    ) : (
                      <button
                        onClick={() => handleDelete(user)}
                        className="revert-button"
                      >
                        <GrRevert size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <NoDataTable colSpan={6}/>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mb-4">
        <Pagination
          totalPages={users?.pagination?.totalPages}
          currentPage={users?.pagination?.currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Index;
