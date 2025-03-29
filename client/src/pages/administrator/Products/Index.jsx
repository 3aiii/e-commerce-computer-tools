import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import NoDataTable from "../../../components/administrator/NoDataTable";
import { FiBox } from "react-icons/fi";
import Pagination from "../../../components/administrator/Pagination";
import DeleteModal from "../../../components/administrator/Modal/DeleteModal";
import {
  findAll,
  remove,
} from "../../../composables/administrator/ProductService";
import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";
import { GrRevert } from "react-icons/gr";
import { formatPrice } from "../../../utils/formatPrice";

const Index = () => {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const fetchs = async () => {
    const { data } = await findAll(currentPage, itemsPerPage, searchTerm);
    setProduct(data);
  };

  const handleDelete = async (product) => {
    const response = await remove(product?.id);

    if (response?.status === 200) {
      toast.success(
        `${response?.data?.status ? `คืนกลับ` : `ลบ`}สินค้าเสร็จสิ้น!`,
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
            <FiBox />
            Products
          </h1>
          <Link
            to="/administrator/products/create"
            className="flex items-center gap-2 create-button"
          >
            <LuPlus />
            <span>Add Product</span>
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
              <th className="table-th">NAME</th>
              <th className="table-th">CATEGORY</th>
              <th className="table-th">PRICE</th>
              <th className="table-th w-36">STATUS</th>
              <th className="table-th w-48 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {product?.data?.length > 0 ? (
              product?.data?.map((product, index) => (
                <tr key={product.id} className="border-b hover:bg-gray-100">
                  <td className="tbody-td text-center">
                    {startIndex + index + 1}
                  </td>
                  <td className="tbody-td">{product.name}</td>
                  <td className="tbody-td text-center">
                    <span
                      className={`p-[2px] px-2 rounded-md bg-blue-100 text-blue-600 
                        font-normal cursor-default`}
                    >
                      {product.category.name}
                    </span>
                  </td>
                  <td className="tbody-td text-center">
                    {formatPrice(product.price)}
                  </td>
                  <td className="tbody-td text-center">
                    <div
                      className={`flex justify-center items-center p-[2px] px-2 gap-1
                        rounded-md font-normal cursor-default w-fit mx-auto
                        ${
                          product.status
                            ? `bg-green-100 text-green-600`
                            : `bg-orange-100 text-orange-600`
                        }
                      `}
                    >
                      <GoDotFill size={20} />
                      {product.status ? `ACTIVE` : `DELETED`}
                    </div>
                  </td>
                  <td className="p-4 flex  justify-center gap-2">
                    <Link
                      to={`/administrator/products/${product.slug}`}
                      state={{ product }}
                      className="view-button"
                    >
                      <AiOutlineEye size={20} />
                    </Link>
                    <Link
                      to={`/administrator/products/${product.slug}/edit`}
                      state={{ product }}
                      className="edit-button"
                    >
                      <AiOutlineEdit size={20} />
                    </Link>

                    {product?.status ? (
                      <DeleteModal
                        onConfirm={() => handleDelete(product)}
                        product={product}
                      />
                    ) : (
                      <button
                        onClick={() => handleDelete(product)}
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
          totalPages={product?.pagination?.totalPages}
          currentPage={product?.pagination?.currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Index;
