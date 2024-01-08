import { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthProvider";

import Header from "./Header/Header";
import Body from "../Dashboard/Body";
import { motion } from "framer-motion";

import {
  fetchStockData,
  sendStockDataUserHistory,
} from "../../api/apiServices";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [stockName, setstockName] = useState("");
  const [predictedData, setPredictedData] = useState({
    closePricesArray: [],
    datesArray: [],
    stockInfo: "",
    predictionScore: "",
    pros: "",
    cons: "",
    recommendation: "",
  });
  const { userData, updateUserData } = useAuth();

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleButtonClick = async (value) => {
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
              predictionScore: data.predictionScore,
              pros: data.pros,
              cons: data.cons,
              recommendation: data.recommendation,
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        const respHistory = await sendStockDataUserHistory(
          stockName,
          userData._id
        );

        updateUserData(respHistory.data);
        console.log(respHistory);
      }
    };

    fetchData();
  }, [stockName]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid-container">
        <Header
          onInputChangeDashboard={handleInputChange}
          onButtonClick={handleButtonClick}
        />
        <Sidebar />
        <Body predictedData={predictedData} />
      </div>
    </motion.div>
  );
};

export default Dashboard;
