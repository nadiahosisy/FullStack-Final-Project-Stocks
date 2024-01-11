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
  "Please analyze Stock and provide a structured response outlining the top three pros and cons.

  List the pros as:
  Pros:
  1: [Brief Description]
  2: [Brief Description]
  3: [Brief Description]

  List the cons as:
  Cons: 
  1: [Brief Description]
  2: [Brief Description]
  3: [Brief Description]
  Your detailed analysis is appreciated for a balanced understanding of Stock Market."
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
