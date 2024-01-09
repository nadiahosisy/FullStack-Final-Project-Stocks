import asyncHandler from "../middleware/async.js";
import axios from "axios";

const url = "https://cooperative-gabardine-bass.cyclic.app/analyzeStockNews";

// @desc      Make Prediction
// @route     GET /api/v1/predictio
// @access    Private
export const makePrediction = asyncHandler(async (req, res, next) => {
  const stockName = req.params.stockName;

  console.log(stockName);
  try {
    const response = await axios.post(url, { stockName });

    const score = response.data.predictionScore;
    const pros = response.data.pros;
    const cons = response.data.cons;
    const overall = response.data.overall;

    res.status(200).json({
      success: true,
      score: score,
      pros: pros,
      cons: cons,
      overall: overall,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
