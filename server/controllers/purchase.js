import asyncHandler from "../middleware/async.js";
import User from "../models/User.js";

// @desc      Purchase stock
// @route     PUT /api/v1/purchase
// @access    Private
export const purchaseStock = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const stockName = req.body.stockName;
  const balance = req.body.newBalance;
  const lastPrice = req.body.lastPrice;
  const amountOfStocks = req.body.amountOfStocks;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse(`No user with the id of ${userId}`, 404));
    }

    user.purchasedStocks.push({
      stockName: stockName,
      lastPrice: lastPrice,
      amountOfStocks: amountOfStocks,
    });
    user.balance = balance;
    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});
