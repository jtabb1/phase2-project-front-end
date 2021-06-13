import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DataPoint from "./DataPoint";

function DataList({ data, dataSeries, onModify, onDelete, setData}) {

    const dataRows = data.map( dm => (
        <DataPoint key={uuidv4()} 
          data = {data}
          datum={dm} 
          dataSeries={dataSeries}
          onModify={onModify} 
          onDelete={onDelete}
          setData={setData}
        />
    ));

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Delete</th>
            <th scope="col">Tasks Per Hour</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
      </table>
    );
  }

export default DataList;