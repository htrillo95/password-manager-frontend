import React from "react";
import "../styles/Performance.css";

const Performance = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="performance-parallax"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/Encryption.jpg)`,
        }}
      >
        <h1>A Work in Progress</h1>
        <p>RiverLock is lightweight and intentionally simple.
          While you may notice occasional lag, that’s the tradeoff for keeping the app minimal and beginner friendly.
          Performance improvements are on the roadmap, but this version keeps things functional without the complexity.</p>
      </div>

      {/* Content Section */}
      <div className="performance-content">

        {/* Section 1 - Honest Note */}
        <div className="performance-section">
          <div className="performance-text">
            <h2>Designed for Simplicity</h2>
            <p>
            This project was built with clarity and usability in mind. 
            There may be some rough edges, but it works. 
            It’s proof that with a focused mindset and simple tools, you can build something real, without a big team or budget.
            </p>
          </div>
          <div className="performance-image">
            <img
              src={process.env.PUBLIC_URL + "/images/PerformanceImage1.jpg"}
              alt="App in Progress"
            />
          </div>
        </div>

        {/* Section 2 - Tech Stack */}
<div className="performance-section reverse">
  <div className="performance-text">
    <h2>Tech Stack</h2>
    <p>
      RiverLock is built from scratch using a modern stack:
      <br /><br />
      • <strong>Frontend:</strong> React, TailwindCSS, Framer Motion<br />
      • <strong>Backend:</strong> Flask (Python)<br />
      • <strong>Database:</strong> PostgreSQL, hosted on Railway<br />
      • <strong>Security:</strong> AES-256 encryption, password hashing
      <br /><br />
      From the UI to the encrypted backend, everything was built by me while learning to code.
    </p>
  </div>

  <div className="performance-image">
    <div className="tech-stack-logos">
      <div className="tech-logo">
        <img src={process.env.PUBLIC_URL + "/images/React.png"} alt="React Logo" />
        <p>React</p>
        <span>Frontend</span>
      </div>
      <div className="tech-logo">
        <img src={process.env.PUBLIC_URL + "/images/Python.png"} alt="Python Logo" />
        <p>Python</p>
        <span>Language</span>
      </div>
      <div className="tech-logo">
        <img src={process.env.PUBLIC_URL + "/images/Flask.png"} alt="Flask Logo" />
        <p>Flask</p>
        <span>Web Framework</span>
      </div>
      <div className="tech-logo">
        <img src={process.env.PUBLIC_URL + "/images/Postgre.png"} alt="PostgreSQL Logo" />
        <p>PostgreSQL</p>
        <span>Database</span>
      </div>
    </div>
  </div>
</div>

        {/* Section 3 - Optional Closing */}
        <div className="performance-section">
          <div className="performance-text">
            <h2>Independently Built, Collectively Useful</h2>
            <p>
              RiverLock isn't an enterprise level app, it's a personal project turned real tool.
              It stores real encrypted data, works across devices, and proves what can be done with clear goals and consistent effort.
            </p>
          </div>
          <div className="performance-image">
            <img
              src={process.env.PUBLIC_URL + "/images/PerformanceImage3.jpg"}
              alt="Personal Dev Journey"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;