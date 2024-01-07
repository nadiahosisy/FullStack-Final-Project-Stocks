import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider"; // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
