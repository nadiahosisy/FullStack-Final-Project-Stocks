import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home Page/Home";
import About from "./components/About Page/About";
import ProfilePage from "./components/Sidebar/ProfilePage";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/Auth/ProtectedRoute"; // Import the ProtectedRoute component
import "./App.css";
import AnimatedRoues from "./components/AnimatedRoues";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AnimatedRoues />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
