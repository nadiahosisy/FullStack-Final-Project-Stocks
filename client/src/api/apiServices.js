import axios from "axios";

const API_YAHOO_STOCKS = "http://localhost:5000/api/v1/yahoo/";
const API_STOCK_USER_HISTORY = "http://localhost:5000/api/v1/stockHistory/";
const API_REGISTER = "http://localhost:5000/api/v1/auth/register/";
const API_USERS = "http://localhost:5000/api/v1/users/";
const API_PREDICTIONS = "http://localhost:5000/api/v1/prediction/";
const API_PURCHASE = "http://localhost:5000/api/v1/purchase/";

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

const purchaseStocks = async (userId, stockSymbol, quantity, totalCost) => {
  try {
    const payload = {
      userId,
      stockSymbol,
      quantity,
      totalCost,
    };

    const purchaseEndpoint = `${API_PURCHASE}`;
    const response = await axios.post(purchaseEndpoint, payload);

    if (response.data.success) {
      return response.data.updatedBalance;
    } else {
      throw new Error(response.data.message || "Purchase failed");
    }
  } catch (error) {
    console.error("Error during stock purchase:", error);
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
};
