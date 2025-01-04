import React from "react";
import "../styles/Vision.css";

const Vision = () => {
  return (
    <div className="vision-container">
      <header className="vision-header">
        <h1>Our Vision</h1>
        <p>
          At <strong>RiverLock</strong>, we dream of a future where digital security is not just a necessity but a seamless experience for everyone. 
        </p>
      </header>
      <section className="vision-content">
        <div className="vision-section">
          <h2>Empowering Individuals</h2>
          <p>
            We believe that everyone deserves the peace of mind that comes with secure digital tools. From families protecting their personal data to enterprises managing sensitive information, our mission is to offer tools that work effortlessly in the background, leaving users to focus on what matters most.
          </p>
        </div>
        <div className="vision-section">
          <h2>Leading with Innovation</h2>
          <p>
            Innovation is the heart of RiverLock. Our team of experts is dedicated to staying ahead of the curve, integrating state-of-the-art encryption and user-friendly designs into every solution we create. Security doesn’t have to be complicated, and we’re here to prove it.
          </p>
        </div>
        <div className="vision-section">
          <h2>Building Trust</h2>
          <p>
            Trust is the foundation of everything we do. Transparency, reliability, and integrity are woven into our processes, ensuring users feel confident choosing RiverLock as their digital security partner.
          </p>
        </div>
      </section>
      <footer className="vision-footer">
        <h2>Join Our Journey</h2>
        <p>
          Together, let’s redefine the standards of cybersecurity and create a digital world where everyone feels safe. 
          <strong>RiverLock</strong>—where security meets simplicity.
        </p>
      </footer>
    </div>
  );
};

export default Vision;