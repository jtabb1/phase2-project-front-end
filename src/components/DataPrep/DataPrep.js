
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
// import { Route, Switch } from "react-router-dom";
// import QualityGraph from "./components/QualityGraph/QualityGraph";
// import QuantityGraph from "./components/QuantityGraph/QuantityGraph";
import Home from "../Home/Home";
import D3LineGraph from "../D3LineGraph/D3LineGraph";
import CreateForm from "../CreateForm/CreateForm";
import DataList from '../DataList/DataList';
// import QualityGraph from "../QualityGraph/QualityGraph";
// import QuantityGraph from "../QuantityGraph/QuantityGraph";
// import CreateForm from "../CreateForm/CreateForm";
// import DataList from '../DataList/DataList';

// const Api = 
// "https://glorify-the-supreme-god-67d35a.herokuapp.com";
// "http://localhost:4000";

function DataPrep({
  isFromApp, 
  component, 
  dataSeriesDemand, 
  dataSeries, 
  setDataSeries, 
  qualityData, 
  setQualityData, 
  quantityData, 
  setQuantityData,
  data,
  onSetData,
  setData,
  activeMode,
  setActiveMode
}) {

  const [forcedRedraw, setForcedRedraw] = useState(0);

  console.log(dataSeriesDemand);
  // onSetData(dataSeriesDemand);
  switch(dataSeriesDemand) {
    case "qualityData":
      setData(qualityData);
      setDataSeries( () => ("qualityData") );
      onSetData()
      // setForcedRedraw((ps) => (ps+1));
      break;
    case "quantityData":
      console.log(dataSeriesDemand);
      setData(quantityData);
      setDataSeries( () => ("quantityData") );
      onSetData()
      // setForcedRedraw((ps) => (ps+1));
      break;
    default:
  }

  // function onSwitch() {
  //   setForcedRedraw((ps) => (ps+1));
  // }

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
  console.log(" ");
  console.log("The data prep component is being called.")
  // console.log(" ");
  // console.log(dataSeries);
  // console.log(" ");
  // console.log(Api);
  // console.log(isFromApp);
  // console.log(setQualityData);
  // console.log(setQuantityData);
  // console.log(setDataSeries);
  console.log(" ");

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
        <Home 
          setActiveMode={setActiveMode}
        />
      );
    case "D3LineGraph":
      return !!data ? (
        <D3LineGraph 
          data={data}
          dataSeries={dataSeriesDemand}
          forcedRedraw={forcedRedraw}
          setActiveMode={setActiveMode}
        />
      ) : (<p>Loading graph data ...</p>);
    case "CreateForm":
      return ( 
        (!!dataSeries) ? (
          <CreateForm 
            data={data}
            dataSeries={dataSeries}
            onCreate={onCreate}
            setData={setData}
            activeMode={activeMode}
          />
        ) : (<p>loading data series ...</p>)
      );
    case "DataList":
      return ( 
        (!!dataSeries) ? (
          <DataList 
            data={data}
            dataSeries={dataSeries}
            onSetData={onSetData}
            onCreate={onCreate}
            onModify={onModify}
            onDelete={onDelete}
            activeMode={activeMode}
          />
          ) : (<p>loading data series ...</p>)
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

/*
      ) : (<div></div>); // could I do null here or <></> ?


      /* */