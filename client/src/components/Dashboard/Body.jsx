import { React, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { sendStockDataUserHistory } from "../../api/apiServices";
import Spinner from "../spinner/Spinner";
import buyVideo from "../../assets/Icons/buy.png";
import BalanceModal from "../Modal/Balance-Modal";
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

function Body({
  stockData,
  predictionData,
  onHistoryButtonClick,
  isLoading,
  currentStockName,
}) {
  const { closePricesArray, datesArray } = stockData;
  const { score, pros, cons } = predictionData;
  const { userData, updateUserData } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const userBalance = userData ? userData.balance : 0;

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

  // Take the last price in the array of the prices
  const lastPrice = data.length > 0 ? data[data.length - 1].price : null;

  const handleGetStockData = async (stockName) => {
    try {
      await onHistoryButtonClick(stockName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "green";
    if (score >= 85 && score < 90) return "yellow";
    if (score >= 75 && score < 85) return "orange";
    if (score >= 65 && score < 75) return "orangeRed";
    if (score >= 1 && score < 65) {
      return "red";
    } else {
      return "white";
    }
  };

  // Calculate the min value for graph and max value
  const tickMax = Math.max(closePricesArray);
  const tickMin = Math.min(closePricesArray);

  const customTicks = [];
  for (let i = tickMin; i <= tickMax; i += 1000) {
    customTicks.push(i);
  }
  const handleDeleteHistory = async () => {
    const deletHistResp = await sendStockDataUserHistory(
      "delete",
      userData._id
    );
    updateUserData(deletHistResp.data);
    console.log(deletHistResp);
  };

  const handleBuyClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleBuyAction = () => {
    console.log("Buy logic executed");
  };

  return (
    <div>
      <main className="main-container">
        <div className="main-title">
          <h3>Stock Data</h3>
          <div className="stock-name-main-div">
            {currentStockName ? (
              <div className="stock-name-center">
                <h3>{currentStockName}</h3>
                {userData.role === "Investor" && (
                  <button className="buy-button" onClick={handleBuyClick}>
                    <img src={buyVideo} alt="Buy" className="buy-icon" />
                  </button>
                )}
              </div>
            ) : (
              <div className="stock-name-div">
                <h3 className="header-selected">No Stock Selected...</h3>
              </div>
            )}
          </div>
        </div>

        <div className="main-cards">
          <div className={`card ${getScoreColor(score)}`}>
            {isLoading ? (
              <Spinner />
            ) : (
              <div>
                <div className="card-inner">
                  <h3>Prediction Score</h3>
                  <BsFillArchiveFill className="card_icon" />
                </div>
                <div className="card-inner-div-p-score">
                  <p className={`p-prediction-score ${getScoreColor(score)}`}>
                    {score}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="card">
            {isLoading ? (
              <Spinner />
            ) : (
              <div>
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
            )}
          </div>

          <div className="card">
            {isLoading ? (
              <Spinner />
            ) : (
              <div>
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
            )}
          </div>

          <div className="card">
            <div className="card-inner-div">
              <div className="card-inner-first">
                <h3>Recent Searches</h3>
                <BsSearch className="card_icon" />
              </div>
              <div className="main-div-btn-clear">
                <button className="clear-btn" onClick={handleDeleteHistory}>
                  <span className="clear-btn-span">Clear</span>
                </button>
              </div>
            </div>

            <div className="card-content">
              {userData &&
              userData.searchedStocks &&
              userData.searchedStocks.length > 0 ? (
                <ul>
                  {[...userData.searchedStocks]
                    .slice(-15)
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
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="1 10" />
                <XAxis
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  tick={{ fill: "#3fbdb4" }}
                />
                <YAxis
                  domain={[tickMax, tickMin]}
                  ticks={customTicks}
                  tick={{ fill: "gold" }}
                  tickFormatter={(value) => `$${value}`}
                />
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
        <BalanceModal
          show={isModalVisible}
          message={modalContent}
          onClose={handleCloseModal}
          onBuy={handleBuyAction}
          stockName={currentStockName}
          balance={userBalance}
          lastPrice={lastPrice}
        />
      </main>
    </div>
  );
}

export default Body;
