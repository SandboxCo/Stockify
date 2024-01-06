import React from "react"

import ArticleCard from "./ArticleCard"

function ArticleGrid({allArticles=[]}){
    return (
        <div style={{display:"flex", justifyContent:"space-between", height:"100%", width:"100%"}}>
            <div style={{width:"50%", height:"100%"}}>
            <ArticleCard title="Gas prices: Average declines hit the brakes in Canada" subtitle="Consumer confidence that gas prices will remain affordable in Canada." lastPosted="8 hrs ago" article="Yahoo Finance" imageUrl="https://s.yimg.com/uu/api/res/1.2/bcatGGioFFcmS7BjKGi5iQ--~B/Zmk9c3RyaW07aD0xMjM7cT04MDt3PTIyMDthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2023-12/3bdd6b00-ab3f-11ee-ac07-3c9247c8624a.cf.jpg" showImage={true}/>
            </div>
            <div style={{width:"50%", flexDirection:"column", display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", paddingLeft:10}}>
                <div style={{height: "47%"}}>
                <ArticleCard title={"Bank of Canada Report"} subtitle={"Posthaste: The Bank of Canada needs to avoid this mistake in 2024, says CIBC"} lastPosted={"14 hrs ago"} article={"Yahoo Finance"} imageUrl={"https://cc-prod.scene7.com/is/image/CCProdAuthor/What-is-Stock-Photography_P1_mobile?$pjpeg$&jpegSize=200&wid=720"} showImage={false}/>
                </div>
                <div style={{height:"47%"}}>
                    <ArticleCard title="Canada's job market 'virtually unchanged" subtitle="Average hourly wages increased 5.4% year-over-year." lastPosted="3 hrs ago" article="Yahoo Finance" imageUrl="https://cc-prod.scene7.com/is/image/CCProdAuthor/What-is-Stock-Photography_P1_mobile?$pjpeg$&jpegSize=200&wid=720" showImage={false}/>
                </div>
            </div>
        </div>
    )
}


export default ArticleGrid