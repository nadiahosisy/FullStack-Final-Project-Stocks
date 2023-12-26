import { useState, useEffect } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { Charts } from "./Charts"; // Adjust the import path as needed
import StockContent from "./StockContent"; // Import the StockContent component
import apiServices from "../../api/apiServices"; // Adjust the import path as needed

export const StockDataViewer = () => {
  const [inputValue, setInputValue] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [chartData, setChartData] = useState({
    closePricesArray: [],
    datesArray: [],
    content: "",
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
              content: data.stockInfoData || "", // Assuming 'content' is part of your API response
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
          <StockContent content={chartData.content} />
        </>
      )}
    </Stack>
  );
};
