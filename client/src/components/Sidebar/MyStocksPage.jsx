import { React, useMemo, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthProvider";
import { Button } from "@mui/material";
import { sellStock, getUserLatestStockPrices } from "../../api/apiServices";
import Spinner from "../spinner/Spinner";

const MyStocksPage = () => {
  const { userData, updateUserData } = useAuth();
  const containerRef = useRef();
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);
  const [currentStockPriceArray, setCurrentStockPriceArray] = useState([]);

  const { minVal, maxVal } = useMemo(() => {
    const values = userData.purchasedStocks.map(
      (stock) => stock.lastPrice * stock.amountOfStocks
    );
    return {
      minVal: Math.min(...values),
      maxVal: Math.max(...values),
    };
  }, [userData.purchasedStocks]);

  // Function to calculate random position
  const getRandomPosition = (elementSize) => {
    const x = Math.random() * (containerSize.width - elementSize);
    const y = Math.random() * (containerSize.height - elementSize);
    return { top: `${y}px`, left: `${x}px` };
  };

  // Function to calculate bubble size
  const calculateBubbleSize = (price, amount) => {
    const baseSize = 380;
    const maxSize = 550;
    const value = price * amount;
    const normalized = (value - minVal) / (maxVal - minVal);
    const size = normalized * (maxSize - baseSize) + baseSize;
    return size;
  };

  const handleSellStock = async (stockId, total) => {
    const updatedStocks = userData.purchasedStocks.filter(
      (stock) => stock._id !== stockId
    );

    const newBalance = (
      parseFloat(userData.balance) + parseFloat(total)
    ).toFixed(2);
    const response = await sellStock(userData._id, updatedStocks, newBalance);
    const updatedUserData = response.data;

    updateUserData(updatedUserData);
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  const fetchUserStocks = async () => {
    try {
      setLoading(true); // Start loading
      const response = await getUserLatestStockPrices(userData._id);
      setCurrentStockPriceArray(response.data);
      console.log(currentStockPriceArray);
      setLoading(false); // Data fetched, stop loading
    } catch (error) {
      console.error("Error fetching user stocks:", error);
      setLoading(false); // Stop loading in case of error
    }
  };

  useEffect(() => {
    fetchUserStocks(currentStockPriceArray);
  }, []);

  useEffect(() => {
    console.log(currentStockPriceArray);
  }, [currentStockPriceArray]);

  return (
    <motion.div
      className="grid-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.01 } }}
    >
      <Sidebar />
      {loading ? (
        <Spinner />
      ) : (
        <div className="mystocks-main-div">
          <div
            className="111"
            style={{
              width: "50px",
              height: "50px",
              top: "5px",
              left: "10px",
              position: "sticky",
            }}
          ></div>
          {userData.purchasedStocks.map((stock, index) => {
            const size = calculateBubbleSize(
              stock.lastPrice,
              stock.amountOfStocks
            );
            const position = getRandomPosition(size);
            const currentStockInfo = currentStockPriceArray.find(
              (item) => item.stockName === stock.stockName
            );
            const currentPrice = currentStockInfo
              ? parseFloat(currentStockInfo.lastUpdatedPrice)
              : null;
            const lastTotal = parseFloat(
              (stock.amountOfStocks * stock.lastPrice).toFixed(2)
            );
            const newTotal = currentPrice
              ? parseFloat((stock.amountOfStocks * currentPrice).toFixed(2))
              : null;

            return (
              <div
                key={index}
                className="stock-bubble"
                style={{
                  width: `${size}px`,
                  height: `${size}px `,
                  position: "sticky",
                  top: position.top,
                  left: position.left,
                }}
              >
                <div className="stocks-purchased-data-div">
                  <p className="paragraph-my-stocks-page">
                    Stock Name:{" "}
                    <span style={{ fontWeight: "bolder" }}>
                      {stock.stockName}
                    </span>
                  </p>
                  <p className="stock-purchase-my-stocks-page">
                    Stock Purchase Price:{" "}
                    <span style={{ fontWeight: "bolder", color: "blue" }}>
                      ${stock.lastPrice}
                    </span>
                  </p>
                  <p className="purchased-amount-my-stocks-page">
                    Purchased Amount:{" "}
                    <span style={{ fontWeight: "bolder", color: "blue" }}>
                      {stock.amountOfStocks}
                    </span>
                  </p>
                  <p className="purchased-amount-my-stocks-page">
                    Total:{" "}
                    <span style={{ fontWeight: "bolder", color: "blue" }}>
                      ${(stock.amountOfStocks * stock.lastPrice).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="stocks-new-data-div">
                  <p className="stock-current-price-my-stocks-page">
                    Current Price:{" "}
                    <span
                      style={{
                        fontWeight: "bolder",
                        color:
                          currentPrice === stock.lastPrice
                            ? "black"
                            : currentPrice > stock.lastPrice
                            ? "green"
                            : "red",
                      }}
                    >
                      ${currentPrice !== null ? currentPrice.toFixed(2) : "N/A"}
                    </span>
                  </p>
                  <p className="stock-current-total-my-stocks-page">
                    New Total Price:{" "}
                    <span
                      style={{
                        fontWeight: "bolder",
                        color:
                          newTotal === lastTotal
                            ? "black"
                            : newTotal > lastTotal
                            ? "green"
                            : "red",
                      }}
                    >
                      ${newTotal !== null ? newTotal.toFixed(2) : "N/A"}
                    </span>
                  </p>
                </div>

                <Button
                  style={{ marginTop: "3px" }}
                  variant="contained"
                  onClick={() =>
                    handleSellStock(
                      stock._id,
                      (stock.amountOfStocks * currentPrice).toFixed(2)
                    )
                  }
                >
                  Sell
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default MyStocksPage;
