import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css"; // Reusing Register.css

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });
      setMessage(response.data.message);
      if (response.data.success) {
        onLogin(username);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="register-container"> {/* Reusing the same container */}
      <div className="register-form"> {/* Reusing the form structure */}
        <h2 className="register-heading">Login</h2> {/* Same heading structure */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="new-username"
              name="username"
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              name="password"
              className="form-input"
            />
          </div>
          <button
            type="submit"
            className="form-button"
          >
            Login
          </button>
        </form>
        {message && <p className="error-message">{message}</p>} {/* Reusing error message */}
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