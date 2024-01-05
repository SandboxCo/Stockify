import React from "react"

import ArticleCard from "./ArticleCard"

function ArticleGrid({allArticles=[]}){
    return (
        <div style={{display:"flex", justifyContent:"space-between", height:"100%", width:"100%"}}>
            <div style={{width:"50%", height:"100%"}}>
                <ArticleCard title={"Lizard"} subtitle={"Lizards are a widespread group of squamate reptiles, with over 6,000"} lastPosted={"14 hrs ago"} article={"Yahoo Finance"} imageUrl={"https://cc-prod.scene7.com/is/image/CCProdAuthor/What-is-Stock-Photography_P1_mobile?$pjpeg$&jpegSize=200&wid=720"} showImage={true}/>
            </div>
            <div style={{width:"50%", flexDirection:"column", display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", paddingLeft:10}}>
                <div style={{height: "47%"}}>
                    <ArticleCard title="Lizard" subtitle="Lizards are a widespread group of squamate reptiles, with over 6,000" lastPosted="14 hrs ago" article="Yahoo Finance" imageUrl="https://cc-prod.scene7.com/is/image/CCProdAuthor/What-is-Stock-Photography_P1_mobile?$pjpeg$&jpegSize=200&wid=720" showImage={false}/>
                </div>
                <div style={{height:"47%"}}>
                    <ArticleCard title="Lizard" subtitle="Lizards are a widespread group of squamate reptiles, with over 6,000" lastPosted="14 hrs ago" article="Yahoo Finance" imageUrl="https://cc-prod.scene7.com/is/image/CCProdAuthor/What-is-Stock-Photography_P1_mobile?$pjpeg$&jpegSize=200&wid=720" showImage={false}/>
                </div>
            </div>
        </div>
    )
}


export default ArticleGrid