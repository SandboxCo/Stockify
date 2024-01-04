import React from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import HomePage from "../src/components/pages/HomePage"

import VerticalNav from "./components/VerticalNav";

function App() {
  return (
    <>
      <div>
        
      </div>
      <div style={{display:"flex", }}>
        <div style={{width: "12vw"}}>
          <VerticalNav/>
        </div>
        <div style={{width: "88vw"}}>
          <Router>
            <Routes>
              <Route path="/" Component={HomePage}/>

            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
