import React, { useState } from "react";
import { registerUser } from "../../api/apiServices";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import Modal from "../Modal/Modal"; // Import the Modal component

const RegistrationForm = ({ onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [modalInfo, setModalInfo] = useState({
    show: false,
    message: "",
    iconType: null,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // At least one digit, one lowercase, one uppercase, 8 characters

  const validateForm = () => {
    if (!emailRegex.test(email)) {
      setModalInfo({
        show: true,
        message: "Invalid email format",
        iconType: "error",
      });
      return false;
    }
    if (!passwordRegex.test(password)) {
      setModalInfo({
        show: true,
        message: "Password does not meet criteria",
        iconType: "error",
      });
      return false;
    }
    if (password !== confirmPassword) {
      setModalInfo({
        show: true,
        message: "Passwords do not match",
        iconType: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await registerUser({ email, password, name, role });
      setModalInfo({
        show: true,
        message: "Registration successful!",
        iconType: "success",
      });
      console.log("Registration successful:", response);
    } catch (error) {
      setModalInfo({
        show: true,
        message: "Registration failed",
        iconType: "error",
      });
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="main-div-register">
      <ShowChartRoundedIcon
        style={{ color: "rgb(102, 59, 181)", fontSize: 30, marginLeft: "5px" }}
      />
      <h2 className="register-header">Create your account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Name input */}
        <div className="main-div-name">
          <label htmlFor="register-name">Name:</label>
          <input
            className="input-register-name"
            type="text"
            id="register-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Email input */}
        <div className="main-div-email">
          <label htmlFor="register-email">Email:</label>
          <input
            className="input-register-email"
            type="email"
            id="register-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password input */}
        <div className="main-div-password-register">
          <label htmlFor="register-password">Password:</label>
          <input
            className="input-register-password"
            type="password"
            id="register-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Confirm password input */}
        <div className="main-div-confirm-password">
          <label htmlFor="register-confirm-password">Confirm Password:</label>
          <input
            className="input-register-confirm-password"
            type="password"
            id="register-confirm-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {/* Role input */}
        <div className="main-div-role">
          <label htmlFor="register-role">Role:</label>
          <input
            className="input-register-role"
            type="text"
            id="register-role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        {/* Register button */}
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
      {/* Registration modal */}
      <Modal
        show={modalInfo.show}
        message={modalInfo.message}
        onClose={() =>
          setModalInfo({ show: false, message: "", iconType: null })
        }
        iconType={modalInfo.iconType}
      />
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
