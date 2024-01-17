import asyncHandler from "../middleware/async.js";
import User from "../models/User.js";

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
