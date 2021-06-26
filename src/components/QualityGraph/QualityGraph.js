import React, { useEffect, useRef } from 'react';
import { select } from "d3";
import * as d3 from "d3";

const strokeColor = "red";

function QualityGraph({ qualityData, setQualityData }) {

  const data = qualityData;


  
  // const setData = setQualityData;

  let g01aWidthScaling = "0.9";
  let g01aHeightScaling = "0.4";
  let g01aM = 40;
  
  const svgRef = useRef();

  var parseDateStr = d3.utcParse( "%Y-%m-%d" );
  var format = d3.utcFormat( "%m/%Y" );

  let vptH = window.innerHeight;
  let g01aH = +g01aHeightScaling * vptH;

  useEffect( () => {

    let vptW = window.innerWidth;

    //  //
    //
    console.log(setQualityData)
    console.log('useEffect graph was called.')
    // console.log(vptW);
    if (vptW >= 1400) {
      vptW = 1320;
    } else if (vptW >= 1200) {
      vptW = 1140;
    } else if (vptW >= 992) {
      vptW = 960;
    } else if (vptW >= 768) {
      vptW = 720;
    } else if (vptW >= 576) {
      vptW = 540;
    }
    // console.log(vptW);
    // console.log(data);

    let g01aW = +g01aWidthScaling * vptW;

    data.sort((a,b) => Date.parse(b.ts) - Date.parse(a.ts));

    const dataReg = data.map( 
      o => {
        return {ts: parseDateStr(o.ts), val: o.val} 
    });
    const maxVal = dataReg.reduce(
      (prev, current) => (prev.val > current.val) ? prev : current)
      .val
    ;
    const dataDbl = d3.pairs( dataReg, 
      (a,b) => ({ src: a, dst: b }) 
    );

    var scT = d3.scaleUtc()
      .domain( d3.extent( dataReg, d=>d.ts ) ).nice()  
      .range( [ g01aM, g01aW-g01aM ] );
    var scY = d3.scaleLinear()
      .domain( [0, 1.3*maxVal] ).range( [ g01aH-g01aM, g01aM ] );

    const svg = select(svgRef.current);
    
    svg.selectAll("g").remove();
    svg.selectAll("circle").remove();
    svg.selectAll("line").remove();

    svg
      .attr( "cursor","crosshair" )
      .attr( "width",g01aW )
      .attr( "height",g01aH )
    ;

    svg
      .selectAll("line").data(dataDbl).enter().append("line")
      .attr( "x1", d => scT(d.src.ts) ) 
      .attr( "x2", d => scT(d.dst.ts) )
      .attr( "y1", d => scY(d.src.val) )
      .attr( "y2", d => scY(d.dst.val) )
      .attr( "stroke", strokeColor )
    ;
        
    svg
      .selectAll("circle").data(dataReg).enter().append("circle")
      .attr( "r", 3 ).attr( "fill", "black" )
      .attr( "cx", d => scT(d.ts) )
      .attr( "cy", d => scY(d.val) )
    ;

    svg
      .append( "g" )
      .attr( "transform", `translate(${g01aM},0)` )
      .call( d3.axisLeft(scY) )
    ;

    svg
      .append( "g" )
      .attr( "transform", `translate(0,${g01aH-g01aM})` )        
      .call( d3.axisBottom(scT).tickFormat( format )
      .ticks( d3.utcMonth.every(2) ) )
    ;
  // eslint-disable-next-line
  }, [forcedRedraw]);
  
  return data !== null ?  (
    <div>
      <div className='container'>
        <div className='row'>
          <svg ref={svgRef}></svg>
        </div>
      </div>
    </div>
  ) : (
    <p>loading graph data... </p>
  );
}

export default QualityGraph;