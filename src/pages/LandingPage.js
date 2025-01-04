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
            Experience the next level of password management. Simple, secure, and stress-free.
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
            src="/path/to/illustration.svg"
            alt="Hero Illustration"
            className="illustration"
          />
        </motion.div>
      </header>

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

      {/* FAQ Section */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <motion.div
          className="faq-items"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[
            {
              question: "What is a password manager?",
              answer: "A password manager securely stores your passwords.",
            },
            {
              question: "Is RiverLock secure?",
              answer: "Absolutely. We use AES-256 encryption to secure your data.",
            },
            {
              question: "Can I access RiverLock on multiple devices?",
              answer: "Yes! RiverLock syncs seamlessly across devices.",
            },
          ].map((faq, idx) => (
            <motion.div key={idx} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 RiverLock. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;