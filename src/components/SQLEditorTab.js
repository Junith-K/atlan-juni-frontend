// SQLEditorTab.js
import React, { useState, useEffect } from "react";
import SQLEditor from "./SQLEditor";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import { useTable, usePagination } from "react-table";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { utils, write } from "xlsx";
import { big, employee_territories, products, suppliers, territories } from "../utils/schema";

const SQLEditorTab = ({
  tabState,
  updateTabState,
  darkMode,
  addQueryToHistory,
  onSaveQuery,
  updateTabState1,
  updateTabState2
}) => {
  const { query, tableData, queryExecutionTime } = tabState;
  const { showSchema = false } = tabState;
  const [pageSizeSelected, setPageSizeSelected] = useState(25);
  const queries = {
    table0: "SELECT * FROM big;",
    table1: "SELECT * FROM table1;",
    table2: "SELECT * FROM table2;",
    table3: "SELECT * FROM table3;",
  };
  const predefinedSchema = query[query.length-2]=="g"?big:query[query.length-2]=="1"?products:query[query.length-2]=="2"?suppliers:query[query.length-2]=="3"?territories:employee_territories;
  const handleQueryChange = (newQuery) => {
    updateTabState({ query: newQuery });
  };

  const toggleSchemaView = () => {
    updateTabState({ ...tabState, showSchema: !showSchema });
  };

  const readCsv = async (fileName) => {
    const response = await fetch(fileName);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csv = decoder.decode(result.value);
    return csv;
  };

  const handleColumnHighlight = (columnId) => {
    updateTabState({
      ...tabState,
      highlightedColumn:
        columnId === tabState.highlightedColumn ? null : columnId,
    });
  };

  const parseCsv = (csv) => {
    Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      beforeFirstChunk: ()=>{
        updateTabState({tableData: []});
      },
      chunkSize: 1024*10,
      chunk: (results, parser) => {
        let resultData = results.data.filter((row) => Object.values(row).some((val) => val !== null && val !== ""))
        updateTabState1(resultData);
      },
      complete: () => {
        console.log("All chunks processed");
      },
      error: (error) => {
        console.error("Error while parsing:", error);
      }
    });
  };
  
  const updatePageSize = (value) => {
    setPageSizeSelected(value);
    const newSize = value === "all" ? tableData.length : Number(value);
    setPageSize(newSize);
  };

  const executeQuery = async () => {
    const startTime = performance.now();
    let csvFile;
    if (query === queries.table1) {
      csvFile = "/products.csv";
    } else if (query === queries.table2) {
      csvFile = "/suppliers.csv";
    } else if (query === queries.table3) {
      csvFile = "/territories.csv";
    } else if(query=== queries.table0){
      csvFile = "/big.csv";
    }else{
      csvFile = "/employee_territories.csv"
    }
  
    const csvData = await readCsv(csvFile);
    parseCsv(csvData);
  
    const queryExecutionTime = ((performance.now() - startTime) / 1000).toFixed(2);
    updateTabState2({
      queryExecutionTime: queryExecutionTime
    });
    addQueryToHistory(tabState.query);
  };
  


  const columns = React.useMemo(
    () =>
      tableData.length > 0
        ? Object.keys(tableData[0]).map((key) => ({
            Header: key,
            accessor: key,
          }))
        : [],
    [tableData]
  );

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 25 },
    },
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = tableInstance;

  const fileType = {
    csv: "text/csv;charset=utf-8;",
    excel:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    json: "application/json;charset=utf-8;",
  };

  const fileExtension = {
    csv: ".csv",
    excel: ".xlsx",
    json: ".json",
  };

  const exportToCSV = () => {
    const csvString = Papa.unparse(tableData);
    const blob = new Blob([csvString], { type: fileType.csv });
    saveAs(blob, "data_export" + fileExtension.csv);
  };

  const exportToExcel = () => {
    const ws = utils.json_to_sheet(tableData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: fileType.excel });
    saveAs(blob, "data_export" + fileExtension.excel);
  };

  const exportToJSON = () => {
    const jsonString = JSON.stringify(tableData);
    const blob = new Blob([jsonString], { type: fileType.json });
    saveAs(blob, "data_export" + fileExtension.json);
  };

  return (
    <div className="p-2">
      <SQLEditor  value={query}  onChange={handleQueryChange}  onExecuteQuery={executeQuery}  onSaveQuery={onSaveQuery}/>
      {tableData.length > 0 && (
        <>
          <div className="flex justify-between mt-2">
            {queryExecutionTime && (
              <div  className={`${darkMode ? "text-white" : "text-gray-900"} mt-4`}>
                Query ran in {queryExecutionTime}s -{" "}
                {tableData.length} Rows Loaded
              </div>
            )}
            
            <div className="export-buttons">
            <button className="px-3 p-2 bg-red-400 rounded-md mr-2" onClick={toggleSchemaView}>
              View {showSchema ? "Table" : "Schema"}
            </button>
              <button  onClick={exportToCSV}  className="px-3 p-2 bg-red-400 rounded-md mr-2">
                Export as CSV
              </button>
              <button  onClick={exportToExcel}  className="px-3 p-2 bg-red-400 rounded-md mr-2">
                Export as Excel
              </button>
              <button  onClick={exportToJSON}  className="px-3 p-2 bg-red-400 rounded-md">
                Export as JSON
              </button>
            </div>
          </div>
          {showSchema ? (
            <div className={`mt-4 p-4 w-fit ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-800' : 'border-gray-200'} rounded`}>
            <ul className={`list-disc pl-5 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {predefinedSchema.map((column, index) => (
                <li key={index} className="py-1">
                  <span className="font-semibold">{column.columnName}</span> - 
                  <span className={` ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}> {column.dataType}</span>
                </li>
              ))}
            </ul>
          </div>
          ) : (
            <>
              <Pagination
                pageIndex={pageIndex}
                pageSize={pageSize}
                pageSizeSelected={pageSizeSelected}
                updatePageSize={updatePageSize}
                pageOptions={pageOptions}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                gotoPage={gotoPage}
                previousPage={previousPage}
                nextPage={nextPage}
                darkMode={darkMode}
              />

              <DataTable
                highlightedColumn={tabState.highlightedColumn}
                setHighlightedColumn={handleColumnHighlight}
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                darkMode={darkMode}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SQLEditorTab;
