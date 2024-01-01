import axios from "axios";

const API_YAHOO_STOCKS = "http://localhost:5000/api/v1/yahoo/";
const API_LOGIN = "http://localhost:5000/api/v1/auth/login/";
const API_REGISTER = "http://localhost:5000/api/v1/auth/register/";

const fetchStockData = async (stockSymbol) => {
  try {
    const response = await axios.get(`${API_YAHOO_STOCKS}${stockSymbol}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(API_LOGIN, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const registerUser = async (credentials) => {
  try {
    const response = await axios.post(API_REGISTER, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export { fetchStockData, loginUser, registerUser };
