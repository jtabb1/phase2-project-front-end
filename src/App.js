
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import QualityGraph from "./QualityGraph";
import QuantityGraph from "./QuantityGraph";
import NavBar from "./NavBar";

const Api =
// "https://glorify-the-supreme-god-67d35a.herokuapp.com";
"http://localhost:4000";

function App() {

  const [dataSeries, setDataSeries] = useState('qualityData');
  // const [data, setData] = useState(null);
  const [qualityData, setQualityData] = useState(null);
  const [quantityData, setQuantityData] = useState(null);

  useEffect( () => {

    fetch(
      `${Api}/${'qualityData'}`
    )
    .then((r) => r.json())
    .then((da)=>{
      setQualityData(da);
    });

    fetch(
      `${Api}/${'qualityData'}`
    )
    .then((r) => r.json())
    .then((da)=>{
      setQualityData(da);
    });
    
    // setData(qualityData);

  }, []);

  return qualityData !== null ?  (
    <div>
      <NavBar />

        <Switch>

          <Route exact path="/quality">
            <QualityGraph qualityData={qualityData} setQualityData={setQualityData}
              dataSeries={dataSeries} setDataSeries={setDataSeries}
            />
          </Route>

          <Route exact path="/quantity">
            <QuantityGraph quantityData={quantityData} setQuantityData={setQuantityData}
              dataSeries={dataSeries} setDataSeries={setDataSeries}
            />
          </Route>

          <Route exact path="/">
            <QualityGraph qualityData={qualityData} setQualityData={setQualityData}
             dataSeries={dataSeries} setDataSeries={setDataSeries}
            />
          </Route>

        </Switch> 
    </div>
  ) : (
    <p>loading ... </p> 
  );
}

export default App;