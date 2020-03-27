/*
      COMPONENT IMPORTS
*/
import React, {useState, createContext, useEffect} from 'react';
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";


function App() {
    const [stocksArr, setStocksArr] = useState([{name:"justin"}]);
    const [selectedSymbl, setSelectedSymbl] = useState("MSFT");
    const [showDetailsFor, setShowDetailsFor] = useState("")
    const [sectors, setSectors] = useState([]);

    // Fetch Stock Sectors
    useEffect(() => {
        const sandboxURL = "https://sandbox.iexapis.com/stable/";
        const sandboxAPI = "Tpk_d93c81541b234b3ea6078cf3db45dfc7";
        const sectorsAPI = `${sandboxURL}/ref-data/sectors?token=${sandboxAPI}`;
        const makeApiCall = async () => {
            const res = await fetch(sectorsAPI);
            const json = await res.json();
            console.log("FUNCTION - fetch stock sectors: ",json)
            setSectors(json)
        }
        // makeApiCall()
    }, []);

    // Fetch Details for User Provided Symbol
    useEffect(() => {
        const sandboxURL = "https://sandbox.iexapis.com/stable/";
        const sandboxAPI = "Tpk_d93c81541b234b3ea6078cf3db45dfc7";
        const searchAPI = `${sandboxURL}stock/${selectedSymbl}/financials?token=${sandboxAPI}`;
        const makeApiCall = async () => {
            const res = await fetch(searchAPI);
            const json = await res.json();
            setShowDetailsFor(json)
            console.log("Search results: ",json)
        }
        console.log("FUNCTION - fetch single stock: ", selectedSymbl)
        // makeApiCall()
    }, [selectedSymbl]);


    return (
        <div className="App">
            <Header sectors={sectors}/>
            <div className="contentContainer" >
                <StocksContext.Provider value={ {stocksArr, setStocksArr, setSelectedSymbl} }>
                    <Main />
                </StocksContext.Provider>
            </div>
            <Footer />
        </div>
  );
}

export default App;
export const StocksContext = createContext();