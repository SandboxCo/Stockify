import React from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import VerticalNav from "../VerticalNav"
import HorizontalNav from "../HorizontalNav"
import StockOverview from "./StockOverview";
import NewsPage from "../NewsGrid";

function AppLayout({myComponentProp}){
    return (
        <div style={{width:"100vw", height: "100vh"}}>
          <div style={{height: "8vh", width:"100%"}}>
            <HorizontalNav/>
          </div>
          <div style={{display:"flex", height: "92vh"}}>
            <div style={{width: "11vw"}}>
              <VerticalNav/>
            </div>
            <div style={{width: "89vw"}}>
                {myComponentProp}
            </div>
          </div>
        </div>
    )
}

export default AppLayout