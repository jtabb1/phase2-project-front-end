import React, { useRef } from 'react';
import { select } from "d3";
// import * as d3 from "d3";

function QualityGraph({ data }) {

  let g01aWidthScaling = "0.9";
  let g01aHeightScaling = "0.4";
  // let g01aM = 40;
  
  // const dataSeries = 'qualityData';
  // const strokeColor = "red";
  // const data0 = data[dataSeries];

  const svgRef = useRef();
  let vptW = window.innerWidth;
  let vptH = window.innerHeight;
  let g01aW = +g01aWidthScaling * vptW;
  let g01aH = +g01aHeightScaling * vptH;

  const svg = select(svgRef.current);
  svg
    .attr( "cursor","crosshair" )
    .attr( "width",g01aW )
    .attr( "height",g01aH )
  ;

  console.log(data);

  // var parseDateStr = d3.utcParse( "%m/%d/%Y" );
  // var format = d3.utcFormat( "%m/%Y" );

  // const rt = 1;
  // const dataReg = data0.map( 
  //   o => {
  //     return {ts: parseDateStr(o.ts), val: o.val} 
  //   }
  // );
  // console.log(dataReg);
  // const maxVal = dataReg.reduce(
  //   (prev, current) => (prev.val > current.val) ? prev : current)
  //   .val
  // ;
  // console.log(maxVal);

  // var scT = d3.scaleUtc()
  //   .domain( d3.extent( dataReg, d=>d.ts ) ).nice()  
  //   .range( [ g01aM, g01aW-g01aM ] );
  // var scY = d3.scaleLinear()
  //   .domain( [0, 1.3*maxVal] ).range( [ g01aH-g01aM, g01aM ] );

  // const dataDbl = d3.pairs( dataReg, 
  //   (a,b) => { return { src: a, dst: b } } ); 

  // svg
  //   .selectAll("line").data(dataDbl).enter().append("line")
  //   .attr( "x1", d => scT(d.src.ts) ) 
  //   .attr( "x2", d => scT(d.dst.ts) )
  //   .attr( "y1", d => scY(d.src.val) )
  //   .attr( "y2", d => scY(d.dst.val) )
  //   .attr( "stroke", strokeColor )
  // ;
      
  // svg
  //   .selectAll("circle").data(dataReg).enter().append("circle")
  //   .attr( "r", 3 ).attr( "fill", "black" )
  //   .attr( "cx", d => scT(d.ts) )
  //   .attr( "cy", d => scY(d.val) )
  // ;

  // svg
  //   .append( "g" )
  //   .attr( "transform", `translate(${g01aM},0)` )
  //   .call( d3.axisLeft(scY) )
  // ;

  // svg.append( "g" )
  //   .attr( "transform", `translate(0,${g01aH-g01aM})` )        
  //   .call( d3.axisBottom(scT).tickFormat( format )
  //   .ticks( d3.utcMonth.every(2) ) )
  // ;

  return (
    <svg ref={svgRef}></svg>
  );
}

export default QualityGraph;