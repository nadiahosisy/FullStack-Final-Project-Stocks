import { useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import { Charts } from "./Charts"; // Adjust the import path as needed
import { Stack } from "@mui/material";

export const StockDataViewer = () => {
  const [inputValue, setInputValue] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setStockSymbol(inputValue);
  };

  return (
    <Stack width={150}>
      <Input
        placeholder="Enter Stock Symbol…"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button variant="contained" onClick={handleButtonClick}>
        Load Chart
      </Button>
      {stockSymbol && <Charts stockSymbol={stockSymbol} />}
    </Stack>
  );
};
