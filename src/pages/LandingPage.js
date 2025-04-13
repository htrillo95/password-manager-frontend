import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [stats, setStats] = useState({
    total_users: null,
    total_passwords: null,
  });

  const [showButton, setShowButton] = useState(false);
  const impactRef = useRef(null); // reference to "Our Impact" section

  // Fetch real-time stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("https://password-manager-api-production.up.railway.app/stats");
        const data = await response.json();
        if (data.success) {
          setStats({
            total_users: data.total_users,
            total_passwords: data.total_passwords,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  // Scroll-to-top button trigger
  useEffect(() => {
    const handleScroll = () => {
      if (!impactRef.current) return;
      const sectionTop = impactRef.current.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight / 1.25;
      setShowButton(sectionTop < triggerPoint);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero">
        <motion.div className="hero-content" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1>
            Meet <span className="highlight">RiverLock</span>
            <br />
            Your Digital Fortress.
          </h1>
          <p>Experience the next level of password management. Simple, secure, and stress-free.</p>
          <div className="btn-container">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        </motion.div>

        <motion.div className="hero-image" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5 }}>
          <img src={`${process.env.PUBLIC_URL}/images/Hero.svg`} alt="Hero Illustration" className="illustration" />
        </motion.div>
      </header>

      <div className="wave-divider"></div>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose RiverLock?</h2>
        <div className="feature-cards">
          {[
            { title: "Secure Your Vault", description: "AES-256 encryption to lock your sensitive data.", icon: "fas fa-lock" },
            { title: "Generate Strong Passwords", description: "Quickly create unbreakable passwords.", icon: "fas fa-key" },
            { title: "Access Anywhere", description: "Sync your data seamlessly across devices.", icon: "fas fa-mobile-alt" },
          ].map((feature, idx) => (
            <motion.div key={idx} className="feature-card" whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.2 }}>
              <div className="icon-wrapper"><i className={feature.icon}></i></div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="wave-divider flip"></div>

      {/* Our Impact Section */}
      <section className="stats" ref={impactRef}>
        <h2>Our Impact</h2>
        <p style={{ maxWidth: "600px", margin: "0 auto", color: "#5a5a5a" }}>
          These live numbers reflect actual users who have signed up and stored their passwords using RiverLock.
        </p>
        <div className="stats-container" style={{ marginTop: "2rem" }}>
        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h3>{stats.total_users !== null ? stats.total_users : "—"}</h3>
          <p>Trusted Users</p>
        </motion.div>
        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h3>{stats.total_passwords !== null ? stats.total_passwords : "—"}</h3>
          <p>Passwords Secured</p>
        </motion.div>
        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <h3>∞</h3>
          <p>Growth Potential</p>
        </motion.div>
      </div>
      </section>

      {/* Visual Quote */}
      <section className="stats" style={{ padding: "3rem 1rem" }}>
        <blockquote style={{ fontSize: "1.5rem", fontWeight: 600, color: "#1d3557", fontStyle: "italic" }}>
          “One place. Every password. Secured.”
        </blockquote>
      </section>

      <div className="wave-divider"></div>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <p style={{ maxWidth: "600px", margin: "0 auto", color: "#5a5a5a" }}>
          Getting started is easy. Just register, sign in, and you're ready to go.
        </p>
        <div className="steps" style={{ marginTop: "2rem" }}>
          {[
            { title: "Sign Up", description: "Create an account to get started." },
            { title: "Secure Your Vault", description: "Store your passwords in one secure place." },
            { title: "Access Anywhere", description: "Enjoy seamless access across devices." },
          ].map((step, idx) => (
            <motion.div key={idx} className="step-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.2 }}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p style={{ marginBottom: "0.5rem", fontWeight: 500 }}>Developed as a personal project.</p>
        <p>&copy; 2025 RiverLock. All rights reserved.</p>
      </footer>

      {/* Scroll-to-Top Button */}
      {showButton && (
        <button
          className="back-to-top visible"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to Top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default LandingPage;