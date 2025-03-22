import React from "react";
import "../styles/Performance.css";

const Performance = () => {
  return (
    <div>
      {/* Parallax Section (Hero Section) */}
      <div className="performance-parallax" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/Encryption.jpg)` }}>
        <h1>Unleashing Peak Performance</h1>
        <p>Discover the technology that powers RiverLock's unmatched speed and efficiency.</p>
      </div>

      {/* Content Section */}
      <div className="performance-content">
        {/* Section 1 */}
        <div className="performance-section">
          <div className="performance-text">
            <h2>Blazing Fast Speeds</h2>
            <p>
              Speed is everything! RiverLock makes sure you’re not sitting around waiting.
              Whether you’re adding an account or checking your saved passwords, everything loads at lightning speed.
              It’s all about keeping things smooth and fast, so you can get back to what matters.
            </p>
          </div>
          <div className="performance-image">
            <img
              src={process.env.PUBLIC_URL + "/images/PerformanceImage1.jpg"}
              alt="Fast Speeds"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="performance-section reverse">
          <div className="performance-text">
            <h2>Unmatched Reliability</h2>
            <p>
              Nothing’s worse than having your data vanish when you need it most.
              That’s why RiverLock ensures 99.99% uptime. Your data stays safe and accessible,
              so you can rest easy knowing it’s always ready when you are.
            </p>
          </div>
          <div className="performance-image">
            <img
              src={process.env.PUBLIC_URL + "/images/PerformanceImage2.jpg"}
              alt="Reliability"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className="performance-section">
          <div className="performance-text">
            <h2>Data Integrity & Storage Security</h2>
            <p>
              Your data is safely stored in a secure SQL database. We ensure that all your accounts are encrypted and protected,
              with no sensitive information exposed, even on the backend. RiverLock’s storage and security methods are second to none.
            </p>
          </div>
          <div className="performance-image">
            <img
              src={process.env.PUBLIC_URL + "/images/PerformanceImage3.jpg"}
              alt="Data Security"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;