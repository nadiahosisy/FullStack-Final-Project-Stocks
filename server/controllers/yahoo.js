import yahooFinance from "yahoo-finance2";
import { stockInfo } from "./openai.js";
export const getStockCharts = async (req, res) => {
  try {
    const query = req.params.yahooStock;
    const queryOptions = { period1: "2021-05-08", period2: "2023-12-22" };
    const resultFromYahoo = await yahooFinance.chart(query, queryOptions);

    const closePricesArray = [];
    const datesArray = [];

    resultFromYahoo.quotes.forEach((quote) => {
      //Extract close prices
      const formattedClosePrice = quote.close.toFixed(3);
      closePricesArray.push(formattedClosePrice);

      // Extract and format the date
      const formattedDate = formatDateHelperFunction(quote.date);
      datesArray.push(formattedDate);
    });

    //const predicted = await predictPrices(query, closePricesArray, datesArray);
    const stockInfoData = await stockInfo(query);
    res.json({ closePricesArray, datesArray, stockInfoData });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

function formatDateHelperFunction(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0].slice(2);
}
