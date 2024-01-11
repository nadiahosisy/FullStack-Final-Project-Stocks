import React from "react";
import { useAuth } from "../../context/AuthProvider";
import {
  BsFillArchiveFill,
  BsSearch,
  BsHandThumbsUp,
  BsHandThumbsDown,
} from "react-icons/bs";
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

function Body({ stockData, predictionData, onHistoryButtonClick }) {
  const { closePricesArray, datesArray } = stockData;
  const { score, pros, cons } = predictionData;

  const { userData } = useAuth();

  // Check if there is data
  const hasData =
    datesArray &&
    datesArray.length > 0 &&
    closePricesArray &&
    closePricesArray.length > 0;

  const data = hasData
    ? datesArray.map((date, index) => ({
        date: date,
        price: parseFloat(closePricesArray[index]),
      }))
    : [];

  const handleGetStockData = async (stockName) => {
    try {
      await onHistoryButtonClick(stockName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getScoreStyles = (score) => {
    if (score >= 85) {
      return {
        color: "green",
        background: "linear-gradient(-45deg, #e6e6e6, #a0daa9)",
      };
    }
    if (score >= 75 && score < 85) {
      return {
        color: "orange",
        background: "linear-gradient(-45deg, #e6e6e6, #f0b267)",
      };
    }
    if (score >= 65 && score < 75) {
      return {
        color: "orangeRed",
        background: "linear-gradient(-45deg, #e6e6e6, #f28567)",
      };
    }
    return {
      color: "red",
      background: "linear-gradient(-45deg, #e6e6e6, #f26767)",
    };
  };
  const scoreStyles = getScoreStyles(score);

  const tickMax = Math.max(closePricesArray);
  const tickMin = Math.min(closePricesArray);

  const customTicks = [];
  for (let i = tickMin; i <= tickMax; i += 1000) {
    customTicks.push(i);
  }

  return (
    <div>
      <main className="main-container">
        <div className="main-title">
          <h3>Stock Data</h3>
        </div>

        <div className="main-cards">
          {/* Other Cards */}
          <div className="card" style={{ background: scoreStyles.background }}>
            <div className="card-inner">
              <h3>Prediction Score</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <p
              className={`p-prediction-score`}
              style={{ color: scoreStyles.color }}
            >
              {score}
            </p>
          </div>

          <div className="card">
            <div className="card-inner">
              <h3>Pros</h3>
              <BsHandThumbsUp className="card_icon" color="green" />
            </div>
            <div className="pros-list">
              {pros.map((pro, index) => (
                <p key={index} className="pros-header">
                  {pro}
                </p>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-inner">
              <h3>Cons</h3>
              <BsHandThumbsDown className="card_icon" color="red" />
            </div>
            <div className="cons-list">
              {cons.map((con, index) => (
                <p key={index} className="cons-header">
                  {con}
                </p>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-inner">
              <h3>Recent Searches</h3>
              <BsSearch className="card_icon" />
            </div>
            <div className="card-content">
              {userData &&
              userData.searchedStocks &&
              userData.searchedStocks.length > 0 ? (
                <ul>
                  {[...userData.searchedStocks]
                    .slice(-50)
                    .reverse()
                    .map((stock, index) => (
                      <li
                        className="search-item"
                        key={index}
                        onClick={() => handleGetStockData(stock)}
                      >
                        {stock}
                      </li>
                    ))}
                </ul>
              ) : (
                <p>No recent searches</p>
              )}
            </div>
          </div>
        </div>

        <div className="charts">
          {hasData ? (
            <ResponsiveContainer width="100%" height="90%">
              <LineChart
                width={400}
                height={800}
                data={data}
                margin={{
                  top: 5,
                  right: 20,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="1 10" />
                <XAxis dataKey="date" />
                <YAxis domain={[tickMax, tickMin]} ticks={customTicks} />

                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Line
                  type="natural"
                  dataKey="price"
                  stroke="#3fbdb4"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available to display the chart.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Body;
