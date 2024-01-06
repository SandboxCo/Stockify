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
                    <p style={subTitleStyle}>Day HIGH <span style={{color:"black", marginLeft:5}}>{high}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>52 WK HIGH <span style={{color:"black", marginLeft:5}}>{high52}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>MARKET CAP <span style={{color:"black", marginLeft:5}}>{cap}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>DAY LOW <span style={{color:"black", marginLeft:5}}>{low}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>52 WK LOW <span style={{color:"black", marginLeft:5}}>{low52}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>AVG. VOLUME <span style={{color:"black", marginLeft:5}}>{volume}</span></p>
                </div>
                <div>
                    <p style={subTitleStyle}>DIVIDEND <span style={{color:"black", marginLeft:5}}>{div}</span></p>
                </div>
            </div>
        </div>
    )
}

export default QuoteOverview