import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>App Component - Animal Shelter Front End</h1>
      <Router>
        <Route path="/" component={Home} />
      </Router>
    </div>
  );
}

export default App;
