import React, { useState } from "react";
import LoginForm from "../Auth/LoginForm";
import RegistrationForm from "../Auth/RegistrationForm";
import svgLoginPage from "../../../public/Images/sign-up.svg";

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="main-div-login">
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
    </div>
  );
};

export default Login;
