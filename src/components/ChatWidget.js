import React, { useState, useRef, useEffect } from "react";

const ChatWidget = () => {
  /* ---------- state ---------- */
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm RiverBot. What would you like to know?",
      sender: "bot",
      options: [
        "What is RiverLock?",
        "Is this secure?",
        "How do I get started?",
        "Who built this?",
        "What are the features?",
        "Is this a real password manager?",
        "Can I see the code?",
      ],
    },
  ]);

  // --- auto-scroll ref ---
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /* ---------- knowledge base ---------- */
  const responseMap = {
    "What is RiverLock?":
      "RiverLock is a personal portfolio project that mimics a password manager. It's not a real service, just a full stack demo.",
    "Is this secure?":
      "It follows secure best practices like hashing, but it isn’t meant for real passwords. Treat it as a demo only.",
    "How do I get started?":
      "First register or log in if you already have an account. Add a few demo accounts to explore the vault and export features.",
    "Who built this?":
      "RiverLock was created by Hector T. using React, Node, and PostgreSQL to showcase full stack skills.",
    "What are the features?":
      "Key features: add accounts, search, password visibility toggle, CSV export, mobile friendly layout.",
    "Is this a real password manager?":
      "Nope,it's strictly a showcase of code & UX skills, not a production grade password manager.",
    "Can I see the code?":
      "Absolutely! The project is open source. Ask Hector for the GitHub link if you’d like to dig in.",
  };

  /* ---------- click handler ---------- */
  const handleOptionClick = (option) => {
    const reply = responseMap[option] || "Sorry, I don’t have info on that.";

    setMessages((prev) => [
      ...prev,
      { text: option, sender: "user" },
      {
        text: reply,
        sender: "bot",
        options: Object.keys(responseMap), // show the menu again
      },
    ]);
  };

  /* ---------- render ---------- */
  return (
    <>
      {/* floating toggle button + tooltip */}
      <div className="fixed bottom-8 left-4 z-50 group">
        <button
          aria-label="Open RiverBot"
          onClick={() => setIsOpen((o) => !o)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-xl flex items-center justify-center transition-transform hover:scale-105"
        >
          💬
        </button>
        {/* tooltip */}
        <span className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-xs py-1 px-2 rounded shadow">
          Ask&nbsp;RiverBot
        </span>
      </div>

      {/* chat panel */}
      {isOpen && (
        <div className="fixed bottom-40 left-4 z-50 w-80">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
            {/* header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">RiverBot</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-xl leading-none focus:outline-none"
              >
                ×
              </button>
            </div>

            {/* message list */}
            <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* option buttons (only render on bot messages with options) */}
                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full transition"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;