import getOpenAiInstance from "../config/openai.js";

export const getStockNews = async (req, res) => {
  const stockName = req.params.stockName;
  const openai = getOpenAiInstance(); // Use the stock name from the URL parameter

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Replace with the appropriate model
      //   prompt: `Give me latest news about this stock : ${stockName}`,
      max_tokens: 150,
      messages: [
        {
          role: "system",
          content:
            "You are Google stocks expert, you know everything about stock market",
        },
        {
          role: "user",
          content: `Give me latest news about this stock : ${stockName}`,
        },
      ],
    });

    res.json({ news: response.choices[0] });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const predictPrices = async (stockName, priceArray, dateArray) => {
  const openai = getOpenAiInstance();

  // Formulating a prompt for regression analysis
  const prompt = `Given the following data of stock prices and dates for ${stockName}, perform a linear regression analysis and predict the next 5 values. Dates: ${dateArray.join(
    ", "
  )}. Prices: ${priceArray.join(", ")}.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      max_tokens: 150,
      messages: [
        {
          role: "system",
          content: "You are a data analyst skilled in regression analysis.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Return the predicted values or the full response
    return response.choices[0].message.content;
  } catch (error) {
    throw new Error(error.message);
  }
};

//
