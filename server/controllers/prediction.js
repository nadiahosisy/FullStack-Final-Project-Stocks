import asyncHandler from "../middleware/async.js";
import axios from "axios";

const url = "https://cooperative-gabardine-bass.cyclic.app/analyzeStock";

// @desc      Make Prediction
// @route     GET /api/v1/predictio
// @access    Private
export const makePrediction = asyncHandler(async (req, res, next) => {
  const stockName = req.params.stockName;

  const systemMessage =
    "You are stock AI Expert, analyze the info about the stock, try to predict if to buy or not to buy by giving sore (number out of number) from 1 to 100, give 3 pros and 3 cons";

  const modelConfig = {
    max_new_tokens: 20000,
    temperature: 0.7,
    top_k: 50,
    top_p: 0.7,
    repetition_penalty: 1.2,
    batch_size: 50,
  };

  console.log(stockName);
  try {
    const response = await axios.post(url, {
      stockName,
      systemMessage,
      modelConfig,
    });

    //Extract the desired information from the AI response

    const outputText = response.data.aiResponse.output;

    console.log(outputText);

    const scoreRegex = /(\d+) out of 100/;
    const scoreMatch = outputText.match(scoreRegex);
    const predictionScore = scoreMatch ? scoreMatch[1] : "Not found";

    console.log(scoreMatch);

    if (scoreRegex == null) {
      scoreRegex = /(\d+)\//;
      scoreMatch = outputText.match(scoreRegex);
      predictionScore = scoreMatch ? scoreMatch[1] : "Not found";
    }

    // Extract Pros
    const prosStart = outputText.indexOf("Pros:\n");
    const consStart = outputText.indexOf("Cons:\n");

    const prosText = outputText
      .substring(
        prosStart + 5,
        consStart || outputText.indexOf(outputText.length - 1)
      )
      .trim();
    const pros = prosText
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line.startsWith("1.") ||
          line.startsWith("*") ||
          parseInt(line.split(".")[0])
      );

    // Extract Cons and Overall
    const overallStart = outputText.indexOf("Overall,");
    const consText = outputText.substring(consStart + 5).trim();
    const cons = consText
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line.startsWith("1.") ||
          line.startsWith("*") ||
          parseInt(line.split(".")[0])
      );

    const overallText = outputText
      .substring(overallStart)
      .split(/[\n:]/)[0]
      .trim();

    res.status(200).json({
      success: true,
      score: predictionScore,
      pros: pros,
      cons: cons,
      overall: overallText,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
