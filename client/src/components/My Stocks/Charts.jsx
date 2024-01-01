import { LineChart } from "@mui/x-charts/LineChart";
import PropTypes from "prop-types";

export const Charts = ({ stockSymbol, closePricesArray, datesArray }) => {
  if (
    !closePricesArray ||
    !datesArray ||
    closePricesArray.length !== datesArray.length
  ) {
    return <div>No data available or data is invalid</div>;
  }

  const numericClosePricesArray = closePricesArray.map((price) => {
    const number = parseFloat(price);
    return isNaN(number) ? 0 : number; // Fallback to 0 if not a number
  });

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
