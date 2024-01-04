import { useState, useEffect } from "react";

import Header from "./Header/Header";
import Body from "../Dashboard/Body";

import { fetchStockData } from "../../api/apiServices";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [stockName, setstockName] = useState("");
  const [predictedData, setPredictedData] = useState({
    closePricesArray: [],
    datesArray: [],
    stockInfo: "",
    predictedContent: "",
  });

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleButtonClick = async (value) => {
    // Logic to handle button click, possibly making a request
    // Replace with your actual logic
    setstockName(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (stockName) {
        try {
          const data = await fetchStockData(stockName);
          if (data) {
            setPredictedData({
              closePricesArray: data.closePricesArray || [],
              datesArray: data.datesArray || [],
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [stockName]);

  return (
    <>
      <div className="grid-container">
        <Header
          onInputChangeDashboard={handleInputChange}
          onButtonClick={handleButtonClick}
        />
        <Sidebar />
        <Body predictedData={predictedData} />
      </div>
    </>
  );
};

export default Dashboard;
