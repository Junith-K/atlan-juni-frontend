import React, { useState } from "react";
import Header from "./components/Header";
import SQLEditorTab from "./components/SQLEditorTab";
import { useSelector } from "react-redux";

const App = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [editingTab, setEditingTab] = useState(null);
  const [editingName, setEditingName] = useState("");
  const darkMode = useSelector((state) => state.darkMode);
  const [queryList, setQueryList] = useState([
    { id: 1, name: "Query 1", query: "SELECT * FROM table1" },
    { id: 2, name: "Query 2", query: "SELECT * FROM table2" },
    { id: 3, name: "Query 3", query: "SELECT * FROM table3" },
  ]);
  const [queryHistory, setQueryHistory] = useState([]);
  const [savedQueries, setSavedQueries] = useState([]);

  const handleSaveQuery = (query) => {
    setSavedQueries((prevQueries) => {
      const queriesSet = new Set(prevQueries.map((q) => q.query));
      if (!queriesSet.has(query)) {
        return [...prevQueries, { id: prevQueries.length + 1, query }];
      }
      return prevQueries;
    });
  };

  const addNewTab = () => {
    const newTabId = tabs.length ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
    const newTabs = [
      ...tabs,
      {
        id: newTabId,
        name: `Tab ${newTabId}`,
        query: "",
        tableData: [],
        queryExecutionTime: null,
      },
    ];
    setTabs(newTabs);
    setActiveTab(newTabId);
  };

  const startEditing = (tabId, name) => {
    setEditingTab(tabId);
    setEditingName(name);
  };

  const stopEditing = () => {
    setEditingTab(null);
    setEditingName("");
  };

  const changeTabName = (e) => {
    setEditingName(e.target.value);
  };

  const confirmEdit = (tabId) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === tabId ? { ...tab, name: editingName } : tab
      )
    );
    stopEditing();
  };

  const selectTab = (tabId) => {
    setActiveTab(tabId);
  };

  const closeTab = (tabId) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId) {
      setActiveTab(newTabs.length > 0 ? newTabs[0].id : null);
    }
  };

  const updateTabState = (tabId, newState) => {
    setTabs(
      tabs.map((tab) => (tab.id === tabId ? { ...tab, ...newState } : tab))
    );
  };

  const addQueryToHistory = (query) => {
    setQueryHistory((prevHistory) => {
      const historySet = new Set([query, ...prevHistory]);
      const newHistory = Array.from(historySet).slice(0, 10);
      return newHistory;
    });
  };

  const openTabWithQuery = (query) => {
    const newTabId = tabs.length ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
    const newTabs = [
      ...tabs,
      {
        id: newTabId,
        name: `Tab ${newTabId}`,
        query,
        tableData: [],
        queryExecutionTime: null,
      },
    ];
    setTabs(newTabs);
    setActiveTab(newTabId);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Header />
      <main className="p-4 flex">
        <div className="mr-4 w-1/4 flex flex-col top-0 sticky h-min">
          <div
            className={`${
              darkMode ? "bg-[#3e404a]" : "bg-gray-300"
            } rounded-lg px-3 mb-2`}
          >
            <h2 className="text-xl font-semibold my-2">Query List</h2>
            <ul className="scrollable-container mb-2">
              {queryList.map((queryItem) => (
                <li
                  key={queryItem.id}
                  className={`cursor-pointer mb-2 rounded-lg px-2 py-1 mr-2 ${
                    darkMode
                      ? "text-blue-300 border border-gray-500"
                      : "text-blue-500 border border-gray-600"
                  } ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                  onClick={() => openTabWithQuery(queryItem.query)}
                >
                  {queryItem.query}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`${
              darkMode ? "bg-[#3e404a]" : "bg-gray-300"
            } rounded-lg px-3 mb-2`}
          >
            <h2 className="text-xl font-semibold my-2">History</h2>
            <div className="flex flex-col m-0 scrollable-container mb-2">
              {queryHistory.map((historyQuery, index) => (
                <span
                  key={index}
                  className={`cursor-pointer mb-2 rounded-lg px-2 py-1 mr-2 ${
                    darkMode
                      ? "text-blue-300 border border-gray-500"
                      : "text-blue-500 border border-gray-600"
                  } ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                  onClick={() => openTabWithQuery(historyQuery)}
                >
                  {historyQuery}
                </span>
              ))}
            </div>
          </div>
          <div
            className={`${
              darkMode ? "bg-[#3e404a]" : "bg-gray-300"
            } rounded-lg px-3 mb-2`}
          >            
            <h2 className="text-xl font-semibold my-2">Saved Queries</h2>
            <ul className="scrollable-container mb-2">
              {savedQueries.map((savedQuery) => (
                <li
                  key={savedQuery.id}
                  className={`cursor-pointer mb-2 rounded-lg px-2 py-1 mr-2 ${
                    darkMode
                      ? "text-blue-300 border border-gray-500"
                      : "text-blue-500 border border-gray-600"
                  } ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                  onClick={() => openTabWithQuery(savedQuery.query)}
                >
                  {savedQuery.query}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-3/4 border-gray-600 border rounded-md">
          <div className="flex items-center">
            <div className="flex overflow-x-auto h-min">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`flex items-center border-b-2 border-r-2 hover:border-b-blue-500 border-r-gray-500 ${
                    tab.id === activeTab
                      ? "border-b-blue-500"
                      : "border-b-transparent"
                  } ${
                    tab.id === activeTab
                      ? darkMode
                        ? "text-white"
                        : "bg-blue-300 text-black"
                      : darkMode
                      ? "bg-gray-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {editingTab === tab.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={changeTabName}
                      onBlur={() => confirmEdit(tab.id)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && confirmEdit(tab.id)
                      }
                      autoFocus
                      className={`p-3 py-1 focus:outline-none ${
                        tab.id === activeTab
                          ? darkMode
                            ? "bg-blue-700 text-white"
                            : "bg-blue-300 text-black"
                          : darkMode
                          ? "bg-gray-600 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    />
                  ) : (
                    <button
                      onClick={() => selectTab(tab.id)}
                      onDoubleClick={() => startEditing(tab.id, tab.name)}
                      className={`p-3 py-1 focus:outline-none`}
                    >
                      {tab.name}
                    </button>
                  )}
                  <button
                    onClick={() => closeTab(tab.id)}
                    className={`px-2 py-1 text-lg text-center text-current focus:outline-none ${
                      tab.id === activeTab
                        ? darkMode
                          ? "hover:bg-blue-500"
                          : "hover:bg-blue-400"
                        : darkMode
                        ? "hover:bg-gray-500"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addNewTab}
              className={`px-2 rounded-md focus:outline-none text-2xl ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              +
            </button>
          </div>
          {tabs.map(
            (tab) =>
              tab.id === activeTab && (
                <SQLEditorTab
                  key={tab.id}
                  tabState={tab}
                  updateTabState={(newState) =>
                    updateTabState(tab.id, newState)
                  }
                  darkMode={darkMode}
                  addQueryToHistory={addQueryToHistory}
                  onSaveQuery={handleSaveQuery}
                />
              )
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
