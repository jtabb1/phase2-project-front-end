
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
  setQuantityData,
  data,
  setData
}) {

  const [dataSeries, setDataSeries] = useState(dataSeriesDemand);
  const [forcedRedraw, setForcedRedraw] = useState(0);

  //      Why do lines 41 and 44 output blank lines?  I tried using the state  
  // variable "dataSeries" as the compared parameter in the switch statement but  
  // was unable to as the output of that variable was apparent blankness in the 
  // console.log.  This is despite the fact that its default value was set in 
  // line 32 above.  An additional effort in setting the variable through the 
  // setDataSeries function below resulted in the program erroring out.
  console.log(dataSeries);
  // setDataSeries(dataSeriesDemand); // -> uncomment and it results in an error
  console.log(dataSeriesDemand);
  console.log(dataSeries);
  switch(dataSeriesDemand) {
    case "qualityData":
      // console.log(dataSeries)
      // console.log(qualityData);
      setData(qualityData);
      // console.log(data);
      break;
    case "quantityData":
      // console.log(dataSeries)
      // console.log(quantityData);
      setData(quantityData);
      // console.log(data);
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
  console.log(" ");
  console.log(" ");
  console.log("The data prep component is being called.")
  // console.log(" ");
  console.log(dataSeries);
  // console.log(" ");
  // console.log(Api);
  // console.log(isFromApp);
  // console.log(setQualityData);
  // console.log(setQuantityData);
  // console.log(setDataSeries);
  console.log("The data prep component has been called.")
  console.log(" ");
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
        <Home />
      );
    case "D3LineGraph":
      return !!data ? (
        <D3LineGraph 
          data={data}
          dataSeries={dataSeries}
          forcedRedraw={forcedRedraw}
        />
      ) : (<p>Loading graph data ...</p>);
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