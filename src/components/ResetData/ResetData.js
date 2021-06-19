import React from 'react';
// import { serveData } from './Seeds';

const allData = 
{
  qualityData: [
    { id: 101, ts: "1/01/2021", val: 1433.6 },
    { id: 102, ts: "1/11/2021", val: 1564.2 },
    { id: 103, ts: "2/01/2021", val: 1539.3 },
    { id: 104, ts: "2/11/2021", val: 1546.0 },
    { id: 105, ts: "3/01/2021", val: 1463.8 },
    { id: 106, ts: "3/11/2021", val: 1462.2 },
    { id: 107, ts: "4/01/2021", val: 1515.7 },
    { id: 108, ts: "5/01/2021", val: 1334.2 },
    { id: 109, ts: "6/01/2021", val: 1558.5 },
    { id: 1010, ts: "7/01/2021", val: 1545.5 }
  ],
  quantityData: [
    { id: 1, ts: "1/01/2021", val: 951.6 },
    { id: 2, ts: "1/11/2021", val: 909.8 },
    { id: 3, ts: "2/01/2021", val: 959.6 },
    { id: 4, ts: "2/11/2021", val: 974.2 },
    { id: 5, ts: "3/01/2021", val: 980.9 },
    { id: 6, ts: "3/11/2021", val: 951.2 },
    { id: 7, ts: "4/01/2021", val: 909.0 },
    { id: 8, ts: "5/01/2021", val: 997.9 },
    { id: 9, ts: "6/01/2021", val: 988.1 },
    { id: 10, ts: "7/01/2021", val: 936.6 }
  ]
}
;

const Api =
// "https://glorify-the-supreme-god-67d35a.herokuapp.com";
"http://localhost:4000";

function ResetData({ data, dataSeries, onReset, setData}) {

  // console.log(allData);
  const resetToData = allData[dataSeries];
  // console.log(resetToData);
  let prevData = [ ...data];
  console.log(prevData);
  prevData.sort((a,b) => a.id - b.id);
  let patchData =[];
  let postData = [];
  let deleteData = [];
  const skipIndices = [];

  function handleReset() {
    for (let i=0; i<resetToData.length; i++) {
      if (!prevData.i) {
        postData.push({
          id: resetToData.id, 
          ts: resetToData.ts, 
          val : resetToData.val});
      }
      if (prevData.i === resetToData.i) {
        skipIndices.push(i);
        if (prevData.ts !== resetToData.ts || prevData.ts !== resetToData.ts) {
          patchData.push({
            id: resetToData.id, 
            ts: resetToData.ts, 
            val : resetToData.val});
        }
      }
    }
    for (let i=0; i<prevData.length; i++) {
      if (!skipIndices[i]) {
        deleteData.push(prevData[i]);
      }
    }
    // setData(resetToData);
  }

  // function postRow(row) {
  //     fetch(`${Api}/${dataSeries}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(row), // revert to formData to see if it still works; set this to a new variable name if nec.
  //     })
  //     .catch(console.log);
  // }
  

  // function handleDelete() {
  //   data.forEach(et => {
  //     console.log(`${Api}/${dataSeries}/${et.id}`);
  //     fetch(`${Api}/${dataSeries}/${et.id}`, {
  //       method: "DELETE",
  //     })
  //     .catch(console.log);
  //   });
  //   handlePopulateDefault();
  // }

  // function handlePopulateDefault() {
  //   resetToData.forEach(et => {
  //     const datum = { ts: et.ts, val: et.val };
  //     console.log(datum);
  //     fetch(`${Api}/${dataSeries}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(datum), // revert to formData to see if it still works; set this to a new variable name if nec.
  //     })
  //       .catch(console.log);
  //   });
  //   // setData(()=>(null));
  // }

  return  <button 
            className="btn btn-danger" 
            // onClick={handleDelete}
          >Reset Data</button>;
}

export default ResetData;