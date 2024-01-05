import React from "react"

import ArticleCard from "./ArticleCard"

function ArticleGrid({allArticles=[]}){
    return (
        <div style={{display:"flex", justifyContent:"space-between", height:"100%", width:"100%"}}>
            <div style={{width:"50%", height:"100%"}}>
                <ArticleCard imgHeight={120}/>
            </div>
            <div style={{width:"50%", flexDirection:"column", display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", paddingLeft:10}}>
                <div style={{height: "47%"}}>
                    <ArticleCard imagePresent={false}/>
                </div>
                <div style={{height:"47%"}}>
                    <ArticleCard imagePresent={false}/>
                </div>
            </div>
        </div>
    )
}


export default ArticleGrid