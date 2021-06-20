import React, { useState } from 'react';
// import { serveData } from './Seeds';

const allData = 
{
  qualityData: [
    { id: 1, ts: "2021-01-01", val: 1433.6 },
    { id: 2, ts: "2021-01-11", val: 1564.2 },
    { id: 3, ts: "2021-02-01", val: 1539.3 },
    { id: 4, ts: "2021-02-11", val: 1546.0 },
    { id: 5, ts: "2021-03-01", val: 1463.8 },
    { id: 6, ts: "2021-03-11", val: 1462.2 },
    { id: 7, ts: "2021-04-01", val: 1515.7 },
    { id: 8, ts: "2021-05-01", val: 1334.2 },
    { id: 9, ts: "2021-06-01", val: 1558.5 },
    { id: 10, ts:"2021-07-01", val: 1545.5 }
  ],
  quantityData: [
    { id: 1, ts: "2021-01-01", val: 951.6 },
    { id: 2, ts: "2021-01-11", val: 909.8 },
    { id: 3, ts: "2021-02-01", val: 959.6 },
    { id: 4, ts: "2021-02-11", val: 974.2 },
    { id: 5, ts: "2021-03-01", val: 980.9 },
    { id: 6, ts: "2021-03-11", val: 951.2 },
    { id: 7, ts: "2021-04-01", val: 909.0 },
    { id: 8, ts: "2021-05-01", val: 997.9 },
    { id: 9, ts: "2021-06-01", val: 988.1 },
    { id: 10, ts:"2021-07-01", val: 936.6 }
  ]
}
;

const Api =
// "https://glorify-the-supreme-god-67d35a.herokuapp.com";
"http://localhost:4000";

function ResetData({ data, dataSeries, onReset, setData}) {

  const [numRows, setNumRows] = useState(0);
  const [numErrors, setNumErrors] = useState(null);

  const resetToData = allData[dataSeries];

  function handleReset() {

  // console.log(allData);
  // console.log(resetToData);
  let prevData = [ ...data];
  // console.log(prevData);
  prevData.sort((a,b) => a.id - b.id);
  let patchData = [];
  let postData = [];
  let deleteData = [];
  const skipIndices = [];

    let j = 0;
    let doPostData = true;
    for (let i=0; i<resetToData.length; i++) {
      let idReset = resetToData[i].id;
      let rowPrev = prevData[j];
      let idPrev = (!!rowPrev) ? rowPrev.id : null;
      doPostData = true;
      if (idReset === idPrev) { // ???
        j++;
        doPostData = false;
      }
      console.log(i,j,idReset,idPrev,doPostData);
      console.log(rowPrev);
      if (doPostData) {
        const newRow = {
          id: resetToData[i].id, 
          ts: resetToData[i].ts, 
          val: resetToData[i].val};
        postData.push(newRow);
        postRow(newRow);
      }
      if (idPrev === idReset) {
        skipIndices.push( (j-1) );
        if ( rowPrev.val !== resetToData[i].val 
            || Date.parse(rowPrev.ts) 
              !== Date.parse(resetToData[i].ts) ) {
          patchData.push({
            id: resetToData[i].id, 
            ts: resetToData[i].ts, 
            val: resetToData[i].val});
          updateRow(resetToData[i]);
        }
      }
    }
    console.log(skipIndices);
    for (let i=0; i<prevData.length; i++) {
      console.log(i);
      if (typeof(skipIndices.find( et => et === i )) === 'undefined') {
        console.log(i, i);
        const rowPrev = prevData[i];
        deleteData.push(rowPrev);
        deleteRow(rowPrev);
      }
    }
    console.log(prevData);
    console.log(postData);
    console.log(patchData);
    console.log(deleteData);
    console.log(skipIndices.length + postData.length
      + deleteData.length);
    // setData(resetToData);

    console.log(`Data Length: ${numRows}`);
    getNumRows();
    onReset();

    // if (numRows !== resetToData.length) {
    //   handleReset();
    // }
  }

  function deleteRow(row) {
    fetch(`${Api}/${dataSeries}/${row.id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => {
      const updatedData = data.filter((dm) => dm.id !== row.id);
      setData(()=>(updatedData))
    })
    .catch(console.log);
  }

  function updateRow(row) {
    fetch(`${Api}/${dataSeries}/${row.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
    })
    .then((r) => r.json())
    .then(() => {
      const updatedData = data.map((dm) => (
        dm.id === row.id ? row : dm
      ));
     setData(()=>(updatedData));
    })
    .catch(console.log);
  }

  function postRow(row) {
    fetch(`${Api}/${dataSeries}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row), 
    })
    .then((r) => r.json())
    .then((newRow) => {
      setData(()=>([newRow, ...data]));
    })
    .catch( er => {
      setNumErrors( (ps)=>(ps+1) );
      console.log(`The Post error: < ${numErrors}`);
      console.log(er);
      if (numErrors < 5) {
        setTimeout( postRow(row), 40 );
        console.log('re-trying Post function ...')
      } else {
        setNumErrors( ()=>(0) );
        console.log('Settling with Post error')
        return;
      }
    });
  }

  function getNumRows() {
    fetch(
      `${Api}/${dataSeries}`
    )
    .then((r) => r.json())
    .then((da)=>{
      setNumRows(
        () => da.length
      );
      if (da.length === resetToData.length) {
        onReset();
        return;
      } else {
        handleReset();
      }
    })
    .catch( er => {
      setNumErrors( (ps)=>(ps+1) );
      console.log(`The Get error: < ${numErrors}`);
      console.log(er);
      if (data.length === resetToData.length) {
        setNumErrors( ()=>(0) );
        onReset();
        return;
      } else if (numErrors < 5) {
        setTimeout( handleReset(), 20 );
        console.log('re-trying entire handleReset() ...')
      } else {
        setNumErrors( ()=>(0) );
        console.log('Settling with Get error')
        return;
      }
    });
    // .catch(console.log);
  }

  // function updateRows(patchData) {
  //   patchData.forEach(row => {
  //     fetch(`${Api}/${dataSeries}/${row.id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(row),
  //     })
  //     .then((r) => r.json())
  //     // .then(() => {
  //     //   const updatedData = data.map((dm) => (
  //     //     dm.id === tgtId ? updDatum : dm
  //     //   ));
  //     //  setData(()=>(updatedData));
  //     // })
  //     .catch(console.log);
  //   });
  // }
  // updateRows(patchData);

  // function postRows(postData) {
  //   postData.forEach(row => {
  //     fetch(`${Api}/${dataSeries}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(row), 
  //     })
  //     .catch(console.log);
  //   });
  // }
  // postRows(postData);

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
            onClick={handleReset}
          >Reset Data</button>;
}

export default ResetData;