
  // To do: make text red to signify that a permanent change has 
  //   not yet been made.  Plus change the color of the edit button 
  //   signify it needs to be pressed to make the change final.
  function handleInputChange(evt) {
    const idSelct = parseInt(evt.target.name,10);
    const valSelct = evt.target.value;
    // console.log(idSelct);
    // console.log(data[0].id)
    // console.log(data);
    // console.log(data.find(x => x.id === idSelct));
    const tsSelct = data.find(x => x.id === idSelct).ts;

    const datumSelct = { id: idSelct, ts: tsSelct, val: valSelct };

    const dataSelct = data.map((dm) =>
      dm.id === idSelct ? datumSelct : dm 
    );
    setData(dataSelct);
  }



  QuantityGraph





        const dataReg = data0.map( 
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

        svg.append( "g" )
          .attr( "transform", `translate(0,${g01aH-g01aM})` )        
          .call( d3.axisBottom(scT).tickFormat( format )
          .ticks( d3.utcMonth.every(2) ) )
        ;



//seems to work but only leads to being able to type in one number
// at a time:
function handleInputChange(evt) {
  const idSelct = parseInt(evt.target.name,10);
  const valSelct = evt.target.value;
  // console.log(idSelct);
  // console.log(data[0].id)
  // console.log(data);
  // console.log(data.find(x => x.id === idSelct));
  const tsSelct = data.find(x => x.id === idSelct).ts;

  const datumSelct = { id: idSelct, ts: tsSelct, val: valSelct };

  const dataSelct = data.map((da) =>
    da.id === idSelct ? datumSelct : da 
  );
  setData(dataSelct);
}
