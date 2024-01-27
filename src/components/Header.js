import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/actions";
import { FaMoon, FaSun } from "react-icons/fa";
import Modal from "react-modal";
Modal.setAppElement('#root'); // or whatever your app root element ID is

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);

  const openTipsModal = () => {
    setIsTipsModalOpen(true);
  };

  const closeTipsModal = () => {
    setIsTipsModalOpen(false);
  };

  const customStyles = {
    content: {
      color: darkMode ? 'white' : 'black',
      background: darkMode ? '#333' : '#FFF',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
  };

  // Style for close button
  const closeButtonStyle = {
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '1.5em',
    color: darkMode ? 'white' : 'black',
  };

  return (
    <header className="bg-blue-500 items-center p-4 border-b border-gray-200 flex justify-between">
      <h1 className="text-2xl">SQL Editor ATLAN</h1>
      <div className="flex items-center">
        <label className="flex items-center mr-4">
          {!darkMode ? (
            <FaMoon className="text-white text-xl cursor-pointer" onClick={() => dispatch(toggleDarkMode())} />
          ) : (
            <FaSun className="text-yellow-400 text-xl cursor-pointer" onClick={() => dispatch(toggleDarkMode())} />
          )}
        </label>
        <button className={`${darkMode?"bg-black text-white":"bg-white text-black"} px-3 py-2 rounded-lg`} onClick={() => setIsTipsModalOpen(true)}>Show Tips</button>

      </div>

      {/* Tips Modal */}
      <Modal
        isOpen={isTipsModalOpen}
        onRequestClose={closeTipsModal}
        contentLabel="Tips Modal"
        style={customStyles}
      >
        <button style={closeButtonStyle} onClick={closeTipsModal}>&times;</button>
        <div className="mr-10 p-5">
          <h2 className="font-extrabold text-center mb-2">Tips for Using the Application</h2>
          <p><span className="font-bold">New Tab:</span> Click on + to open a new tab.</p>
          <p><span className="font-bold">Highlight Column:</span> Click on the column header of a table to highlight (Excluding ID Header).</p>
          <p><span className="font-bold">Chunk Based Rendering:</span> Updates Table per 1024*10 bytes (Papaparse).</p>
          <p><span className="font-bold">Edit Tab Name:</span> Double Click on Tab name (Example: Tab 1) to edit tab name.</p>
          <p><span className="font-bold">Dark/Light Mode:</span> Switch between Dark/Light mode by clicking Sun/Moon button.</p>
          <p><span className="font-bold">View All Rows:</span> Select "all" option in Rows per page.</p>
          <p><span className="font-bold">Copy Query:</span> To copy the query onto your clipboard click on Copy Query button.</p>
          <p><span className="font-bold">View Schema/Table</span> Click on View Schema/Table to see the respective output.</p>
          <p><span className="font-bold">Export Options Available:</span> .csv, .xlsx, .json extentions available.</p>
          <p><span className="font-bold">Query List:</span> Automatically opens a new tab when you click on a item from the Query List.</p>
          <p><span className="font-bold">Others:</span> Pagination, History, Saved, Independent Tabs (Output stored even when tab is switched).</p>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
