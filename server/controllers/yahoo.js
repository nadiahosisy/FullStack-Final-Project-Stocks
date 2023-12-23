import yahooFinance from "yahoo-finance2";
export const getStockCharts = async (req, res) => {
  try {
    const query = "CAMT";
    const queryOptions = { period1: "2021-05-08", period2: "2023-12-22" };
    const result = await yahooFinance.chart(query, queryOptions);

    res.json({ result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
