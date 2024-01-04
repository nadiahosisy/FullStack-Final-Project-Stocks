import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home Page/Home";
import About from "./components/About Page/About";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthProvider } from "./context/AuthProvider"; // Import AuthProvider
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mystocks" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            {/* Add other routes as needed */}
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
