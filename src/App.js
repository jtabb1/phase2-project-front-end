
import './App.css';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import QualityGraph from "./QualityGraph";
import QuantityGraph from "./QuantityGraph";
import NavBar from "./NavBar";

function App() {

  // const [dataSeries, setDataSeries] = useState('qualityData');
  // const [data, setData] = useState(null);

  return (
    <div>
      <NavBar />

      {/* {data !== null ? ( */}
        <Switch>

          <Route exact path="/quality">
            <QualityGraph />
          </Route>

          <Route exact path="/quantity">
            <QuantityGraph />
          </Route>

          <Route exact path="/">
            <QualityGraph />
          </Route>

        </Switch> 
        {/* ) : ( */}
        {/* <div><br /><p>loading ...</p></div>
      )} */}
    </div>
  );

}

export default App;