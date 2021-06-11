import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select } from "d3";
import * as d3 from "d3";
// import startingData from "./data/initial_data";

var parseDateStr = d3.utcParse( "%m/%d/%Y" );
var format = d3.utcFormat( "%m/%Y" );

function App() {

  // const data00 = startingData.ds00.map( 
  //   o => ({ts: parseDateStr(o.ts), val: o.val}) );

  //Future Feature: Set state to local data if backend server 
  //  is unavailable, and notify the user if this is the case.
  //  Would be: const [data0, setData] = useState( data00 );.
  const [data0, setData] = useState( [] );
  const svgRef = useRef();

  useEffect(() => {
    let vptW = window.innerWidth;
    let vptH = window.innerHeight;
    let g01aWidthScaling = "0.9";
    let g01aW = +g01aWidthScaling * vptW;
    let g01aHeightScaling = "0.4";
    let g01aH = +g01aHeightScaling * vptH;
    let g01aM = 40;

    const dataSeries = 'ds00';

    fetch(
      `http://localhost:4000/${dataSeries}`
    )
    .then((r) => r.json())
    .then(j=>{
      const dataX = j.map( 
        o => ({ts: parseDateStr(o.ts), val: o.val}) );
      console.log(dataX);

      var scT = d3.scaleUtc()                                   //<3>
      .domain( d3.extent( dataX, d=>d.ts ) ).nice()  
      .range( [ g01aM, g01aW-g01aM ] );
      var scY = d3.scaleLinear()
        .domain( [0, 1100] ).range( [ g01aH-g01aM, g01aM ] );
      var scC = d3.scaleThreshold()                             //<4>
        .domain( [900, 1100] ).range( ["green","orange","red"] );

      const data = d3.pairs( dataX,                                    //<5>
        (a,b) => { return { src: a, dst: b } } ); 

      const svg = select(svgRef.current);
      svg
        .attr( "cursor","crosshair" )
        .attr( "width",g01aW )
        .attr( "height",g01aH )
      ;

      svg
        .selectAll("line").data(data).enter().append("line")
        .attr( "x1", d => scT(d.src.ts) ) 
        .attr( "x2", d => scT(d.dst.ts) )
        .attr( "y1", d => scY(d.src.val) )
        .attr( "y2", d => scY(d.dst.val) )
        .attr( "stroke", d=>scC( (d.src.val + d.dst.val)/2 ) )
      ;
          
      svg
        .selectAll("circle").data(dataX).enter().append("circle")
        .attr( "r", 3 ).attr( "fill", "red" )
        .attr( "cx", d => scT(d.ts) )
        .attr( "cy", d => scY(d.val) )
      ;

      svg
        .append( "g" )
        .attr( "transform", `translate(${g01aM},0)` )
        .call( d3.axisLeft(scY) )
      ;

      svg.append( "g" )
        .attr( "transform", `translate(0,${g01aH-g01aM})` )        
        .call( d3.axisBottom(scT).tickFormat( format )
        .ticks( d3.utcMonth.every(2) ) )
      ;

    });

  }, [data0]);
  
  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data0.map(value => value + 5))}>
        Update data 
      </button>
      <button onClick={() => setData(data0.filter(value => value < 25))}>
        Filter data 
      </button>
    </React.Fragment>
  );
}

export default App;

/*

      <button>
        Update data 
      </button>
      <button>
        Filter data 
      </button>
/* */