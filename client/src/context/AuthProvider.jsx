import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  async function logout() {
    try {
      setUserData(null);
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
    } else {
      localStorage.removeItem("userData");
    }
  };

  return (
    <AuthContext.Provider value={{ userData, updateUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
