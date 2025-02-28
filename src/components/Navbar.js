import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null); // Tracks dropdowns in mobile

  const links = [
    {
      name: "Features",
      path: "#",
      subLinks: [
        { name: "Security", path: "/features/security" },
        { name: "Performance", path: "/features/performance" },
      ],
    },
    {
      name: "About",
      path: "#",
      subLinks: [
        { name: "Team", path: "/about/team" },
        { name: "Vision", path: "/about/vision" },
      ],
    },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileDropdown = (index) => {
    setMobileDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">RiverLock</Link>
      </div>

      {/* Hamburger Button for Mobile */}
      <button className={`hamburger-menu ${mobileMenuOpen ? "open" : ""}`} onClick={toggleMobileMenu}>
        <div className="bar top"></div>
        <div className="bar middle"></div>
        <div className="bar bottom"></div>
      </button>

      {/* Desktop Navigation */}
      <ul className="nav-links">
        {links.map((link, index) => (
          <li
            key={index}
            className="nav-item"
            onMouseEnter={() => setDropdownIndex(index)}
            onMouseLeave={() => setDropdownIndex(null)}
          >
            {link.subLinks ? (
              <>
                <button className="nav-link" onClick={(e) => e.preventDefault()}>
                  {link.name}
                </button>
                {dropdownIndex === index && (
                  <ul className="dropdown">
                    {link.subLinks.map((subLink, subIndex) => (
                      <li key={subIndex}>
                        <Link to={subLink.path} className="dropdown-item">
                          {subLink.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link to={link.path} className="nav-link">
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* CTA Button - Hidden in Mobile */}
      <Link to="/register" className="cta-button">
        Get Started
      </Link>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                {link.subLinks ? (
                  <>
                    <button
                      className="mobile-nav-link"
                      onClick={() => toggleMobileDropdown(index)}
                    >
                      {link.name}
                    </button>
                    <ul className={`mobile-dropdown ${mobileDropdown === index ? "open" : ""}`}>
                      {link.subLinks.map((subLink, subIndex) => (
                        <li key={subIndex} className="mobile-dropdown-item">
                          <Link to={subLink.path}>{subLink.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link to={link.path} className="mobile-nav-link">
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link to="/register" className="mobile-cta-button">
            Get Started
          </Link>
        </div>
    </nav>
  );
};

export default Navbar;