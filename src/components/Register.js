import "../styles/Register.css";
import React, { useState } from "react";
import { registerUser } from "../utils/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state added

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start spinner
    try {
      const response = await registerUser(username, password);
      setMessage(response.data.message);
      if (response.data.success) {
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred while registering");
    } finally {
      setLoading(false); // ✅ Stop spinner
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
              name="username"
              className="form-input"
              autoComplete="off"
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
              name="password"
              className="form-input"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? (
              <span className="spinner"></span> // 👇 We'll define this below
            ) : (
              "Register"
            )}
          </button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <p className="register-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;