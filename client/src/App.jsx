import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home Page/Home";
import About from "./components/About Page/About";
import "./App.css";
// import MyStocks from "./components/MyStocks/MyStocks";
import Login from "./components/Auth/Login";
import StockInfoComponent from "./components/My Stocks/StockInfoComponent";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mystocks" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
