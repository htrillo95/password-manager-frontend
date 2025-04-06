import React, { useState } from "react";
import "../styles/FAQ.css";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is RiverLock?",
      answer:
        "RiverLock is a demo project that shows a password manager built for portfolio purposes. It is a prototype and is not meant for real password storage.",
    },
    {
      question: "How secure is RiverLock?",
      answer:
        "RiverLock uses AES 256 encryption to protect your data. This encryption standard is trusted by banks and government agencies for its strong security.",
    },
    {
      question: "Can I use this app for real passwords?",
      answer:
        "No, this app is a demo. It is not designed for storing actual passwords securely.",
    },
    {
      question: "Is there a mobile version of RiverLock?",
      answer:
        "At this time, RiverLock is available only as a web application. A mobile version may be developed in the future, but it is not available now.",
    },
    {
      question: "How do I change my password?",
      answer:
        "You can change your password by going to the settings page and selecting Change Password. The process is simple and straightforward.",
    },
    {
      question: "Can I connect RiverLock to other services?",
      answer:
        "Currently, RiverLock does not integrate with other services. Future versions may include integrations, but it is not available right now.",
    },
    {
      question: "What happens if I forget my master password?",
      answer:
        "For security reasons, we do not store your master password. Please keep it safe because if you lose it, there is no way to recover it.",
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
            <div className="faq-question" onClick={() => handleToggle(index)}>
              <i
                className={`fas fa-chevron-${
                  activeIndex === index ? "up" : "down"
                }`}
              ></i>
              {faq.question}
            </div>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.p
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;