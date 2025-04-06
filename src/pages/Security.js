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
            <h2>AES-256 Encryption</h2>
            <p>
            AES-256 encryption is a top-level security method used to keep your data safe.
            It’s the same technology trusted by organizations worldwide,
            ensuring that your information stays protected from unauthorized access.
            </p>
          </div>
          <div className="security-image">
            <img
              src={process.env.PUBLIC_URL + "/images/DemoAccount1.jpg"} // AES Encryption demo image
              alt="Demo Account"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="security-section reverse">
          <div className="security-text">
            <h2>Password Encryption on the Backend</h2>
            <p>
            All stored passwords are securely encrypted on the backend using advanced hashing techniques.
            Even if unauthorized access were gained to the database, the passwords remain protected and unreadable.
            This process ensures your data stays private and secure.
            </p>
          </div>
          <div className="security-image">
            <img
              src={process.env.PUBLIC_URL + "/images/Json.jpg"} // JSON encryption data image
              alt="Password Encryption"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className="security-section">
          <div className="security-text">
            <h2>Data Integrity & Storage Security</h2>
            <p>
              Your data is safely stored in a secure SQL database.
              We ensure that all your accounts are encrypted and protected,
              with no sensitive information exposed, even on the backend.
              <br /><br />
              Shown below is a live view of our PostgreSQL database with encrypted passwords stored securely.
            </p>
          </div>
          <div className="security-image">
            <img
              src={process.env.PUBLIC_URL + "/images/Sql.jpg"}
              alt="PostgreSQL Backup Screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;