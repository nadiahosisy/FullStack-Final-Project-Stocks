import React, { useState } from "react";
import { registerUser } from "../../api/apiServices";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";

const RegistrationForm = ({ onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await registerUser({
        email,
        password,
        name,
        role,
        confirmPassword,
      });
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="main-div-register">
      <ShowChartRoundedIcon
        style={{ color: "rgb(102, 59, 181)", fontSize: 30, marginLeft: "5px" }}
      />{" "}
      <h2 className="register-header">Create your account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div></div>
        <div className="main-div-name">
          <label htmlFor="register-name">Name:</label>
        </div>
        <input
          className="input-register-name"
          type="text"
          id="register-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="main-div-email">
          <label htmlFor="register-email">Email:</label>
        </div>
        <input
          className="input-register-email"
          type="email"
          id="register-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="main-div-password-register">
          <label htmlFor="register-password">Password:</label>
        </div>
        <input
          className="input-register-password"
          type="password"
          id="register-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="main-div-confirm-password">
          <label htmlFor="register-confirm-password">Confirm Password:</label>
        </div>
        <input
          className="input-register-confirm-password"
          type="password"
          id="register-confirm-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="main-div-role">
          <label htmlFor="register-role">Role:</label>
        </div>
        <input
          className="input-register-role"
          type="text"
          id="register-role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <button className="login-btn" onClick={onToggle}>
          Login
        </button>
      </p>
    </div>
  );
};

export default RegistrationForm;
