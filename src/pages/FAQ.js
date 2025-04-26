import React, { useState } from "react";
import "../styles/FAQ.css";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is RiverLock?",
      answer:
        "RiverLock is a personal project that shows how a working password manager could be built. It’s a real app, designed for learning and growth.",
    },
    {
      question: "How secure is RiverLock?",
      answer:
        "Passwords are encrypted using AES-256, one of the strongest encryption standards available. It's built with real protection methods you'd find in serious apps.",
    },
    {
      question: "Can I use this app for real passwords?",
      answer:
        "While RiverLock uses real encryption, it’s a personal project and not meant to replace dedicated password managers",
    },
    {
      question: "Is there a mobile version of RiverLock?",
      answer:
        "RiverLock works on mobile through your browser. A full mobile app isn't available (yet), but the site is responsive and built to work across devices",
    },
    {
      question: "Can I update the passwords I store in RiverLock?",
      answer:
        "Yes. Once you’re logged in, you can update the passwords for any accounts you’ve saved inside your vault.",
    },
    {
      question: "Can I connect RiverLock to other services?",
      answer:
        "Currently, RiverLock does not integrate with other services. Future versions may include integrations, but it is not available right now.",
    },
    {
      question: "What happens if I forget my master password?",
      answer:
        "RiverLock doesn’t store or recover your master password for security reasons. If you lose it, your vault can’t be accessed. Make sure to keep it safe."
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
      <div className="faq-divider"></div>

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