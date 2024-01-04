import React from "react";
import Image from "../../../public/Images/stoc-vector-2.jpg";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login"); // Assuming '/login' is the path to your login page
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <div className="image-container">
          <img src={Image} alt="Stock Prediction" />
        </div>
        <div className="text-container">
          <h1 className="header-home-page">
            Welcome To <span className="highlight">Stock World</span>
          </h1>
          <p className="pargraph-home-page">
            Embark on a journey of financial insight with{" "}
            <strong>Stock World</strong>, your premier destination for stock
            market forecasting. Our cutting-edge application leverages advanced
            algorithms and market analysis to provide you with reliable stock
            predictions, helping you make informed investment decisions. Whether
            you're a seasoned investor or new to the stock market, our
            user-friendly platform guides you through the complexities of stock
            trading. Explore market trends, receive personalized stock
            recommendations, and stay ahead of the curve in the ever-changing
            world of finance. Join <strong>Stock World</strong> today and
            transform the way you approach stock market investing. Let us be
            your ally in navigating the exciting world of stock market
            predictions.
          </p>
          <div className="main-div-button-home">
            <button
              className="login-button-home"
              type="button"
              onClick={navigateToLogin}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
