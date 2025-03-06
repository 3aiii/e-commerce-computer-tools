import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import NoDataTable from "../../../components/administrator/NoDataTable";
import { FiBox } from "react-icons/fi";
import Pagination from "../../../components/administrator/Pagination";

const Index = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      slug: "product-1",
      category: "Electronics",
      price: "$100.00",
      createdAt: "2025-03-01",
    },
    {
      id: 2,
      name: "Product 2",
      slug: "product-2",
      category: "Clothing",
      price: "$50.00",
      createdAt: "2025-02-20",
    },
    {
      id: 3,
      name: "Product 3",
      slug: "product-3",
      category: "Accessories",
      price: "$25.00",
      createdAt: "2025-03-05",
    },
    {
      id: 4,
      name: "Product 4",
      slug: "product-4",
      category: "Home Appliances",
      price: "$200.00",
      createdAt: "2025-01-30",
    },
    {
      id: 5,
      name: "Product 5",
      slug: "product-5",
      category: "Books",
      price: "$15.00",
      createdAt: "2025-02-10",
    },
    {
      id: 6,
      name: "Product 6",
      slug: "product-6",
      category: "Toys",
      price: "$30.00",
      createdAt: "2025-03-02",
    },
    {
      id: 7,
      name: "Product 7",
      slug: "product-7",
      category: "Sports",
      price: "$80.00",
      createdAt: "2025-02-25",
    },
    {
      id: 8,
      name: "Product 8",
      slug: "product-8",
      category: "Beauty",
      price: "$20.00",
      createdAt: "2025-03-01",
    },
    {
      id: 9,
      name: "Product 9",
      slug: "product-9",
      category: "Furniture",
      price: "$150.00",
      createdAt: "2025-02-15",
    },
    {
      id: 10,
      name: "Product 10",
      slug: "product-10",
      category: "Gaming",
      price: "$300.00",
      createdAt: "2025-01-20",
    },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // คำนวณหน้าที่แสดง
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  // จำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(products.length / itemsPerPage);

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
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span>entries</span>
        </label>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="search-input font-light px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {/* ตารางแสดงสินค้า */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md">
          <thead>
            <tr>
              <th className="table-th w-16">NO.</th>
              <th className="table-th">NAME</th>
              <th className="table-th">CATEGORY</th>
              <th className="table-th">PRICE</th>
              <th className="table-th">CREATED AT</th>
              <th className="table-th text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product, index) => (
                <tr key={product.id} className="border-b hover:bg-gray-100">
                  <td className="tbody-td text-center">
                    {startIndex + index + 1}
                  </td>
                  <td className="tbody-td">{product.name}</td>
                  <td className="tbody-td text-center">{product.category}</td>
                  <td className="tbody-td text-center">{product.price}</td>
                  <td className="tbody-td text-center">{product.createdAt}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <Link
                      to={`/administrator/products/${product.slug}`}
                      className="view-button"
                    >
                      <AiOutlineEye size={20} />
                    </Link>
                    <Link
                      to={`/administrator/products/${product.slug}/edit`}
                      className="edit-button"
                    >
                      <AiOutlineEdit size={20} />
                    </Link>
                    <button className="delete-button">
                      <AiOutlineDelete size={20} />
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
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />{" "}
      </div>
    </div>
  );
};

export default Index;
