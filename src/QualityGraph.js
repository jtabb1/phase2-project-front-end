import React, { useEffect, useRef, useState } from 'react';
import { select } from "d3";
import * as d3 from "d3";
import SubmitLayer from './SubmitLayer';
import DataList from './DataList';

const dataSeriesX = 'qualityData';
const strokeColor = "red";
// const Api =
// // "https://glorify-the-supreme-god-67d35a.herokuapp.com";
// "http://localhost:4000";

function QualityGraph({ qualityData, setQualityData, dataSeries, setDataSeries}) {

  const data = qualityData;
  const setData = setQualityData;
  // setDataSeries(dataSeriesX);

  let g01aWidthScaling = "0.9";
  let g01aHeightScaling = "0.4";
  let g01aM = 40;
  
  // const [data, setData] = useState(null);
  const [forcedRedraw, setForcedRedraw] = useState(0);
  const svgRef = useRef();

  function onDelete(deletedId) {
    const updatedData = data.filter((dm) => dm.id !== deletedId);
    setForcedRedraw((ps) => (ps+1));
    setData(()=>(updatedData));
  };

  function onModify (updDatum) {
    const updatedData = data.map((dm) => (
      dm.id === updDatum.id ? updDatum : dm
      ));
  setForcedRedraw((ps) => (ps+1));
    setData(()=>(updatedData));
  };

  let vptW = window.innerWidth;
  let vptH = window.innerHeight;
  let g01aW = +g01aWidthScaling * vptW;
  let g01aH = +g01aHeightScaling * vptH;

  var parseDateStr = d3.utcParse( "%m/%d/%Y" );
  var format = d3.utcFormat( "%m/%Y" );

  useEffect( () => {

      console.log(forcedRedraw);
      console.log(data);

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
  }, [forcedRedraw]);
  
  return data !== null ?  (
    <div>
      <svg ref={svgRef}></svg>
      <SubmitLayer />
      <DataList 
        data={data}
        dataSeries={dataSeriesX}
        onDelete={onDelete}
        onModify={onModify}
        setData={setData}
      /> 
    </div> 
  ) : (
    <p>loading ... </p> 
  );
}

export default QualityGraph;




  /*
  // if (forcedRedraw>1) {
  //   useEffect( () => {

  //     console.log(data);
  //     console.log(forcedRedraw);

  //     const dataReg = data.map( 
  //       o => {
  //         return {ts: parseDateStr(o.ts), val: o.val} 
  //     });
  //     const maxVal = dataReg.reduce(
  //       (prev, current) => (prev.val > current.val) ? prev : current)
  //       .val
  //     ;
  //     const dataDbl = d3.pairs( dataReg, 
  //       (a,b) => ({ src: a, dst: b }) 
  //     );

  //     var scT = d3.scaleUtc()
  //       .domain( d3.extent( dataReg, d=>d.ts ) ).nice()  
  //       .range( [ g01aM, g01aW-g01aM ] );
  //     var scY = d3.scaleLinear()
  //       .domain( [0, 1.3*maxVal] ).range( [ g01aH-g01aM, g01aM ] );

  //     const svg = select(svgRef.current);
  //     svg
  //       .attr( "cursor","crosshair" )
  //       .attr( "width",g01aW )
  //       .attr( "height",g01aH )
  //     ;

  //     svg
  //       .selectAll("line").data(dataDbl).enter().append("line")
  //       .attr( "x1", d => scT(d.src.ts) ) 
  //       .attr( "x2", d => scT(d.dst.ts) )
  //       .attr( "y1", d => scY(d.src.val) )
  //       .attr( "y2", d => scY(d.dst.val) )
  //       .attr( "stroke", strokeColor )
  //     ;
          
  //     svg
  //       .selectAll("circle").data(dataReg).enter().append("circle")
  //       .attr( "r", 3 ).attr( "fill", "black" )
  //       .attr( "cx", d => scT(d.ts) )
  //       .attr( "cy", d => scY(d.val) )
  //     ;

  //     svg
  //       .append( "g" )
  //       .attr( "transform", `translate(${g01aM},0)` )
  //       .call( d3.axisLeft(scY) )
  //     ;

  //     svg.append( "g" )
  //       .attr( "transform", `translate(0,${g01aH-g01aM})` )        
  //       .call( d3.axisBottom(scT).tickFormat( format )
  //       .ticks( d3.utcMonth.every(2) ) )
  //     ;
  //     // setForcedRedraw(forcedRedraw+1);
  //   }, []); // put forcedRedraw below     !!!!
  // }
  /* */
