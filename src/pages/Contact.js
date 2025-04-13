import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://password-manager-api-production.up.railway.app/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("Error sending message. Try again later.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact RiverLock</h1>
        <p>
          Found a bug or have feedback? Use the form to share your thoughts.
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-form-section">
          <h2 className="contact-heading">Share Your Feedback</h2>
          <p className="contact-description">
            Fill out the form below to leave a comment or report an issue.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="contact-submit">
              Send Message
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </div>

        {/* Right-side cards remain unchanged */}
        <div className="contact-info-section">
          <div className="info-card">
            <h2>Why Reach Out?</h2>
            <p>You can use the form to:</p>
            <ul>
              <li>- Report bugs or technical issues</li>
              <li>- Share feedback or suggestions</li>
              <li>- Leave a quick note or comment</li>
            </ul>
          </div>

          <div className="info-card">
            <h2>Location</h2>
            <p>Based in Philadelphia, PA</p>
            <p>Made in VS Code, tested in Chrome</p>
          </div>

          <div className="info-card">
            <h2>Heads Up</h2>
            <p>
              This isn’t a real business (but yes the email works). RiverLock is a demo app made for learning and portfolio purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;