import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DataPoint from "../DataPoint/DataPoint";

function DataList({ data, dataSeries, setData, onCreate, onModify, onDelete }) {

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
      <div className="container my-4">

        <div className="row">
          <h3 className="text-center">Delete Or Change The Data:</h3>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      Date
                    </div>
                    <div className="col">
                      Tasks Per Hour
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{dataRows}</tbody>
        </table>
      </div>
    );
  }

export default DataList;