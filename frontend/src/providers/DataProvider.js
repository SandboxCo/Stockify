// MyContext.js
import React, { createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

import { test_articles, test_stocks, test_watched, test_series} from '../constants/dummy_data';

// Step 2: Create the context
const DataContext = createContext();

// Step 3: Create the provider component
const DataProvider = ({ children }) => {
  // State or any other data you want to provide
  const [articles, setArticles] = useState(test_articles)
  const [stocks, setStocks] = useState(test_stocks)

  const [watchlist, setWatchlist] = useState([])
  const [archivedArticles, setArchivedArticles] = useState([])

  const [currentlyWatching, setCurrentlyWatching] = useState(test_watched)
  const [series, setSeries] = useState(test_series)

  useEffect(() => {
    // Function to make the API call
    const fetchData = async () => {
      try {
        getAllStocks()
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    updateCurrentlyWatching(test_stocks[0])

    // Call the fetchData function immediately when the component mounts
    fetchData();

    // Set up an interval to make the API call every 30 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 30 * 60 * 1000); // 30 minutes in milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts


  const getStockData = async (ticker) => {
    // let apiUrl = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=QPFs6luFf15cS9kaDOcGp9GwhzGh0482`
    // let imageRes = await fetch(apiUrl)

    // let res = await imageRes.json()
    // const image_api = res.results.branding.icon_url + '?apiKey=QPFs6luFf15cS9kaDOcGp9GwhzGh0482'
    // let blob = await fetch(image_api)
    // let ret = await blob.blob()
    // const image_url = URL.createObjectURL(ret);    

    // console.log(image_url)

    let apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=I118H54CYS5PG3OK"
    let seriesRes =  await axios.get(apiUrl)
    const series = seriesRes.data

    console.log(series)

    return series
  }

  const getArticles = async () => {
    let apiUrl = "http://localhost:8081/articles"
    const res = await axios.get(apiUrl)
    const articles = res.data

    setArticles(articles)
  }

  const getAllStocks = async () => {
    let apiUrl = "http://localhost:8081/stocks"
    const res = await axios.get(apiUrl)
    const stocks = res.data
    console.log(stocks)
    setStocks(stocks)
  }

  const getWatchlist = async () => {
    let apiUrl =""
    const list = await axios.get(apiUrl)
    setWatchlist(list)
  }

  const getArchivedArticles = async () => {
    let apiUrl =""
    const articles = await axios.get(apiUrl)
   // setArchivedArticles(articles)
  }

  const updateWatchlist = async (newWatchList) => {
    let apiUrl = "" 
    if (apiUrl !==""){
        const res = await axios.post(apiUrl, {
            data: {
                newWatchList
            }
        })
    }

    setWatchlist(newWatchList)

   // return res
  }

  const updateArchivedArticles = async (newArchived) => {
    let apiUrl = "" 
    const res = await axios.post(apiUrl, {
        data: {
            newArchived
        }
    })

    return res
  }

  const updateCurrentlyWatching = async (stock) => {
    //const {series, image_url} = await getStockData(stock.symbol)

    setCurrentlyWatching({
      ticker: stock.ticker,
      name: stock.name,
      price:stock.price,
    })
  }

  const testData = () => {
    getArticles()
    getAllStocks()
   // getStockData("AAPL")
  }

  // Step 4: Provide the context value to the children
  return (
    <DataContext.Provider value={{
      articles,
      stocks,
      archivedArticles,
      watchlist,
      currentlyWatching,
      series,
      updateWatchlist,
      updateCurrentlyWatching,
      updateArchivedArticles,
      getStockData,
      testData
    }}>
      {children}
    </DataContext.Provider>
  );
};

function useData(){
  return useContext(DataContext)
}

export {DataProvider, useData}