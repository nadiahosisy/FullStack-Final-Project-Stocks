import React, { useState } from "react";
import LoginForm from "../Auth/LoginForm";
import RegistrationForm from "../Auth/RegistrationForm";

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="login-container">
      {isLoginView ? (
        <LoginForm onToggle={toggleView} />
      ) : (
        <RegistrationForm onToggle={toggleView} />
      )}
    </div>
  );
};

export default Login;
