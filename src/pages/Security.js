import React from "react";
import "../styles/Security.css";

const Security = () => {
  return (
    <div>
      {/* Parallax Section */}
      <div className="security-parallax">
        <h1>Unmatched Digital Security</h1>
        <p>Your data, safeguarded with precision and care.</p>
      </div>

      {/* Content Section */}
      <div className="security-content">
        {/* Section 1 */}
        <div className="security-section">
          <div className="security-text">
            <h2>AES-256 Encryption</h2>
            <p>
              Trusted by governments and organizations worldwide, AES-256
              encryption ensures your data is always protected. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Nullam at nisi eget
              lorem ultricies vulputate. Phasellus vitae nisi nec ipsum posuere
              consequat.
            </p>
          </div>
          <div className="security-image">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Encryption"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="security-section reverse">
          <div className="security-text">
            <h2>Multi-Factor Authentication</h2>
            <p>
              Add an extra layer of protection. Even if your password is
              compromised, unauthorized access is prevented. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Duis eu lorem id dolor
              vehicula tincidunt.
            </p>
          </div>
          <div className="security-image">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Multi-Factor Authentication"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className="security-section">
          <div className="security-text">
            <h2>Secure Data Backups</h2>
            <p>
              Your data is always protected with redundant, encrypted backups,
              ensuring accessibility even in unforeseen circumstances. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
              risus eget nulla vehicula sollicitudin.
            </p>
          </div>
          <div className="security-image">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Secure Backups"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;