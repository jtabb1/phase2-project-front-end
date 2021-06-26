
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import QualityGraph from "./components/QualityGraph/QualityGraph";
import QuantityGraph from "./components/QuantityGraph/QuantityGraph";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import CreateForm from "./components/CreateForm/CreateForm";
import DataList from './components/DataList/DataList';

const Api =
"https://glorify-the-supreme-god-67d35a.herokuapp.com";
// "http://localhost:4000";

function App() {

  const [qualityData, setQualityData] = useState(null);
  const [quantityData, setQuantityData] = useState(null);
  const [dataSeries, setDataSeries] = useState(null)
  const [data, setData] = useState(null)
  const [forcedRedraw, setForcedRedraw] = useState(0);

  function onCreate() {
    setForcedRedraw((ps) => (ps+1));
  }

  function onModify() {
    setForcedRedraw((ps) => (ps+1));
  };

  function onDelete() {
    setForcedRedraw((ps) => (ps+1));
  };

  useEffect( () => {

    fetch(
      `${Api}/${'qualityData'}`
    )
    .then((r) => r.json())
    .then((da)=>{
      setQualityData(
        da.sort((a,b) => Date.parse(b.ts) - Date.parse(a.ts))
      );
    });

    fetch(
      `${Api}/${'quantityData'}`
    )
    .then((r) => r.json())
    .then((da)=>{
      setQuantityData(
        da.sort((a,b) => Date.parse(b.ts) - Date.parse(a.ts))
      );
    });
  }, []);

  return   (
    <div>
      <NavBar />

        <Switch>

          <Route exact path="/quality">
            <QualityGraph qualityData={qualityData} setQualityData={setQualityData}
            />
          </Route>

          <Route exact path="/quantity">
            <QuantityGraph quantityData={quantityData} setQuantityData={setQuantityData}
            />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

        </Switch> 

        <CreateForm 
          data={data}
          dataSeries={dataSeries}
          onCreate={onCreate}
          setData={setData}
        />
        <DataList 
          data={data}
          dataSeries={dataSeries}
          onDelete={onDelete}
          onModify={onModify}
          setData={setData}
        />
        
    </div>
  );
}

export default App;