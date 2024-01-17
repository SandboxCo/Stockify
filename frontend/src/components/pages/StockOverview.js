import React, {useState} from "react"

import TickerTable from "../TickerTable"
import Chart from "react-apexcharts";

import QuoteOverview from "../QuoteOverview"
import StockTag from "../StockTag";
import ArticleGrid from "../ArticleGrid";

import DateCard from "../DateCard"

import MarketBar from "../MarketBar";
import NewsHeader from "../NewsHeader";

import TimerComponent from "../TimerComponent";

import Watchlist from "../Watchlist";
import { useData } from "../../providers/DataProvider";

function StockOverview(){
    const {stocks, watchlist, updateWatchlist,currentlyWatching, updateCurrentlyWatching, series} = useData()

    return (
        <div style={{display:"flex", flexDirection:"column", height:"100%", overflowY:"hidden", overflowX: "hidden", zIndex:-1}}>
            <div style={{display:"flex", justifyContent:"space-between", height:"96%", backgroundColor: "#eee"}}>  
                <div style={{flexDirection:"column", display:"flex", width:"55%", boxSizing:"border-box", padding:15, height:"100%"}}>
                    <div style={{height: "60%",  display:"flex", flexDirection:"column", width:"100%" }}>
                        <div style={{height:"12%", display:"flex", justifyContent: "space-between", alignItems:"center", boxSizing:"border-box", padding:4}}>
                            <StockTag company={currentlyWatching.name} symbol={currentlyWatching?.ticker} price={currentlyWatching?.price} />
                            <DateCard/>
                        </div>
                        <div style={{height:"88%", display:"flex", justifyContent:"space-between"}}>
                            <div style={{width:"70%", height:"100%"}}>
                                <Chart options={{chart: {
                                                        type: 'candlestick',
                                                        height: "50%",
                                                        background: "white",
                                                        borderRadius: 10
                                                        },
                                                xaxis: {
                                                        type: 'datetime'
                                                        },
                                                yaxis: {
                                                        tooltip: {
                                                            enabled: true
                                                        }
                                                        },
                                                theme: {
                                                    palette: 'palette4' // upto palette10
                                                    }
                                                }}
                                    series={series} type="candlestick" height={"100%"} />
                                </div>
                                <div style={{width:"27%", heigth:"100%"}}>
                                    <QuoteOverview
                                      low={"$332.10"}
                                      high={"$345.67"}
                                      high52={"$398.45"}
                                      low52={"$290.22"}
                                      cap={"$15.6 billion"}
                                      volume={"450,000"}
                                      div={"$1.20"}
                                    />
                                </div>
                        </div>
                    </div>
                    <div style={{height:"40%", display:"flex", justifyContent:"space-between", boxSizing:"border-box", padding:10}}>
                        <div style={{width:"70%", boxSizing:"border-box"}}>
                            <div style={{height:"10%"}}>
                                <NewsHeader/>
                            </div>
                            <div style={{height:"90%"}}>
                                <ArticleGrid/>
                            </div>
                        </div>
                        <div style={{width:"30%"}}>
                            
                        </div>
                    </div>
                </div>
                <div style={{width: "45%", height:"100%", boxSizing:"border-box", padding:15}}>
                  <TickerTable currentlyWatched={currentlyWatching} setCurrentlyWatched={updateCurrentlyWatching} stocks={stocks} watchlist={watchlist} setWatchlist={updateWatchlist}/>
                </div>
            </div>
            <div style={{height:"4%", width:"100%"}}>
                <MarketBar/>
            </div>
        </div>
    )
}

export default StockOverview