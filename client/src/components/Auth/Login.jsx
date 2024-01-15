import React, { useState } from "react";
import LoginForm from "../Auth/LoginForm";
import RegistrationForm from "../Auth/RegistrationForm";
import svgLoginPage from "../../assets/Images/login-page.svg";
import { motion } from "framer-motion";

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <motion.div
      className="main-div-login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.01 } }}
    >
      <div className="main-div-img-login">
        <img className="login-img" src={svgLoginPage} alt="Sign Up" />
      </div>

      <div className="login-container">
        {isLoginView ? (
          <LoginForm onToggle={toggleView} />
        ) : (
          <RegistrationForm onToggle={toggleView} />
        )}
      </div>
    </motion.div>
  );
};

export default Login;
