import React, { useState } from "react";

const DataTable = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  darkMode,
  highlightedColumn,
  setHighlightedColumn,
}) => {
  const toggleHighlight = (columnId) => {
    setHighlightedColumn(columnId === highlightedColumn ? null : columnId);
  };
  if (page.length === 0) {
    return null;
  }
  return (
    <div className="mt-4 overflow-x-auto">
      <table  {...getTableProps()}  className="min-w-full divide-y divide-gray-200">
        <thead  className={`${darkMode ? "bg-gray-700" : "bg-gray-100"    } border-b border-gray-300`}>
          <tr>
            <th className="px-4 py-2 text-left border-gray-500 border border-b-0">
              ID
            </th>{" "}
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, columnIndex) => (
                <th  {...column.getHeaderProps()}  onClick={() => toggleHighlight(column.id)}  className={`px-4 py-2 text-left border-gray-500 border-b-0 border cursor-pointer ${highlightedColumn === column.id      ? "bg-[#F7CAC9] text-black font-extrabold"      : ""    }`}>
                  {column.render("Header")}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody className={`${darkMode ? "bg-gray-800" : "bg-white"}`}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <td className="border px-4 border-gray-500 py-2">
                  {rowIndex + 1}
                </td>
                {row.cells.map((cell) => (
                  <td  {...cell.getCellProps()}  className={`border border-gray-500 px-4 py-2 ${highlightedColumn === cell.column.id      ? "bg-[#F7CAC9] text-black font-extrabold"      : ""    }`}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
