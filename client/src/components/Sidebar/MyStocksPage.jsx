import { React, useMemo, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthProvider";
import { Button } from "@mui/material";

const MyStocksPage = () => {
  const { userData } = useAuth();
  const containerRef = useRef();
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

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
    const baseSize = 200; // Minimum size for the bubble
    const maxSize = 400; // Maximum size for the bubble
    const value = price * amount;
    const normalized = (value - minVal) / (maxVal - minVal); // Normalize value between 0 and 1
    const size = normalized * (maxSize - baseSize) + baseSize;
    return size;
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []); // Empty dependency array ensures this runs once after initial render

  return (
    <motion.div
      className="grid-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.01 } }}
    >
      <Sidebar />
      <div className="mystocks-main-div">
        {userData.purchasedStocks.map((stock, index) => {
          const size = calculateBubbleSize(
            stock.lastPrice,
            stock.amountOfStocks
          );
          const position = getRandomPosition(size);
          return (
            <div
              key={index}
              className="stock-bubble"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                position: "sticky",
                top: position.top,
                left: position.left,
              }}
            >
              <p>Stock Name: {stock.stockName}</p>
              <p>Stock Purchase Price: ${stock.lastPrice}</p>
              <p>Purchased Amount: {stock.amountOfStocks}</p>
              <Button
                style={{ width: "50%", background: "rgb(63, 189, 180)" }}
                variant="contained"
              >
                Sell
              </Button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MyStocksPage;
