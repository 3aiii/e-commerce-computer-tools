import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      {/* ปุ่ม Previous */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center border rounded-lg bg-white hover:bg-gray-200 disabled:opacity-50"
      >
        {"<"}
      </button>

      {/* ตัวเลขหน้า */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => setCurrentPage(num)}
          className={`w-10 h-10 flex items-center justify-center border rounded-lg ${
            currentPage === num
              ? "bg-blue-500 text-white transition"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          {num}
        </button>
      ))}

      {/* ปุ่ม Next */}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center border rounded-lg bg-white hover:bg-gray-200 disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
