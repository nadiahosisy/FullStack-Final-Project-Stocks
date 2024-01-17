import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);
const API_YAHOO_STOCKS = `${BASE_URL}yahoo/`;
const API_STOCK_USER_HISTORY = `${BASE_URL}stockHistory/`;
const API_REGISTER = `${BASE_URL}auth/register/`;
const API_USERS = `${BASE_URL}users/`;
const API_PREDICTIONS = `${BASE_URL}prediction/`;
const API_PURCHASE = `${BASE_URL}purchase/`;
const API_SELLSTOCK = `${BASE_URL}sellStock/`;

const fetchStockData = async (stockSymbol) => {
  try {
    const response = await axios.get(`${API_YAHOO_STOCKS}${stockSymbol}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};
const fetchPredictedData = async (stockSymbol) => {
  try {
    const response = await axios.get(`${API_PREDICTIONS}${stockSymbol}`);

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
    console.log(stockSymbol, "Api");

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

const purchaseStocks = async (
  userId,
  stockName,
  lastPrice,
  newBalance,
  amountOfStocks
) => {
  try {
    const payload = {
      stockName,
      lastPrice,
      newBalance,
      amountOfStocks,
    };

    const purchaseEndpoint = `${API_PURCHASE}${userId}`;
    const response = await axios.put(purchaseEndpoint, payload);
    return response.data;
  } catch (error) {
    console.error("Error purchasng stock:", error);
    throw error;
  }
};
const sellStock = async (userId, newStocksArray, newBalance) => {
  try {
    const payload = {
      newStocksArray,
      newBalance,
    };

    const sellStockEndpoint = `${API_SELLSTOCK}${userId}`;
    const response = await axios.put(sellStockEndpoint, payload);
    return response.data;
  } catch (error) {
    console.error("Error selling stock:", error);
    throw error;
  }
};

export {
  fetchStockData,
  registerUser,
  sendStockDataUserHistory,
  updateUserData,
  fetchPredictedData,
  purchaseStocks,
  sellStock,
};
