import asyncHandler from "../middleware/async.js";
import User from "../models/User.js";
import yahooFinance from "yahoo-finance2";
// @desc      Sell stock
// @route     PUT /api/v1/sellStock
// @access    Private
export const sellStock = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const newStockArray = req.body.newStocksArray;
  const newBalance = req.body.newBalance;

  console.log(newStockArray);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse(`No user with the id of ${userId}`, 404));
    }

    user.purchasedStocks = newStockArray;
    user.balance = newBalance;
    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});
// @desc      Get Stocks Array
// @route     PUT /api/v1/sellStock
// @access    Private
export const getUserLatestStockPrices = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse(`No user with the id of ${userId}`, 404));
    }

    const userStocks = user.purchasedStocks;
    const stocksWithLatestPrices = await Promise.all(
      userStocks.map(async (stock) => {
        const latestPrice = await fetchCurrentStockPrice(stock.stockName);
        return {
          stockName: stock.stockName,
          lastUpdatedPrice: latestPrice,
        };
      })
    );

    console.log(stocksWithLatestPrices);
    res.status(200).json({
      success: true,
      data: stocksWithLatestPrices,
    });
  } catch (error) {
    next(error);
  }
});

// Function to fetch the latest stock price from Yahoo Finance
async function fetchCurrentStockPrice(stockName) {
  try {
    const result = await yahooFinance.quote(stockName);
    const currentPrice = result.regularMarketPrice.toFixed(2); // Get the current market price
    return currentPrice;
  } catch (error) {
    console.error(`Error fetching current price for ${stockName}:`, error);
    throw error; // rethrow the error
  }
}
