import React from "react"

function QuoteOverview({open, low, high, high52, low52, cap, volume, div}){

    const subTitleStyle ={
        fontSize: "12px",
        color: "#b3b3b3",
        fontFamily:"Montserrat"
    }

    return (
        <div style={{backgroundColor: "white", borderRadius: 10, height:"100%", boxSizing: "border-box", padding:7}}>
            <p style={{fontWeight: 500, margin:0, fontFamily:"Montserrat"}}>Quote Overview</p>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div>
                    <p style={subTitleStyle}>Day HIGH</p>
                    {high}
                </div>
                <div>
                    <p style={subTitleStyle}>52 WK HIGH</p>
                    {high52}
                </div>
                <div>
                    <p style={subTitleStyle}>MARKET CAP</p>
                    {cap}
                </div>
                <div>
                    <p style={subTitleStyle}>DAY LOW</p>
                    {low}
                </div>
                <div>
                    <p style={subTitleStyle}>52 WK LOW</p>
                    {low52}
                </div>
                <div>
                    <p style={subTitleStyle}>AVG. VOLUME</p>
                    {volume}
                </div>
                <div>
                    <p style={subTitleStyle}>DIVIDEND</p>
                    {div}
                </div>
            </div>
        </div>
    )
}

export default QuoteOverview