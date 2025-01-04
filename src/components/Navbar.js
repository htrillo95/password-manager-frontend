import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-text">
            RiverLock
          </Link>
        </div>

        {/* Nav Links */}
        <ul className="nav-links">
          <li>
            <Link to="/features" className="nav-link">
              Features
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/faq" className="nav-link">
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>

        {/* Call-to-Action Button */}
        <div className="cta-container">
          <Link to="/register" className="cta-button">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;