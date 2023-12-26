import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home Page/Home";
import About from "./components/About Page/About";
// import MyStocks from "./components/MyStocks/MyStocks";
import Login from "./components/Login page/Login";
import StockInfoComponent from "./components/My Stocks/StockInfoComponent";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mystocks" element={<StockInfoComponent />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
