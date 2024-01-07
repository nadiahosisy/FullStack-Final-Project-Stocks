import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  console.log(userData);
  async function logout() {
    try {
      setUserData(null);
      setIsLoggedIn(false);
      window.localStorage.removeItem("userData");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
