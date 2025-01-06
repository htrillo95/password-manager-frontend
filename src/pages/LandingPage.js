import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            Meet <span className="highlight">RiverLock</span>
            <br />
            Your Digital Fortress.
          </h1>
          <p>
            Experience the next level of password management. Simple, secure,
            and stress-free.
          </p>
          <div className="btn-container">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/Hero.svg`}
            alt="Hero Illustration"
            className="illustration"
          />
        </motion.div>
      </header>

      {/* Wave Divider */}
      <div className="wave-divider"></div>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose RiverLock?</h2>
        <div className="feature-cards">
          {[
            {
              title: "Secure Your Vault",
              description: "AES-256 encryption to lock your sensitive data.",
              icon: "fas fa-lock",
            },
            {
              title: "Generate Strong Passwords",
              description: "Quickly create unbreakable passwords.",
              icon: "fas fa-key",
            },
            {
              title: "Access Anywhere",
              description: "Sync your data seamlessly across devices.",
              icon: "fas fa-mobile-alt",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <div className="icon-wrapper">
                <i className={feature.icon}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider flip"></div>

      {/* Stats Section */}
      <section className="stats">
        <h2>Our Impact</h2>
        <div className="stats-container">
          {[
            { number: "10K+", label: "Passwords Secured" },
            { number: "5K+", label: "Trusted Users" },
            { number: "100%", label: "Satisfaction Rate" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider"></div>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          {[
            {
              title: "Sign Up",
              description: "Create an account to get started.",
            },
            {
              title: "Secure Your Vault",
              description: "Store your passwords in one secure place.",
            },
            {
              title: "Access Anywhere",
              description: "Enjoy seamless access across devices.",
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="step-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 RiverLock. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;