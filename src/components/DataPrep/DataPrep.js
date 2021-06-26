
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
// import { Route, Switch } from "react-router-dom";
// import QualityGraph from "./components/QualityGraph/QualityGraph";
// import QuantityGraph from "./components/QuantityGraph/QuantityGraph";
import Home from "../Home/Home";
import D3LineGraph from "../CreateForm/CreateForm";
import CreateForm from "../CreateForm/CreateForm";
import DataList from '../DataList/DataList';
// import QualityGraph from "../QualityGraph/QualityGraph";
// import QuantityGraph from "../QuantityGraph/QuantityGraph";
// import CreateForm from "../CreateForm/CreateForm";
// import DataList from '../DataList/DataList';

const Api = 
"https://glorify-the-supreme-god-67d35a.herokuapp.com";
// "http://localhost:4000";

function DataPrep({
  isFromApp, 
  component, 
  dataSeriesDemand, 
  qualityData, 
  setQualityData, 
  quantityData, 
  setQuantityData
}) {

  const [data, setData] = useState(null);
  const [dataSeries, setDataSeries] = useState(dataSeriesDemand);
  const [forcedRedraw, setForcedRedraw] = useState(0);

  switch(dataSeries) {
    case "qualityData":
      setData(qualityData);
      break;
    case "quantityData":
      setData(quantityData);
      break;
    default:
  }

  function onCreate() {
    setForcedRedraw((ps) => (ps+1));
  }

  function onModify() {
    setForcedRedraw((ps) => (ps+1));
  };

  function onDelete() {
    setForcedRedraw((ps) => (ps+1));
  };

  // //
  //
  console.log(Api);
  console.log(isFromApp);
  console.log(setQualityData);
  console.log(setQuantityData);
  console.log(setDataSeries);

  // useEffect( () => {

  //   fetch(
  //     `${Api}/${'qualityData'}`
  //   )
  //   .then((r) => r.json())
  //   .then((da)=>{
  //     setQualityData(
  //       da.sort((a,b) => Date.parse(b.ts) - Date.parse(a.ts))
  //     );
  //   });

  //   fetch(
  //     `${Api}/${'quantityData'}`
  //   )
  //   .then((r) => r.json())
  //   .then((da)=>{
  //     setQuantityData(
  //       da.sort((a,b) => Date.parse(b.ts) - Date.parse(a.ts))
  //     );
  //   });
  // }, []);

  switch(component) {
    case "Home":
      return (
        <Home />
      );
    case "D3LineGraph":
      return (
        <D3LineGraph 
          data={data}
          dataSeries={dataSeries}
          forcedRedraw={forcedRedraw}
        />
      );
    case "CreateForm":
      return (
        <CreateForm 
          data={data}
          dataSeries={dataSeries}
          setData={setData}
          onCreate={onCreate}
        />
      );
    case "DataList":
      return (
        <DataList 
          data={data}
          dataSeries={dataSeries}
          setData={setData}
          onCreate={onCreate}
          onModify={onModify}
          onDelete={onDelete}
        />
      );
    default:
      return (
        <p>Unknown component requested.  Please contact support @ email@biz.support.com 
          to get the information you need.
        </p>
      );
  }
}

export default DataPrep;