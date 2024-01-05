import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";

// @desc      UPDATE User StockHistory
// @route     PUT /api/v1/updateHistory/:id
// @access    Public

export const updateUserStockHistory = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const stockData = req.body.stockSymbol; // Assuming stock data is sent in request body

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse(`No user with the id of ${userId}`, 404));
    }

    // Update the user's stockHistory
    user.searchedStocks.push(stockData);
    await user.save();

    res.status(200).json({
      success: true,
      data: user.searchedStocks,
    });
  } catch (error) {
    next(error);
  }
});
