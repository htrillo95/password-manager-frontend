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
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
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
              answer:
                "A password manager securely stores your passwords, making it easier and safer to use the internet.",
            },
            {
              question: "Is RiverLock secure?",
              answer:
                "Absolutely. We use AES-256 encryption to ensure your data remains inaccessible to others.",
            },
            {
              question: "Can I access RiverLock on multiple devices?",
              answer:
                "Yes! RiverLock syncs seamlessly across all your devices.",
            },
          ].map((faq, idx) => (
            <motion.div
              key={idx}
              className="faq-item"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Ready to <span className="highlight">Secure Your World?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Start using RiverLock today and elevate your digital safety with ease.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/register" className="btn btn-primary btn-large">
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-top">
          <p>&copy; 2025 RiverLock. Your security, redefined.</p>
        </div>
        <div className="footer-links">
          {["Privacy Policy", "Terms of Service", "Contact Support"].map(
            (link, idx) => (
              <a key={idx} href="#">
                {link}
              </a>
            )
          )}
        </div>
        <div className="social-links">
          {["Facebook", "Twitter", "LinkedIn"].map((social, idx) => (
            <a key={idx} href="#" className="social-icon">
              {social}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;