import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import { NavBar } from "./components/NavBar";
import { Animals } from "./containers/Animals";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/animals" component={Animals} />
      </Router>
    </div>
  );
}

export default App;
