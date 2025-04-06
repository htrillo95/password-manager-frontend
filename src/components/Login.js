import React, { useState } from "react";
import "../styles/Register.css"; // Reusing the same CSS file
import { loginUser } from "../utils/api"; // Adjust path if needed

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
        // Save user to localStorage for AppContext
        localStorage.setItem("loggedInUser", username);

        // 🔄 Force full reload to trigger AppContext and fresh fetch
        window.location.href = "/dashboard";
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
          <div>
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              name="username"
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              name="password"
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">Login</button>
        </form>

        {/* Message with conditional styling */}
        {message && (
          <p
            className={
              message.toLowerCase().includes("success")
                ? "success-message"
                : "error-message"
            }
          >
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

export default Login;