import { LineChart } from "@mui/x-charts/LineChart";
import PropTypes from "prop-types";

const MyStocks = ({ stockSymbol, closePricesArray, datesArray }) => {
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

MyStocks.propTypes = {
  stockSymbol: PropTypes.string,
  closePricesArray: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  datesArray: PropTypes.arrayOf(PropTypes.string),
};

export default MyStocks;
