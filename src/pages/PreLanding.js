import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/PreLanding.css";

const PreLanding = () => {
  const [stats, setStats] = useState({ total_users: null, total_passwords: null });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://password-manager-api-production.up.railway.app/stats");
        const data = await res.json();
        if (data.success) {
          setStats({ total_users: data.total_users, total_passwords: data.total_passwords });
        }
      } catch (err) {
        console.error("Stats fetch failed", err);
      }
    };
    fetchStats();
  }, []);

  const handleEnter = () => {
    localStorage.setItem("hasSeenPreLanding", "true");
    navigate("/");
  };

  return (
    <div className="pre-landing">
      <motion.div
        className="intro-box"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>Heads Up</h1>
        <p>
          This app was built as a personal project to explore how password managers work behind the scenes.
          You could technically store real passwords.
        </p>
        <p>
          Everything here is for demo and learning purposes only.
          It's a safe space to explore what I've been building.
        </p>

        <div className="stats-row">
          <div className="stat">
            <h3>{stats.total_users ?? "—"}</h3>
            <p>Unique Users</p>
          </div>
          <div className="stat">
            <h3>{stats.total_passwords ?? "—"}</h3>
            <p>Stored Passwords</p>
          </div>
        </div>

        {/* Click to Enter */}
        <motion.div
          className="click-enter-btn"
          onClick={handleEnter}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          → Explore the App
        </motion.div>

        <motion.blockquote
          className="quote"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          “One place. Every password. Secured.”
        </motion.blockquote>

        <p className="small-note">Made while learning.</p>
      </motion.div>
    </div>
  );
};

export default PreLanding;