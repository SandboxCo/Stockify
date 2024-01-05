import * as React from 'react';


function ArticleCard({ title, subtitle, lastPosted, article, imageUrl, showImage }) {
    return (
        <div style={{borderRadius:10, backgroundColor:"white",height:"100%", boxSizing:"border-box", padding: showImage ? 0: 10,}}>
            {showImage && (
                <img height={"50%"} width={"100%"} style={{borderRadius:"inherit"}} src={imageUrl}/> 
            )}
            <div style={{height:"50%", boxSizing:"border-box", padding: showImage ? 5 : 0, minHeight:200, alignItems:"center", justifyContent:"center"}}>
                <p style={{fontSize:13, margin:0, fontWeight:600, fontFamily:"Montserrat"}}>{title}</p>
                <p style={{fontSize:11, margin:0, fontFamily:"Montserrat", marginTop:5, marginBottom:2}}>{subtitle}</p>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <u><p style={{fontSize:9, margin:0, fontFamily:"Montserrat", marginTop:5, color:"#007BFF"}}>{article}</p></u>
                    <p style={{fontSize:9, margin:0, fontFamily:"Montserrat", marginTop:5}}>{lastPosted}</p>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard