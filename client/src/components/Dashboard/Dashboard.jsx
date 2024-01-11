import { React, useState, useEffect } from "react";

import { useAuth } from "../../context/AuthProvider";

import Header from "./Header/Header";
import Body from "../Dashboard/Body";
import { motion } from "framer-motion";

import {
  fetchPredictedData,
  fetchStockData,
  sendStockDataUserHistory,
} from "../../api/apiServices";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [stockName, setstockName] = useState("");
  const [stockData, setStockData] = useState({
    closePricesArray: [],
    datesArray: [],
    stockInfo: "",
  });

  const [predictionData, setPredictionData] = useState({
    score: "",
    pros: [],
    cons: [],
    overall: "",
  });
  const { userData, updateUserData } = useAuth();

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleButtonClick = async (value) => {
    setstockName(value);
  };
  const handleButtonClickHist = async (value) => {
    setstockName(value);
  };

  // useEffect(() => {
  //   fetchData();
  // }, [stockName]);

  // const fetchData = async () => {
  //   if (stockName) {
  //     try {
  //       const data = await fetchStockData(stockName);
  //       const predictedData = await fetchPredictedData(stockName);
  //       console.log(predictedData);
  //       if (data) {
  //         setPredictedData({
  //           closePricesArray: data.closePricesArray || [],
  //           datesArray: data.datesArray || [],
  //           score: predictedData.score,
  //           pros: predictedData.pros,
  //           cons: predictedData.cons,
  //           overal: predictedData.overall,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //     const respHistory = await sendStockDataUserHistory(
  //       stockName,
  //       userData._id
  //     );

  //     updateUserData(respHistory.data);
  //     console.log(respHistory);
  //   }
  // };

  useEffect(() => {
    const fetchAndSetStockData = async () => {
      if (stockName) {
        try {
          const data = await fetchStockData(stockName);
          if (data) {
            setStockData({
              closePricesArray: data.closePricesArray || [],
              datesArray: data.datesArray || [],
            });
          }
        } catch (error) {
          console.error("Error fetching stock data:", error);
        }

        const respHistory = await sendStockDataUserHistory(
          stockName,
          userData._id
        );

        updateUserData(respHistory.data);
        console.log(respHistory);
      }
    };

    const fetchAndSetPredictionData = async () => {
      if (stockName) {
        try {
          const predictedData = await fetchPredictedData(stockName);
          if (predictedData) {
            setPredictionData({
              score: predictedData.score || "",
              pros: predictedData.pros || [],
              cons: predictedData.cons || [],
              overall: predictedData.overall || "",
            });
          }
        } catch (error) {
          console.error("Error fetching predicted data:", error);
        }
      }
    };

    fetchAndSetStockData();
    fetchAndSetPredictionData();
  }, [stockName]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.01 } }}
    >
      <div className="grid-container">
        <Header
          onInputChangeDashboard={handleInputChange}
          onButtonClick={handleButtonClick}
        />
        <Sidebar />

        <Body
          stockData={stockData}
          predictionData={predictionData}
          onHistoryButtonClick={handleButtonClickHist}
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;
