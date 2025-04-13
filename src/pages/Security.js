import React from "react";
import { Parallax } from 'react-parallax';
import SecurityBanner from "../images/SecurityBanner.jpg";
import "../styles/Security.css";

const Security = () => {
  return (
    <div>
      {/* Parallax Hero Section */}
      <Parallax bgImage={SecurityBanner} strength={300}>
        <div className="security-parallax">
          <h1>Unmatched Digital Security</h1>
          <p>Your data, safeguarded with precision and care.</p>
        </div>
      </Parallax>

      {/* Content Section */}
      <div className="security-content">
        {/* Section 1 */}
        <div className="security-section">
          <div className="security-text">
            <h2>AES 256 Encryption</h2>
            <p>
              Your passwords are encrypted using AES 256, the same level of encryption trusted by banks and governments.
              This keeps your data locked and unreadable to anyone but you.
            </p>
          </div>
          <div className="security-image">
            <img
              src={process.env.PUBLIC_URL + "/images/DemoAccount1.jpg"}
              alt="AES Encryption Demo"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="security-section reverse">
          <div className="security-text">
            <h2>End to End Protection</h2>
            <p>
              Even if someone managed to access the database, your saved passwords would show up as scrambled code.
              All password data is encrypted and hashed behind the scenes, so no one else can read it. Not even us.
            </p>
          </div>
          <div className="security-image">
            <img
              src={process.env.PUBLIC_URL + "/images/Json.jpg"}
              alt="Hashed Password Storage"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className="security-section">
          <div className="security-text">
            <h2>Secure SQL Storage</h2>
            <p>
              Your encrypted accounts are stored in a PostgreSQL database built for performance and reliability.
              It keeps everything organized and protected, no matter how many entries you add.
              <br /><br />
              The following screenshot shows a real view of how passwords are stored in our database.
            </p>
          </div>
          <div className="security-image">
            <img
              src={process.env.PUBLIC_URL + "/images/Sql.jpg"}
              alt="PostgreSQL Password Vault"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;