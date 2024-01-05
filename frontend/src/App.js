import React from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import { AuthProvider } from "./providers/AuthProvider";
import { DataProvider } from "./providers/DataProvider";

import AppLayout from "./components/pages/AppLayout";
import NotFoundPage from "./components/pages/NotFoundPage";
import SignInPage from "./components/pages/SignInPage";
import StockOverview from "./components/pages/StockOverview";
import NewsPage from "./components/pages/NewsPage";

function App() {
  return (

    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" 
              Component= {(routeProps) => (
                  <AppLayout {...routeProps} myComponentProp={<StockOverview/>} />
                )
              }
            />
            <Route path="/news" 
              Component= {(routeProps) => (
                  <AppLayout {...routeProps} myComponentProp={<NewsPage/>} />
                )
              }
            />
            <Route path="/signIn" Component={SignInPage} />
            <Route path="*" Component={NotFoundPage} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
