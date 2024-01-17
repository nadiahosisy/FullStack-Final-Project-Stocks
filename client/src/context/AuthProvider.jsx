import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AuthContext = createContext();
const API_LOGIN = `${BASE_URL}auth/login/`;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  console.log(userData);

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post(API_LOGIN, credentials);

      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  async function logout() {
    try {
      setUserData(null);
      setIsLoggedIn(false);
      window.localStorage.removeItem("userData");
      window.localStorage.removeItem("isLoggedIn");
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }

  const updateUserData = (newData) => {
    setUserData(newData);
    if (newData) {
      localStorage.setItem("userData", JSON.stringify(newData));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        updateUserData,
        logout,
        setUserData,
        setIsLoggedIn,
        isLoggedIn,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
