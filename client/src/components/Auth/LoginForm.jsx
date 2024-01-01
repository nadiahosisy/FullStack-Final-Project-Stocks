import React, { useState } from "react";
import { loginUser } from "../../api/apiServices";

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            id="login-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <button onClick={onToggle}>Register</button>
      </p>
    </div>
  );
};

export default LoginForm;
