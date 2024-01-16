import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home Page/Home";
import About from "./About Page/About";
import ProfilePage from "./Sidebar/ProfilePage";
import MyStockPages from "./Sidebar/MyStocksPage";
import Login from "./Auth/Login";
import Dashboard from "./Dashboard/Dashboard";
import ProtectedRoute from "./Auth/ProtectedRoute"; // Import the ProtectedRoute component
import "../App.css";

import { AnimatePresence } from "framer-motion";

function AnimatedRoues() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route
          path="/myDashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myDashboard/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myDashboard/myStocks"
          element={
            <ProtectedRoute>
              <MyStockPages />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myStock" element={<MyStockPages />} />
        {/* Add other routes as needed */}
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoues;
