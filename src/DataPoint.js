import React from 'react';

const Api =
// "https://glorify-the-supreme-god-67d35a.herokuapp.com";
"http://localhost:4000";

function DataPoint({datum, dataSeries, onModify, onDelete}) {
  
  const { id, ts, val } = datum;

  // Handle a change here
  function handleSubmit(evt) {

  }

  function handleInputChange(evt) {

  }

  function handleDelete(vt) {
    fetch(`${Api}/${dataSeries}/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        onDelete(id);
      });
  }

  return (
  <tr>
    
    <td>
        {ts}
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </td>
      <td>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Input Value"
            name="val"
            value={val}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-success">
            Change
          </button>
        </form>
      </td>
  </tr>);
}

export default DataPoint;