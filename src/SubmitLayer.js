import React from 'react';
// import React, { useState } from 'react';

function SubmitLayer() {
/*
function SubmitLayer({ datum, onChangeForm, onEditPizza }) {

  function handleInputChange(event) {
    onChangeForm(event.target.name, event.target.value);
  }

  function handleRadioChange(event) {
    onChangeForm(event.target.name, event.target.value === "Vegetarian");
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3001/pizzas/${pizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza),
    })
      .then((r) => r.json())
      .then(onEditPizza);
  }
                               
  if (!pizza) return null;

  const { topping, size, vegetarian } = pizza;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">

        <div className="col-5">
          <input
            type="date"
            className="form-control"
            placeholder="Enter Date"
            name="ts"
            value={ts}
            onChange={handleInputChange}
          />
        </div>

        <div className="col">
          <input
              type="date"
              className="form-control"
              placeholder="Enter Date"
              name="val"
              value={val}
              onChange={handleInputChange}
          />
        </div>

        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>

      </div>
    </form>
  );
  */
 return(<h2>This is the submit layer.</h2>)
}

export default SubmitLayer;