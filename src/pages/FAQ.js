import React, { useState } from "react";
import "../styles/FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

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
    {
      question: "How do I generate strong passwords?",
      answer: "RiverLock generates complex, unbreakable passwords with a single click.",
    },
    {
      question: "How can I access my vault across devices?",
      answer:
        "With RiverLock, your data syncs seamlessly across devices using our cloud backup system.",
    },
    {
      question: "How do I keep my data safe?",
      answer:
        "Your data is kept safe with AES-256 encryption and multi-factor authentication.",
    },
    {
      question: "Why is RiverLock called RiverLock?",
      answer:
        "It's a metaphor for a secure digital vault. The 'River' represents flow, and the 'Lock' represents security. It's simple, yet effective!",
    },
    {
      question: "Can RiverLock keep my snacks safe too?",
      answer:
        "Unfortunately, RiverLock specializes in digital security, not snack management. But hey, maybe we’ll add snack protection in the future!",
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <h1 className="faq-header">Frequently Asked Questions</h1>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => handleToggle(index)}
            >
              <h3>{faq.question}</h3>
              <span className={`faq-arrow ${activeIndex === index ? 'open' : ''}`}>
                {activeIndex === index ? "▲" : "▼"}
              </span>
            </div>
            <div className={`faq-answer ${activeIndex === index ? 'open' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;