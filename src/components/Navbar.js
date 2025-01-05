import React, { useState } from "react";
import { Link } from "react-router-dom"; // For other links like Get Started
import "../styles/Navbar.css";

const Navbar = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const links = [
    {
      name: "Features",
      path: "#", // No routing for Features
      subLinks: [
        { name: "Security", path: "/features/security" },
        { name: "Performance", path: "/features/performance" },
      ],
    },
    {
      name: "About",
      path: "#", // No routing for About
      subLinks: [
        { name: "Team", path: "/about/team" },
        { name: "Vision", path: "/about/vision" },
      ],
    },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  const handleMouseEnter = (index) => {
    setDropdownIndex(index);
  };

  const handleMouseLeave = () => {
    setDropdownIndex(null);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">RiverLock</Link>
      </div>
      <ul className="nav-links">
        {links.map((link, index) => (
          <li
            key={index}
            className="nav-item"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {link.subLinks ? (
              <>
                {/* Disable routing for Features and About */}
                <button
                  className="nav-link"
                  onClick={(e) => e.preventDefault()}
                >
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
              // Enable routing for FAQ and Contact
              <Link to={link.path} className="nav-link">
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <Link to="/get-started" className="cta-button">
        Get Started
      </Link>
    </nav>
  );
};

export default Navbar;