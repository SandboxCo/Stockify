import React from "react"

import TickerTable from "../TickerTable"

function HomePage(){
    return (
        <div style={{display:"flex", height: "100vh", backgroundColor: "#eee", margin: "0 auto", border: "1px solid red", padding: 30}}>
            <div style={{flexDirection:"column", display:"flex", width:"75vw"}}>
                <div style={{height: "50%"}}>

                </div>
                <div style={{height:"50%"}}>
                    <TickerTable/>

                </div>
            </div>
            <div style={{width: "25vw"}}>

            </div>
        </div>
    )
}

export default HomePage