import React, { useState } from "react";
import { registerUser } from "../../api/apiServices";

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
      const response = await registerUser({ email, password, name, role });
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="register-name">Name:</label>
          <input
            type="text"
            id="register-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="register-email">Email:</label>
          <input
            type="email"
            id="register-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="register-password">Password:</label>
          <input
            type="password"
            id="register-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="register-confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="register-confirm-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="register-role">Role:</label>
          <input
            type="text"
            id="register-role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <button onClick={onToggle}>Login</button>
      </p>
    </div>
  );
};

export default RegistrationForm;
