import yahooFinance from "yahoo-finance2";
//import { stockInfo } from "./openai.js";
export const getStockCharts = async (req, res) => {
  try {
    const stockName = req.params.yahooStock;

    const currentDate = new Date();
    const eightMonthsAgo = new Date(
      currentDate.setMonth(currentDate.getMonth() - 8)
    )
      .toISOString()
      .split("T")[0];

    const queryOptions = {
      period1: eightMonthsAgo,
      period2: new Date().toISOString().split("T")[0],
    };
    const resultFromYahoo = await yahooFinance.chart(stockName, queryOptions);

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
    //const stockInfoData = await stockInfo(stockName);
    const tmpInfoData =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    const predictedContent = "My prediction is to buy this ";

    console.log(closePricesArray);

    res.json({ closePricesArray, datesArray, tmpInfoData, predictedContent });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

function formatDateHelperFunction(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0].slice(2);
}
