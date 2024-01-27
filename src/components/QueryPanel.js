import { IoCloseCircle } from "react-icons/io5";

const QueryPanel = ({ title, queries, onItemClick, onDelete, darkMode }) => {
    return (
      <div className={`${darkMode ? "bg-[#3e404a]" : "bg-gray-300"} rounded-lg px-3 mb-2`}>
        <h2 className="text-xl font-semibold my-2">{title}</h2>
        <ul className="scrollable-container mb-2">
          {queries.map((query, index) => (
            <div key={index} className="flex items-center">
              <span
                className={`cursor-pointer flex-grow mb-2 rounded-lg px-2 py-1 mr-2 ${darkMode ? "text-blue-300 border border-gray-500" : "text-blue-500 border border-gray-600"} ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                onClick={() => onItemClick(query)}
              >
                {query.query || query}
              </span>
              {onDelete && (
                <IoCloseCircle
                  className={`cursor-pointer text-xl ${darkMode ? "text-red-300" : "text-red-500"}`}
                  onClick={() => onDelete(query.id || query)}
                />
              )}
            </div>
          ))}
        </ul>
      </div>
    );
  };
  
export default QueryPanel;