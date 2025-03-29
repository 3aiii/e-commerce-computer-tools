import React from "react";

const NoDataTable = ({ colSpan }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="p-4 text-center text-gray-500">
        <p className="text-xl font-semibold text-blue-500">
          No data are available right now.
        </p>
        <p className="text-sm text-gray-400">
          We apologize for the inconvenience. Please check back soon.
        </p>
      </td>
    </tr>
  );
};

export default NoDataTable;
