// MyContext.js
import React, { createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

import { test_articles, test_stocks } from '../constants/dummy_data';

// Step 2: Create the context
const DataContext = createContext();

// Step 3: Create the provider component
const DataProvider = ({ children }) => {
  // State or any other data you want to provide
  const [articles, setArticles] = useState(test_articles)
  const [stocks, setStocks] = useState(test_stocks)

  const [watchlist, setWatchlist] = useState([])
  const [archivedArticles, setArchivedArticles] = useState([])

  useEffect(() => {
    // Function to make the API call
    const fetchData = async () => {
      try {
        console.log("fetching")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function immediately when the component mounts
    fetchData();

    // Set up an interval to make the API call every 30 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 30 * 60 * 1000); // 30 minutes in milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts


  const getStockData = (ticker) => {
    return []
  }

  const getArticles = async () => {
    let apiUrl = ""
    const articles = await axios.get(apiUrl)
    setArticles(articles )
  }

  const getAllStocks = async () => {
    let apiUrl = ""
    const stocks = await axios.get(apiUrl)
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
    setArchivedArticles(articles)
  }

  const updateWatchlist = async (newWatchList) => {
    let apiUrl = "" 
    if (apiUrl !=""){
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
  // Step 4: Provide the context value to the children
  return (
    <DataContext.Provider value={{
      articles,
      stocks,
      archivedArticles,
      watchlist,
      updateWatchlist,
      updateArchivedArticles,
      getStockData
    }}>
      {children}
    </DataContext.Provider>
  );
};

function useData(){
  return useContext(DataContext)
}

export {DataProvider, useData}