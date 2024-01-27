import React, { useState } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useSelector } from 'react-redux';
import { sql } from '@codemirror/lang-sql';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';

const SQLEditor = ({ value, onChange, onExecuteQuery, onSaveQuery }) => {
  const darkMode = useSelector((state) => state.darkMode);
  const [isCopied, setIsCopied] = useState(false);


  const handleSaveQuery = () => {
    onSaveQuery(value);
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <div>
      <div className="max-h-[300px] overflow-auto ">
        <ReactCodeMirror
          value={value}
          extensions={[sql()]}
          theme={darkMode ? dracula : tokyoNightDay}
          onChange={onChange}
          className={`w-full editor-font-size h-[200px] ${darkMode?'bg-[#282a36]':'bg-white'} outline-none`}
        />
      </div>
      <button  onClick={onExecuteQuery}  className="mt-4 mr-2 bg-blue-400 copy-button-transition text-white py-2 px-4 rounded hover:bg-blue-400">
        Execute Query
      </button>
      <button  onClick={copyToClipboard}  className={`mt-2 mr-2 py-2 px-4 rounded copy-button-transition ${    isCopied ? 'bg-green-400' : 'bg-green-300'  } text-gray-800 hover:bg-green-500`}>
        {isCopied ? 'Copied!' : 'Copy Query'}
      </button>
      <button  onClick={handleSaveQuery}  className={`mt-2 py-2 px-4 rounded copy-button-transition ${    darkMode ? 'bg-yellow-200' : 'bg-yellow-100'  } text-gray-800 hover:bg-yellow-300`}>
        Save Query
      </button>
    </div>
  );
};

export default SQLEditor;
