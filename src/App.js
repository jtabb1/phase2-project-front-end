
import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import QualityGraph from "./QualityGraph";
import QuantityGraph from "./QuantityGraph";
import NavBar from "./NavBar";

// Can I define these once and use them across files?
// var parseDateStr = d3.utcParse( "%m/%d/%Y" );
// var format = d3.utcFormat( "%m/%Y" );

function App() {

  // const [dataSeries, setDataSeries] = useState('qualityData');
  const [data, setData] = useState([]);

  // console.log('hello');
  useEffect(() => {
    fetch(
      `http://localhost:4000/data`
    )
    .then((r) => r.json())
    .then((j)=>{
      const da = j;
      setData(()=>(da));
      // console.log('h2');
      // console.log(j);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <Switch>

        <Route exact path="/quality">
          <QualityGraph data={data}/>
        </Route>

        <Route exact path="/quantity">
          <QuantityGraph data={data}/>
        </Route>

        <Route exact path="/">
          <QualityGraph data={data}/>
        </Route>

      </Switch>
    </div>
  );

}

export default App;