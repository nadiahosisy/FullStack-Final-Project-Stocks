import { LineChart } from "@mui/x-charts/LineChart";
import PropTypes from "prop-types";

export const Charts = ({ stockSymbol, closePricesArray, datesArray }) => {
  // Convert string data to numbers if necessary
  const numericClosePricesArray = closePricesArray.map((price) =>
    parseFloat(price)
  );

  return (
    <LineChart
      width={1500}
      height={300}
      series={[
        {
          data: numericClosePricesArray,
          label: stockSymbol,
          area: true,
          showMark: false,
        },
      ]}
      xAxis={[{ scaleType: "point", data: datesArray }]}
      sx={{
        ".MuiLineElement-root": {
          display: "none",
        },
      }}
    />
  );
};

Charts.propTypes = {
  stockSymbol: PropTypes.string,
  closePricesArray: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  datesArray: PropTypes.arrayOf(PropTypes.string),
};
