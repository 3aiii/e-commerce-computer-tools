import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import Tables from "../../../components/administrator/Tables";

const index = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", category: "Electronics", price: 1200, stock: 10 },
    {
      id: 2,
      name: "Smartphone",
      category: "Electronics",
      price: 800,
      stock: 20,
    },
    {
      id: 3,
      name: "Headphones",
      category: "Accessories",
      price: 100,
      stock: 50,
    },
  ]);

  return (
    <div className="index-border-div">
      <div className="index-title-div">
        <div className="flex justify-between items-center">
          <h1 className="index-topic">Products</h1>
          <Link
            to={"/administrator/products/create"}
            className="flex items-center gap-2 create-button"
          >
            <LuPlus />
            <span>Add Product</span>
          </Link>
        </div>
      </div>
      <div className="table-div">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="table-th-no text-gray-500">NO.</th>
              <th className="table-th">NAME</th>
              <th className="table-th">CATEGORY</th>
              <th className="table-th text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id} className="border-b hover:bg-gray-100">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
