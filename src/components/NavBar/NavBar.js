import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
  width: "100px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "blue",
  textDecoration: "none",
  color: "white",
};

function NavBar() {
  return (
    <div className="container">
      <div className="row">

        <div className="col"></div>

        {/* <NavLink
          to="/"
          exact
        >
        </NavLink> */}
          
        <div className="col">
        <NavLink
          to="/quality"
          style={linkStyles}
          activeStyle={{
            background: "darkblue",
          }}
        >
          Quality
        </NavLink>
        </div>

        <div className="col">
        <NavLink
          to="/quantity"
          exact
          style={linkStyles}
          activeStyle={{
            background: "darkblue",
          }}
        >
          Quantity
        </NavLink>
        </div>

        <div className="col"></div>
      </div>
    </div>
  );
}

export default NavBar;