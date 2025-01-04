import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="content">
      <h1>Contact Us</h1>
      <p>
        Have questions about this project or feedback to share? Feel free to reach out via email at 
        <a href="mailto:demo@riverlock.com"> demo@riverlock.com</a>.
      </p>
      <p>
        <strong>Note:</strong> This is a demo app, so this email is not real!
      </p>
    </div>
  );
};

export default Contact;