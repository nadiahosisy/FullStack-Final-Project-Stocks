import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";

export const Charts = () => {
  const [chartData, setChartData] = useState({
    closePricesArray: [],
    datesArray: [],
  });

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/yahoo/CAMT"
        );

        console.log(response);
        // Assuming the response structure is { uData: [...], xLabels: [...] }
        if (
          response.data &&
          response.data.closePricesArray &&
          response.data.datesArray
        ) {
          setChartData({
            closePricesArray: response.data.closePricesArray,
            datesArray: response.data.datesArray,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <LineChart
      width={1500}
      height={300}
      series={[
        {
          data: chartData.closePricesArray,
          label: "uv",
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
