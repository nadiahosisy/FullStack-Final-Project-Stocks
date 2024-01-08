import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import {
  BsFillArchiveFill,
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsSearch,
} from "react-icons/bs";
import { FaBalanceScale } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchStockData } from "../../api/apiServices"; // Update with the correct path

function Body({ predictedData }) {
  const { userData } = useAuth();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (
      predictedData &&
      predictedData.datesArray &&
      predictedData.closePricesArray
    ) {
      setChartData(
        predictedData.datesArray.map((date, index) => ({
          date: date,
          price: predictedData.closePricesArray[index],
        }))
      );
    }
  }, [predictedData]);

  const handleStockClick = async (stockSymbol) => {
    try {
      const newStockData = await fetchStockData(stockSymbol);
      // Transform newStockData to the format needed by your chart if necessary
      setChartData(newStockData);
    } catch (error) {
      console.error("Error fetching new stock data:", error);
    }
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Stock Data</h3>
      </div>

      <div className="main-cards">
        {/* Prediction Score Card */}
        <div className="card">
          <div className="card-inner">
            <h3>Prediction Score</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{predictedData.predictionScore}</h1>
        </div>

        {/* Pros Card */}
        <div className="card">
          <div className="card-inner">
            <h3>Pros</h3>
            <BsHandThumbsUp className="card_icon" color="green" />
          </div>
          <h1 className="pros-header">{predictedData.pros}</h1>
        </div>

        {/* Cons Card */}
        <div className="card">
          <div className="card-inner">
            <h3>Cons</h3>
            <BsHandThumbsDown className="card_icon" color="red" />
          </div>
          <h1 className="cons-header">{predictedData.cons}</h1>
        </div>

        {/* Recent Searches Card */}
        <div className="card">
          <div className="card-inner">
            <h3>Recent Searches</h3>
            <BsSearch className="card_icon" />
          </div>
          <div className="card-content">
            {userData &&
            userData.searchedStocks &&
            userData.searchedStocks.length > 0 ? (
              <div className="search-scroll-list">
                {[...userData.searchedStocks]
                  .slice(-4)
                  .reverse()
                  .map((stock, index) => (
                    <div
                      key={index}
                      className="search-item"
                      onClick={() => handleStockClick(stock)}
                    >
                      {stock}
                    </div>
                  ))}
              </div>
            ) : (
              <p>No recent searches</p>
            )}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="charts">
        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="1 10" />
              <XAxis dataKey="date" />
              <YAxis tickCount={10} tickFormatter={(value) => `$ ${value}`} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Line
                type="natural"
                dataKey="price"
                stroke="#6c63ff"
                activeDot={{ r: 8 }}
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available to display the chart.</p>
        )}
      </div>
    </main>
  );
}

export default Body;
