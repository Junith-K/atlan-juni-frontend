import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/actions";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <header className="bg-blue-500 p-4 border-b border-gray-200 flex justify-between">
      <h1 className="text-2xl">SQL Editor</h1>
      <label className="flex items-center">
        {!darkMode ? (
          <FaMoon className="text-white text-xl cursor-pointer" onClick={() => dispatch(toggleDarkMode())} />
        ) : (
          <FaSun className="text-yellow-400 text-xl cursor-pointer" onClick={() => dispatch(toggleDarkMode())} />
        )}
      </label>
    </header>
  );
};

export default Header;
