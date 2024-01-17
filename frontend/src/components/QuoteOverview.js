import React from "react"

import { useData } from "../providers/DataProvider"

function QuoteOverview(){

    const subTitleStyle ={
        fontSize: "12px",
        color: "#b3b3b3",
        fontFamily:"Montserrat"
    }

    const { currentlyWatching } = useData()

    return (
        <div style={{backgroundColor: "white", borderRadius: 10, height:"100%", boxSizing: "border-box", padding:7}}>
            <p style={{fontWeight: 500, margin:0, fontFamily:"Montserrat"}}>Quote Overview</p>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div>
                    <p style={subTitleStyle}>After Hours <span style={{color:"black", marginLeft:5}}>${currentlyWatching.afterHours}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>Close<span style={{color:"black", marginLeft:5}}>${currentlyWatching.close}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>High<span style={{color:"black", marginLeft:5}}>${currentlyWatching.high}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>Low<span style={{color:"black", marginLeft:5}}>${currentlyWatching.low}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>Open<span style={{color:"black", marginLeft:5}}>${currentlyWatching.open}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>Premarket<span style={{color:"black", marginLeft:5}}>${currentlyWatching.preMarket}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>Volume<span style={{color:"black", marginLeft:5}}>${currentlyWatching.volume}</span></p>
                </div>
            </div>
        </div>
    )
}

export default QuoteOverview