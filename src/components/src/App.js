import React from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import HeroesContainer from "./components/HeroesContainer/HeroesContainer";
import HeroesProfile from "./components/HeroesProfile/HeroesProfile";


function App() {
  return (
    <main className="app">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/heroes">
          <HeroesContainer />
        </Route>
        <Route exact path="/heroes/:id">
          <HeroesProfile />
        </Route>
        {/* keep the "*" path at the end */}
        <Route path="*">
          <h1>404 Not Found :c</h1>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
