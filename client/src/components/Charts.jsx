import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import apiServices from "../api/apiServices";

// eslint-disable-next-line react/prop-types
export const Charts = ({ stockSymbol }) => {
  const [chartData, setChartData] = useState({
    closePricesArray: [],
    datesArray: [],
  });

  useEffect(() => {
    if (!stockSymbol) {
      return; // Exit early if no stock symbol is provided
    }

    const fetchData = async () => {
      try {
        const data = await apiServices.fetchStockData(stockSymbol);
        if (data && data.closePricesArray && data.datesArray) {
          setChartData({
            closePricesArray: data.closePricesArray,
            datesArray: data.datesArray,
          });
        }
      } catch (error) {
        console.error("Error in component:", error);
      }
    };

    fetchData();
  }, [stockSymbol]);

  return (
    <LineChart
      width={1500}
      height={300}
      series={[
        {
          data: chartData.closePricesArray,
          label: stockSymbol,
          area: true,
          showMark: false,
        },
      ]}
      xAxis={[{ scaleType: "point", data: chartData.datesArray }]}
      sx={{
        ".MuiLineElement-root": {
          display: "none",
        },
      }}
    />
  );
};
