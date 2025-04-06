import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact RiverLock</h1>
        <p>
        Found a bug or have feedback? Use the form to share your thoughts. Every bit helps as the project improves.
        </p>
      </div>

      <div className="contact-container">
        {/* Left Side - Contact Form */}
        <div className="contact-form-section">
          <h2 className="contact-heading">Share Your Feedback</h2>
          <p className="contact-description">
            Fill out the form below to leave a comment or report an issue.
          </p>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="contact-submit">
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side - Info Cards */}
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
            <p>Based in Philadelphia, PA
            <p>Made in VS Code, tested in Chrome</p>
            </p>
          </div>

          <div className="info-card">
            <h2>Heads Up</h2>
            <p>
            This isn’t a real business (but yes the email works). RiverLock is a demo app made for learning and portfolio purposes. Still, if you’ve got feedback or run into anything weird, feel free to send a message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;