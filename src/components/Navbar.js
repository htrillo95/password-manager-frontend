import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const links = [
    {
      name: "Features",
      path: "/features",
      subLinks: [
        { name: "Security", path: "/features/security" },
        { name: "Performance", path: "/features/performance" },
      ],
    },
    {
      name: "About",
      path: "/about",
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
            <Link to={link.path} className="nav-link">
              {link.name}
            </Link>
            {link.subLinks && dropdownIndex === index && (
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