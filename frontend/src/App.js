import React from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"


import VerticalNav from "./components/VerticalNav";
import HorizontalNav from "../src/components/HorizontalNav"
import StockOverview from "./components/pages/StockOverview";

function App() {
  return (
    <Router>

    <div style={{width:"100vw", height: "100vh"}}>
      <div style={{height: "8vh", width:"100%"}}>
        <HorizontalNav/>
      </div>
      <div style={{display:"flex", height: "92vh"}}>
        <div style={{width: "11vw"}}>
          <VerticalNav/>
        </div>
        <div style={{width: "89vw"}}>
            <Routes>
              <Route path="/" Component={StockOverview}/>
            </Routes>
        </div>
      </div>
    </div>
    </Router>

  );
}

export default App;
