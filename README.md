# SQL Query Editor

## Overview

The SQL Query Editor in ReactJS is a sophisticated web application tailored for data analysts and SQL query processing. It boasts an integrated code editor for composing SQL queries, supporting multiple tabs with preserved data for efficient multitasking. This application excels in handling large CSV files using PapaParse and Chunk Based Rendering. Displaying query results in a table format with React-Table, it includes execution time metrics and offers advanced features such as History, Saving, Pagination, and more. This makes it a robust and flexible tool for data analysts and developers alike.

## Frameworks and Major Packages Used

1. **React.js** ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) - A powerful front-end JavaScript library for building user interfaces based on components.
2. **Redux** ![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white) - A state management library commonly used with React for building user interfaces.
3. **TailwindCSS** ![TailwindCSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) - A utility-first CSS framework providing flexibility without predefined classes.
4. **Papaparse** ![Papaparse](https://img.shields.io/badge/-Papaparse-FF6B6B?logo=papaparse&logoColor=white) - The fastest in-browser CSV parser for JavaScript, reliable and RFC 4180 compliant.
5. **@uiw/react-codemirror** ![CodeMirror](https://img.shields.io/badge/-CodeMirror-0277BD?logo=codemirror&logoColor=white) - A web browser code editor with themes.
6. **Lodash** ![Lodash](https://img.shields.io/badge/-Lodash-3492FF?logo=lodash&logoColor=white) - A utility library providing throttle and debounce functionality.

## Features Implemented

1. **Code Editor with Dark/Light Mode** 🌗
    - Implemented a Code Editor using the react-codemirror package, enhancing user experience with Dracula and Light Themes.

2. **Tab System** 📑
    - Introduced a Tab System for seamless navigation through multiple queries. A maximum of 10 Tabs can be opened concurrently with different queries.

3. **Execute Query** ▶️
    - Displays query results in a table format using the `react-table` package, showcasing execution time and the number of rows returned.

4. **Pagination** 📄
    - Implemented pagination for improved webpage performance. An additional option to select `all` to view all rows, though it may affect performance.
    - Custom page number input for quick navigation through rows.

5. **Highlight Column** 🎨
    - Select any column header to highlight the entire column, facilitating better visibility and comparison with other tables when switching tabs.

6. **Edit Tab Name** 🖊️
    - Double-click on the Tab Name (e.g., Tab 1) to open an input text box for editing the Tab name.

7. **Query List/History/Saved** 🕒
    - View demo queries, history of executed queries, and saved queries. Click on any item to automatically open a new tab with the query.
    - Remove history/saved queries with a maximum limit of 10 queries per list.

8. **Export in CSV/JSON/EXCEL** 📊
    - Download data in CSV, JSON, or Excel format. Throttle function prevents multiple clicks within a short timeframe.

9. **Dark/Light Mode** 🌓
    - Switch between Dark and Light modes for improved viewability.

10. **Copy Query** 📋
    - Click on the Copy Query button to copy the current text in the code editor to your clipboard.

11. **Tips Option** 💡
    - Provides helpful tips for users on the website.

## Page Load Time Measurement

![Lighthouse Screenshot](/public/performance.png)

## Optimizations

- **Chunk Based Rendering:** Utilizing Papaparse's Chunks feature for efficient updates to the table data, improving performance.

- **Pagination:** Optimize rendering by implementing pagination, enabling users to view data in manageable chunks. Additional "all" option available for viewing all rows.

- **Throttled Function Calls:** Implemented throttling mechanisms for certain functions (e.g., executing a query, exporting data), preventing excessive calls and optimizing performance.

- **Memoization (useMemo):** Enhancing performance using the useMemo hook to store column data and avoid redundant computations.

- **Callback (useCallback):** Improving performance by memoizing callback functions using the useCallback hook, reducing re-renders.

- **Storing Tab Data:** Optimizing performance by storing individual tab states independently, ensuring data persistence when switching tabs.

## Additional Images

1. **Homepage**
![HomePage Screenshot](/public/homepage.png)

2. **Table Data**
![Table Screenshot](/public/loaded_table.png)

3. **Schema Data**
![Schema Screenshot](/public/schema.png)

4. **Highlight Column**
![Highlight Screenshot](/public/highlight.png)

5. **DarkMode**
![DarkMode Screenshot](/public/darkmode.png)

6. **LightMode**
![LightMode Screenshot](/public/lightmode.png)

7. **Tips**
![Tips Screenshot](/public/tips.png)
