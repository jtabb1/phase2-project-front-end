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
    <div>
        
      {/* <NavLink
        to="/"
        exact
      >
      </NavLink> */}
        
      <NavLink
        to="/quality"
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Quality
      </NavLink>

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
  );
}

export default NavBar;