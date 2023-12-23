import yahooFinance from "yahoo-finance2";

const query = "AAPL";
const queryOptions = { period1: "2021-05-08", peroid2: "2021-05-08" };
const result = await yahooFinance.chart(query, queryOptions);
