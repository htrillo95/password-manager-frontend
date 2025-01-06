import React from "react";
import "../styles/Performance.css";

const Performance = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="performance-hero">
        <h1>Unleashing Peak Performance</h1>
        <p>Discover the technology that powers RiverLock's unmatched speed and efficiency.</p>
      </div>

      {/* Section 1 */}
      <div className="performance-section">
        <div className="performance-content">
          <h2>Blazing Fast Speeds</h2>
          <p>
            With cutting-edge optimization, RiverLock ensures that every operation is carried out
            with lightning-fast precision.
          </p>
        </div>
        <div className="performance-image">
          <img src="https://via.placeholder.com/600x400" alt="Fast speeds" />
        </div>
      </div>

      {/* Section 2 */}
      <div className="performance-section reverse">
        <div className="performance-content">
          <h2>Unmatched Reliability</h2>
          <p>
            Enjoy a seamless experience with 99.99% uptime and redundancy. Your data will always be
            accessible whenever you need it.
          </p>
        </div>
        <div className="performance-image">
          <img src="https://via.placeholder.com/600x400" alt="Reliability" />
        </div>
      </div>

      {/* Section 3 */}
      <div className="performance-parallax">
        <div className="parallax-content">
          <h2>Engineered for Scalability</h2>
          <p>
            From startups to enterprises, RiverLock’s infrastructure scales effortlessly as your
            needs grow. Experience the perfect balance of performance and scalability.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="performance-footer">
        <h2>Maximize Your Potential</h2>
        <p>
          Partner with RiverLock today and unlock unparalleled performance for your digital security
          needs.
        </p>
      </div>
    </div>
  );
};

export default Performance;