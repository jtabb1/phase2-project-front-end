
import './App.css';
import React, { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import QualityGraph from "./QualityGraph";
import QuantityGraph from "./QuantityGraph";
import NavBar from "./NavBar";

function App() {

  const [dataSeries, setDataSeries] = useState('qualityData');
  // const [data, setData] = useState(null);

  return (
    <div>
      <NavBar />

        <Switch>

          <Route exact path="/quality">
            <QualityGraph dataSeries={dataSeries} setDataSeries={setDataSeries} />
          </Route>

          <Route exact path="/quantity">
            <QuantityGraph dataSeries={dataSeries} setDataSeries={setDataSeries}/>
          </Route>

          <Route exact path="/">
            <QualityGraph dataSeries={dataSeries} setDataSeries={setDataSeries}/>
          </Route>

        </Switch> 
    </div>
  );

}

export default App;