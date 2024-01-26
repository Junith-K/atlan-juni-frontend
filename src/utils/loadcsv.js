import Papa from 'papaparse';

const loadCSV = (fileName) => {
  return new Promise((resolve, reject) => {
    fetch(fileName)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          complete: results => {
            resolve(results.data);
          },
          error: error => reject(error)
        });
      });
  });
};

export default loadCSV
