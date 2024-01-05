import React from "react"

function StockTag({logoURL, company, tag, price}){

    return (
        <div style={{display:"flex", justifyContent:"space-between", width: 150, height: 30}}>
            <img href={logoURL}/>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{marginRight: 10}}>
                    <p style={{fontSize: 12, margin: 0, fontFamily:"Montserrat", fontWeight:600}}>{company}</p>
                    <p style={{fontSize: 10, margin: 0, fontFamily:"Montserrat"}} >{tag}</p>
                </div>
                <p style={{fontSize:16,fontFamily:"Montserrat" }}>{price}</p>
            </div>
        </div>
    )
}

export default StockTag