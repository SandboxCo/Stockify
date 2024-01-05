import React from "react"


function HorizontalNav(){

    return (
        <div style={{width: "100%", height:"100%", display: "flex", justifyContent: "space-between", boxSizing:"border-box", padding:15, paddingLeft:20, paddingRight:20}}>
            <img src={require("../media/logo.png")} width={135} height={40}/>

            <div>
                <button style={{fontWeight: 300, color:"white", border: "none", backgroundColor:"#007BFF", fontSize: 14, width: 100, padding:8, fontFamily:"Montserrat"}}>
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default HorizontalNav