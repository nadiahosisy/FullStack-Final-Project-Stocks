import yahooFinance from "yahoo-finance2";
//import { stockInfo } from "./openai.js";
export const getStockCharts = async (req, res) => {
  try {
    const stockName = req.params.yahooStock;

    const currentDate = new Date();
    const yearAndHalfAgo = new Date(
      currentDate.setMonth(currentDate.getMonth() - 15)
    )
      .toISOString()
      .split("T")[0];

    // Add one day to the current date for period2 to include today's data
    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);

    const queryOptions = {
      period1: yearAndHalfAgo,
      period2: tomorrowDate.toISOString().split("T")[0], // adjusted to include today
      interval: "1d",
    };
    const resultFromYahoo = await yahooFinance.chart(stockName, queryOptions);

    const closePricesArray = [];
    const datesArray = [];

    resultFromYahoo.quotes.forEach((quote) => {
      //Extract close prices
      const formattedClosePrice = quote.close.toFixed(2);
      closePricesArray.push(formattedClosePrice);

      // Extract and format the date
      const formattedDate = formatDateHelperFunction(quote.date);
      datesArray.push(formattedDate);
    });

    res.json({
      closePricesArray,
      datesArray,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

function formatDateHelperFunction(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0].slice(2);
}
