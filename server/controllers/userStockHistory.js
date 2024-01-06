import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";

// @desc      UPDATE User StockHistory
// @route     PUT /api/v1/stockHistory/:id
// @access    Public
export const updateUserStockHistory = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const stockData = req.body.stockSymbol; // Assuming stock data is sent in request body

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse(`No user with the id of ${userId}`, 404));
    }

    user.searchedStocks.push(stockData);
    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// @desc      GET User StockHistory
// @route     GET /api/v1/stockHistory/:id
// @access    Public
export const getUserStockHistory = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(
        new ErrorResponse(`No user found with the id of ${userId}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: user.searchedStocks,
    });
  } catch (error) {
    next(error);
  }
});
