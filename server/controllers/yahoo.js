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

    const queryOptions = {
      period1: yearAndHalfAgo,
      period2: new Date().toISOString().split("T")[0],
    };
    const resultFromYahoo = await yahooFinance.chart(stockName, queryOptions);
    console.log(resultFromYahoo);

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
