import React, { useState } from "react";
import { loginUser } from "../../api/apiServices";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { size } from "@floating-ui/core";

const LoginForm = ({ onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log("Login successful:", response);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-form-container">
      <ShowChartRoundedIcon
        style={{ color: "rgb(102, 59, 181)", fontSize: 30, marginLeft: "5px" }}
      />{" "}
      {/* Flex container */}
      <div>
        <h2 className="main-div-header">Sign in</h2>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="main-div-label">
          <label htmlFor="login-email">Email address:</label>
        </div>
        <input
          className="input-email-address"
          type="email"
          id="login-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="main-div-password">
          <label htmlFor="login-password">Password:</label>
        </div>
        <input
          className="input-login-password"
          type="password"
          id="login-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      <p className="register-pargraph">Don't have an account? </p>
      <button className="login-register-button" onClick={onToggle}>
        Register
      </button>
    </div>
  );
};

export default LoginForm;
