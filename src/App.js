import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select } from "d3";
import * as d3 from "d3";

function App() {
  const [data0, setData] = useState(
    [ { ts: new Date( '2021-01-01T00:00:00.000Z' ), val: 951.6875 },
      { ts: new Date( '2021-01-11T00:00:00.000Z' ), val: 909.875 },
      { ts: new Date( '2021-02-01T00:00:00.000Z' ), val: 959.625 },
      { ts: new Date( '2021-02-11T00:00:00.000Z' ), val: 974.25 },
      { ts: new Date( '2021-03-01T00:00:00.000Z' ), val: 980.9375 },
      { ts: new Date( '2021-03-11T00:00:00.000Z' ), val: 951.25 },
      { ts: new Date( '2021-04-01T00:00:00.000Z' ), val: 909.0625 },
      { ts: new Date( '2021-05-01T00:00:00.000Z' ), val: 997.9375 },
      { ts: new Date( '2021-06-01T00:00:00.000Z' ), val: 988.125 },
      { ts: new Date( '2021-07-01T00:00:00.000Z' ), val: 936.6875 },
    ]
  );
  const svgRef = useRef();

  useEffect(() => {
    let vptW = window.innerWidth;
    let vptH = window.innerHeight;
    let g01aWidthScaling = "0.9";
    let g01aW = +g01aWidthScaling * vptW;
    let g01aHeightScaling = "0.4";
    let g01aH = +g01aHeightScaling * vptH;
    let g01aM = 40;

    // d3.text( "mths07dataLite.csv" ).then( res => {
    // });

    // var parse = d3.utcParse( "%m/%d/%Y" ); // needed if file comes as csv or if date is as a string maybe

    var format = d3.utcFormat( "%m/%Y" );

    var scT = d3.scaleUtc()                                   //<3>
      .domain( d3.extent( data0, d=>d.ts ) ).nice()  
      .range( [ g01aM, g01aW-g01aM ] );
    var scY = d3.scaleLinear()
      .domain( [0, 1100] ).range( [ g01aH-g01aM, g01aM ] );
    var scC = d3.scaleThreshold()                             //<4>
      .domain( [900, 1100] ).range( ["green","orange","red"] );

    const data = d3.pairs( data0,                                    //<5>
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
      .selectAll("circle").data(data0).enter().append("circle")
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

    // display mouse position
    // var format_with_days = d3.utcFormat( "%m/%d/%Y" );
    // var txt = svg.append("text").attr("x",100).attr("y",50)   //<8>
    //     .attr("font-family","sans-serif").attr("font-size",14);
    // svg.on( "mousemove", function() {                               
    //     var pt = d3.mouse( svg.node() )
    //     txt.text( format_with_days( scT.invert( pt[0] ) ) + " | " +  //<9>
    //               d3.format( ">2d" )( scY.invert(pt[1]) ) );  //<10>
    // } );    
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