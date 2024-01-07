import axios from "axios";

const API_YAHOO_STOCKS = "http://localhost:5000/api/v1/yahoo/";
const API_STOCK_USER_HISTORY = "http://localhost:5000/api/v1/stockHistory/";
const API_LOGIN = "http://localhost:5000/api/v1/auth/login/";
const API_REGISTER = "http://localhost:5000/api/v1/auth/register/";
const API_USERS = "http://localhost:5000/api/v1/users/";

const fetchStockData = async (stockSymbol) => {
  try {
    const response = await axios.get(`${API_YAHOO_STOCKS}${stockSymbol}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};
const fetchHistorykData = async (userId) => {
  try {
    const response = await axios.get(`${API_YAHOO_STOCKS}${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};
const sendStockDataUserHistory = async (stockSymbol, userId) => {
  try {
    const payload = {
      stockSymbol: stockSymbol,
    };

    const response = await axios.put(
      `${API_STOCK_USER_HISTORY}${userId}`,
      payload
    );

    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error updating stock data user history:", error);
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
    console.error("Error registering user :", error);
    throw error;
  }
};
const updateUserData = async (userId, data) => {
  try {
    const payload = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      bio: data.bio,
    };
    console.log(payload);
    const response = await axios.put(`${API_USERS}${userId}`, payload);

    return response.data;
  } catch (error) {
    console.error("Error editing user :", error);
    throw error;
  }
};

export {
  fetchStockData,
  loginUser,
  registerUser,
  sendStockDataUserHistory,
  updateUserData,
};
