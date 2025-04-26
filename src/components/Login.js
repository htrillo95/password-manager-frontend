import React, { useState } from "react";
import "../styles/Register.css"; // Reusing CSS for Register & Login
import { loginUser } from "../utils/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      setMessage(response.data.message);

      if (response.data.success) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "/dashboard"; // Full reload to reset AppContext
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-heading">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <FormField
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="form-button">Login</button>
        </form>

        {message && (
          <p className={message.toLowerCase().includes("success") ? "success-message" : "error-message"}>
            {message}
          </p>
        )}

        <p className="register-link">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

// ⬇️ Small internal component to DRY up form fields
const FormField = ({ id, label, type, value, onChange }) => (
  <div>
    <label htmlFor={id} className="form-label">{label}</label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={`Enter your ${label.toLowerCase()}`}
      value={value}
      onChange={onChange}
      autoComplete="off"
      className="form-input"
    />
  </div>
);

export default Login;