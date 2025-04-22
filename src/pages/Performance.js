import React from "react";
import "../styles/Performance.css";

const Performance = () => {
  return (
    <div className="performance-wrapper">
      {/* Hero Section */}
      <div
        className="performance-parallax"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/Encryption.jpg)`,
        }}
      >
        <h1>A Work in Progress</h1>
        <p>
          RiverLock is lightweight and intentionally simple.
          While you may notice occasional lag, that’s the tradeoff for keeping the app minimal and beginner friendly.
        </p>
      </div>

      {/* Timeline Content */}
      <div className="performance-timeline">

        {/* Timeline Block 1 */}
        <div className="timeline-block">
          <div className="timeline-content">
            <h2>Designed for Simplicity</h2>
            <p>
              This project was built with clarity and usability in mind.
              There may be some rough edges, but it works.
              It’s proof that with a focused mindset and simple tools, you can build something real, without a big team or budget.
            </p>
            <div className="timeline-images">
              <img src={`${process.env.PUBLIC_URL}/images/AddAccount.jpg`} alt="Add Account" />
            </div>
          </div>
        </div>

        {/* Timeline Block 2 */}
        <div className="timeline-block alt">
          <div className="timeline-content">
            <h2>Tech Stack</h2>
            <p>
              RiverLock is built from scratch using a modern stack:
              <br /><br />
              • <strong>Frontend:</strong> React, TailwindCSS, Framer Motion<br />
              • <strong>Backend:</strong> Flask (Python)<br />
              • <strong>Database:</strong> PostgreSQL (Railway)<br />
              • <strong>Security:</strong> AES-256 encryption, hashing<br /><br />
            </p>
            <div className="tech-stack-logos">
              {["React", "Python", "Flask", "Postgre"].map((tech) => (
                <div key={tech} className="tech-logo">
                  <img src={`${process.env.PUBLIC_URL}/images/${tech}.png`} alt={tech} />
                  <p>{tech}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Block 3 */}
        <div className="timeline-block">
          <div className="timeline-content">
          <h2>From Concept to Reality</h2>
            <p>
              RiverLock started as a personal project and turned into a fully functional app.
              It encrypts data, syncs across devices, and was built from scratch to be secure, minimal, and easy to use.
              Whether you're storing one password or fifty, it's built to handle real use, not just a showcase.
            </p>
            <img
              className="single-image"
              src={`${process.env.PUBLIC_URL}/images/Generator.jpg`}
              alt="Generator Screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;