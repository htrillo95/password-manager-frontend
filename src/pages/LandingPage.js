import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing">
      <h1>Welcome to Password Manager</h1>
      <p>Securely store and manage your passwords.</p>
      <Link to="/login" className="btn">Login</Link>
      <Link to="/register" className="btn">Register</Link>
    </div>
  );
};

export default LandingPage;