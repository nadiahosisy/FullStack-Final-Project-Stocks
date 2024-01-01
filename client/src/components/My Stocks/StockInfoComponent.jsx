import { useState } from "react";
import Header from "../Dashboard/Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Body from "../Dashboard/Body";
import Dashboard from "../Dashboard/Dashboard";
// import apiServices from "../../api/apiServices";

const StocksPage = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [chartData, setChartData] = useState({
    closePricesArray: [],
    datesArray: [],
    stockInfo: "",
    predictedContent: "",
  });

  // ... Existing useEffect for fetchData

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setStockSymbol(inputValue);
  };

  return <></>;
};

export default StocksPage;
