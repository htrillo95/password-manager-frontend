import "../styles/Register.css";
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/register", {
        username,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
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
      autoComplete="off"  // Disable auto-fill for this field
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
      autoComplete="off"  // Disable auto-fill for this field
            />
          </div>
          <button type="submit">Register</button>
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