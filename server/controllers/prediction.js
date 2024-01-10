import asyncHandler from "../middleware/async.js";
import axios from "axios";

const url = "https://cooperative-gabardine-bass.cyclic.app/analyzeStock";

// @desc      Make Prediction
// @route     GET /api/v1/predictio
// @access    Private
export const makePrediction = asyncHandler(async (req, res, next) => {
  const stockName = req.params.stockName;

  const systemMessage = `
  You are an AI expert in stock analysis. Analyze the current financial data to rate the stock on a scale from 1 to 100, where 1 indicates a potential decrease in price, and 100 indicates a potential increase. 
  
  Your response should:
  - Provide the prediction score, example : (number out of number)
  - Clearly list the top 3 pros (advantages) and top 3 cons (disadvantages) that influenced your rating.
  - Provide a concise, one-sentence explanation of your overall reasoning.
  `;

  const modelConfig = {
    max_new_tokens: 30000,
    temperature: 0.7,
    top_k: 50,
    top_p: 0.7,
    repetition_penalty: 1.2,
    batch_size: 100,
  };

  console.log(stockName);
  try {
    const response = await axios.post(url, {
      stockName,
      systemMessage,
      modelConfig,
    });

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
