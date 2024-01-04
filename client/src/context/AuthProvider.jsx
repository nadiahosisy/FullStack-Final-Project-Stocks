import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const updateUserData = (newData) => {
    setUserData(newData);
    console.log(newData, "its mt context");
    console.log(userData);
  };

  return (
    <AuthContext.Provider value={{ userData, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
