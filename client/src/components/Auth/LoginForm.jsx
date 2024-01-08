import React, { useState } from "react";
import { useNavigate } from "react-router";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { useAuth } from "../../context/AuthProvider";
import Modal from "../Modal/Modal";

const LoginForm = ({ onToggle }) => {
  const { updateUserData, setIsLoggedIn, loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalInfo, setModalInfo] = useState({
    show: false,
    message: "",
    iconType: null,
  });
  const navigate = useNavigate();

  const handleModalClose = () => {
    setModalInfo({ show: false, message: "", iconType: null });
    if (modalInfo.message === "Login Successful!") {
      navigate("/mystocks");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ email, password });
      updateUserData(response.user);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
      setModalInfo({
        show: true,
        message: "Login Successful!",
        iconType: "success",
      });
    } catch (error) {
      setModalInfo({
        show: true,
        message: "Please Enter valid Email or Password",
        iconType: "error",
      });
    }
  };

  return (
    <div className="login-form-container">
      <ShowChartRoundedIcon
        style={{
          color: "#6c63ff",
          fontSize: 30,
          marginLeft: "5px",
        }}
      />
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
        <Modal
          show={modalInfo.show}
          message={modalInfo.message}
          onClose={handleModalClose}
          iconType={modalInfo.iconType}
        />
      </form>
      <p className="register-pargraph">Don't have an account? </p>
      <button className="login-register-button" onClick={onToggle}>
        Register
      </button>
    </div>
  );
};

export default LoginForm;
