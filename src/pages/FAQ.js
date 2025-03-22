import React from "react";
import "../styles/FAQ.css";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is RiverLock?",
      answer: "RiverLock is a fictional password manager demo for portfolio purposes. It's here to show off some great features, but don't try to store your personal passwords just yet.",
    },
    {
      question: "How secure is RiverLock?",
      answer:
        "This app uses industry-standard AES-256 encryption, ensuring data security. AES-256 encrypts your passwords with a 256-bit key, making them virtually impossible to decrypt without the correct key.",
    },
    {
      question: "Can I use this app in production?",
      answer:
        "Nope. This is a demo project, not ready for production.",
    },
    {
      question: "Is there a mobile app for RiverLock?",
      answer:
        "Currently, RiverLock is a web-based platform, but a mobile app may be developed in the future. We'll let you know if that happens—just keep an eye out.",
    },
    {
      question: "How do I change my password?",
      answer:
        "To change your password, go to settings and select 'Change Password.' It's that simple. No magic required.",
    },
    {
      question: "Can I integrate RiverLock with other services?",
      answer:
        "Currently, RiverLock does not support integration with third-party services. But who knows, in the future, maybe we'll be friends with other apps too.",
    },
    {
        question: "What happens if I forget my master password?",
        answer: "Unfortunately, we don’t store it for your security, so there’s no way to retrieve it. Be sure to keep it safe and secure!",
    },
  ];

  return (
    <div className="faq-container">
      <motion.h1
        className="faq-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Frequently Asked Questions
      </motion.h1>

      <div className="faq-items">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <motion.h3
              className="faq-question"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <i className="fas fa-question-circle"></i> {faq.question}
            </motion.h3>
            <motion.p className="faq-answer">{faq.answer}</motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;