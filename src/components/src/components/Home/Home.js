import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

function Home() {
    return (
      <div className="home-container">
        <h1 className="home-heading">Super Heroes Page</h1>
        <img className="home-img" alt="heroes" src="https://bit.ly/3wkqf8d" />
        <Link className="home-link" to="/heroes">Here we go!</Link>
      </div>
    )
  }
  
  export default Home;