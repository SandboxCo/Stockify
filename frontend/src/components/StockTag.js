import React from "react"

function StockTag({logoURL, company, symbol, price}){

    return (
        <div style={{display:"flex", width: 250, height: 30}}>
         
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{marginRight: 10}}>
                    <p style={{fontSize: 12, margin: 0, fontFamily:"Montserrat", fontWeight:600}}>{company}</p>
                    <p style={{fontSize: 10, margin: 0, fontFamily:"Montserrat"}} >{symbol}</p>
                </div>
                <p style={{fontSize:16,fontFamily:"Montserrat" }}>${price}</p>
            </div>
        </div>
    )
}
//   <img href={logoURL} style={{width:50, marginRight:15}}/>
export default StockTag