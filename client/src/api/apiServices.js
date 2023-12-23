import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1/yahoo/";

const fetchStockData = async (stockSymbol) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${stockSymbol}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

export default {
  fetchStockData,
};
