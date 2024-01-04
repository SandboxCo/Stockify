import React from "react"


function VerticalNav() {
    const linkStyle={
        color: "#333333",
        fontSize: "13px",
        textAlign: "left",
        backgroundColor: "transparent",
        border: "none",
        margin: 0,
        padding: 0,
        marginBottom: '12px'
    }

    return (
        <div style={{padding: "20px", justifyContent: "space-between", display:"flex", flexDirection: "column"}}>
            <div style={{marginBottom: "30px"}}>
                Stockify
            </div>
            <div style={{justifyContent:"space-between", display:"flex", flexDirection: "column", height: "100px", }}>
                <button style={linkStyle}>
                Dashboard
                </button>
                <button style={linkStyle}>
                    Live News
                </button>
                <button style={linkStyle}>
                    Stock Market
                </button>
            </div>
        </div>
    )
}

export default VerticalNav