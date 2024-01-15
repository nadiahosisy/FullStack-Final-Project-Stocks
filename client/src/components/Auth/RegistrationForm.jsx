import React, { useState } from "react";
import { registerUser } from "../../api/apiServices";
import { useNavigate } from "react-router";

import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { useAuth } from "../../context/AuthProvider";

import Modal from "../Modal/Modal";

const RegistrationForm = ({ onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [modalInfo, setModalInfo] = useState({
    show: false,
    message: "",
    iconType: "",
  });
  const navigate = useNavigate();
  const { updateUserData } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setModalInfo({
        show: true,
        message: "Passwords do not match",
        iconType: "error",
      });
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

      updateUserData(response.userData);

      setModalInfo({
        show: true,
        message: "Registration successful",
        iconType: "success",
      });
    } catch (error) {
      setModalInfo({
        show: true,
        message: "Registration failed",
        iconType: "error",
      });
    }
  };

  const closeModal = () => {
    setModalInfo({ show: false, message: "", iconType: "" });
    if (modalInfo.message === "Registration successful") {
      onToggle();
    }
  };

  return (
    <div className="main-div-register">
      <ShowChartRoundedIcon
        style={{ color: "#4FD1C5", fontSize: 30, marginLeft: "10px" }}
      />{" "}
      <h2 className="register-header">Create your account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="main-div-role">
          <label htmlFor="register-role">Role:</label>
        </div>
        <select
          className="input-register-role"
          id="register-role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="User">User</option>
          <option value="Investor">Investor</option>
        </select>
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

        <button className="register-button" type="submit">
          Register
        </button>
      </form>
      <p className="pargraph-register-page">
        Already have an account?{" "}
        <button className="login-btn" onClick={onToggle}>
          Login
        </button>
      </p>
      <Modal
        show={modalInfo.show}
        message={modalInfo.message}
        iconType={modalInfo.iconType}
        onClose={closeModal}
      />
    </div>
  );
};

export default RegistrationForm;
