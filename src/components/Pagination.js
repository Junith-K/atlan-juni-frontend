// Pagination.js
import React from "react";

const Pagination = ({
    pageIndex,
    pageSize,
    pageSizeSelected,
    updatePageSize,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    previousPage,
    nextPage,
    darkMode
}) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <div className={`${darkMode ? "text-white" : "text-gray-900"}`}>
        <span className="mr-2">Rows per page:</span>
        <select  value={pageSizeSelected}   onChange={(e) => updatePageSize(e.target.value)}  className={`border p-1 rounded ${    darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"  }`}>
          {[25, 50, 100, "all"].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <button  onClick={() => gotoPage(0)}  disabled={!canPreviousPage}  className={`border p-2 rounded-l ${    darkMode      ? "bg-gray-600 hover:bg-gray-500 text-white"      : "bg-gray-200 hover:bg-gray-300 text-black"  }`}>
          {"<<"}
        </button>
        <button  onClick={() => previousPage()}  disabled={!canPreviousPage}  className={`border p-2 rounded-l ${    darkMode      ? "bg-gray-600 hover:bg-gray-500 text-white"      : "bg-gray-200 hover:bg-gray-300 text-black"  }`}>
          {"<"}
        </button>
        <span  className={`border-t border-b border-r px-4 py-2 ${    darkMode      ? "bg-gray-600 hover:bg-gray-500 text-white"      : "bg-gray-200 hover:bg-gray-300 text-black"  }`}>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button  onClick={() => nextPage()}  disabled={!canNextPage}  className={`border p-2 rounded-l ${    darkMode      ? "bg-gray-600 hover:bg-gray-500 text-white"      : "bg-gray-200 hover:bg-gray-300 text-black"  }`}>
          {">"}
        </button>
        <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage} className={`border p-2 rounded-l ${   darkMode     ? "bg-gray-600 hover:bg-gray-500 text-white"     : "bg-gray-200 hover:bg-gray-300 text-black" }`}>
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
