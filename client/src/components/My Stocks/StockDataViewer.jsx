import { useState, useEffect } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { Charts } from "./Charts";
import StockContent from "./StockContent";
import StockPredictionContent from "./StockPredictionContent";

import apiServices from "../../api/apiServices";

export const StockDataViewer = () => {
  const [inputValue, setInputValue] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [chartData, setChartData] = useState({
    closePricesArray: [],
    datesArray: [],
    stockInfo: "",
    predictedContent: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (stockSymbol) {
        try {
          const data = await apiServices.fetchStockData(stockSymbol);
          if (data) {
            setChartData({
              closePricesArray: data.closePricesArray || [],
              datesArray: data.datesArray || [],
              stockInfo: data.tmpInfoData || "",
              predictedContent: data.predictedData || "",
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [stockSymbol]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setStockSymbol(inputValue);
  };

  return (
    <>
      <Stack spacing={2}>
        <Input
          placeholder="Enter Stock Symbol…"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleButtonClick}>
          Load Data
        </Button>
        {stockSymbol && (
          <>
            <Charts
              closePricesArray={chartData.closePricesArray}
              datesArray={chartData.datesArray}
            />
            <StockContent content={chartData.stockInfo} />
            <StockPredictionContent content={chartData.predictedContent} />
          </>
        )}
      </Stack>
    </>
  );
};
