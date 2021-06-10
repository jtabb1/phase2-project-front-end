import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select } from "d3";
// import * as d3 from "d3";

console.log('hello global');

function App() {
  const [data, setData] = useState([20, 25, 30, 45, 60]);
  const svgRef = useRef();
  console.log('hello');

  useEffect(() => {
    let vptW = window.innerWidth;
    let vptH = window.innerHeight;
    let g01aWidthScaling = "0.9";
    let g01aW = +g01aWidthScaling * vptW;
    let g01aHeightScaling = "0.4";
    let g01aH = +g01aHeightScaling * vptH;
    // let g01aM = 40;
    console.log(g01aW,g01aH);

    // var parse = d3.utcParse( "%m/%d/%Y" );
    // var format = d3.utcFormat( "%m/%Y" );
    // var format_with_days = d3.utcFormat( "%m/%d/%Y" );

    const svg = select(svgRef.current);
    svg
      .attr( "cursor","crosshair" )
      .attr( "width",g01aW )
      .attr( "height",g01aH )
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", value => value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("stroke", "red");
  }, [data]);
  
  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data.map(value => value + 5))}>
        Update data 
      </button>
      <button onClick={() => setData(data.filter(value => value < 25))}>
        Filter data 
      </button>
    </React.Fragment>
  );
}

export default App;