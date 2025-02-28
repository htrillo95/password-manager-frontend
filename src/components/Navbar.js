import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { motion } from "framer-motion";

const Navbar = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const menuRef = useRef(null); // Ref for detecting outside clicks

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

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // CLOSE MENU WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">RiverLock</Link>
      </div>

      {/* Hamburger Button */}
      <button className={`hamburger-menu ${mobileMenuOpen ? "open" : ""}`} onClick={toggleMobileMenu}>
        <motion.div
          className="bar top"
          animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="bar middle"
          animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="bar bottom"
          animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }}
          transition={{ duration: 0.3 }}
        />
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
                <button className="nav-link">{link.name}</button>
                {dropdownIndex === index && (
                  <motion.ul
                    className="dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.subLinks.map((subLink, subIndex) => (
                      <motion.li
                        key={subIndex}
                        whileTap={{ scale: 0.9, opacity: 0.6 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Link to={subLink.path} onClick={handleLinkClick} className="mobile-nav-link">
                          {subLink.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </>
            ) : (
              <motion.div whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                <Link to={link.path} onClick={handleLinkClick} className="nav-link">
                  {link.name}
                </Link>
              </motion.div>
            )}
          </li>
        ))}
      </ul>

      {/* CTA Button (Hidden in Mobile) */}
      <Link to="/register" className="cta-button">
        Get Started
      </Link>

      {/* Mobile Navigation Menu */}
      <motion.div
        ref={menuRef} // Reference added here
        className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
      >
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              {link.subLinks ? (
                <>
                  <motion.button
                    className="mobile-nav-link"
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => toggleMobileDropdown(index)}
                  >
                    {link.name}
                  </motion.button>
                  <motion.ul
                    className={`mobile-dropdown ${mobileDropdown === index ? "open" : ""}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: mobileDropdown === index ? 1 : 0,
                      height: mobileDropdown === index ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.subLinks.map((subLink, subIndex) => (
                      <motion.li
                        key={subIndex}
                        className="mobile-dropdown-item"
                        whileTap={{ scale: 0.9, opacity: 0.6 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Link to={subLink.path} onClick={handleLinkClick}>
                          {subLink.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </>
              ) : (
                <motion.div whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                  <Link to={link.path} onClick={handleLinkClick} className="mobile-nav-link">
                    {link.name}
                  </Link>
                </motion.div>
              )}
            </li>
          ))}
        </ul>
        <motion.div whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
          <Link to="/register" onClick={handleLinkClick} className="mobile-cta-button">
            Get Started
          </Link>
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default Navbar;