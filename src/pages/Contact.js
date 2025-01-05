import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact RiverLock</h1>
        <p>
          Whether you have questions about our services, feedback, or just want to say hi, we're here to help.
        </p>
      </div>

      <div className="contact-container">
        {/* Left Side - Contact Form */}
        <div className="contact-form-section">
          <h2 className="contact-heading">Get in Touch</h2>
          <p className="contact-description">
            Fill out the form below, and someone from our team will reach out shortly.
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

        {/* Right Side - Filler Content */}
        <div className="contact-info-section">
          <div className="info-card">
            <h2>Why Contact Us?</h2>
            <p>
              RiverLock is dedicated to providing top-tier service. Reach out to us for:
            </p>
            <ul>
              <li>Questions about our features</li>
              <li>Support with your account</li>
              <li>Business or partnership inquiries</li>
            </ul>
          </div>

          <div className="info-card">
            <h2>Our Address</h2>
            <p>123 RiverLock Lane</p>
            <p>Fictional City, FA 45678</p>
          </div>

          <div className="info-card">
            <h2>Working Hours</h2>
            <p>Mon - Fri: 9am - 5pm</p>
            <p>Sat - Sun: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;