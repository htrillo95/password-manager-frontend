import React from "react";
import "../styles/FAQ.css";

const FAQ = () => {
  const faqs = [
    {
      question: "What is RiverLock?",
      answer: "RiverLock is a fictional password manager demo for portfolio purposes.",
    },
    {
      question: "How secure is RiverLock?",
      answer: "This app uses industry-standard AES-256 encryption, ensuring data security.",
    },
    {
      question: "Can I use this app in production?",
      answer:
        "No, this is a demonstration project. It's not meant for real-world use without further development.",
    },
  ];

  return (
    <div className="content">
      <h1>Frequently Asked Questions</h1>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;