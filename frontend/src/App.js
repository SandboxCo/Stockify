import React from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import HomePage from "../src/components/pages/HomePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage}/>

      </Routes>
    </Router>
  );
}

export default App;
