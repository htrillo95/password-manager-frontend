import React from "react";

const MobileSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 w-3/4 h-full bg-gray-800 text-white p-4 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="text-white text-xl absolute top-4 right-4"
      >
        Close Menu
      </button>

      {/* Navigation links */}
      <nav className="mt-16">
        <button
          onClick={() => alert("Navigate to Dashboard")}
          className="w-full text-left py-2 px-4 rounded hover:bg-gray-700"
        >
          Vault
        </button>
        <button
          onClick={() => alert("Navigate to Tools")}
          className="w-full text-left py-2 px-4 rounded hover:bg-gray-700"
        >
          Tools
        </button>
        <button
          onClick={() => alert("Navigate to Settings")}
          className="w-full text-left py-2 px-4 rounded hover:bg-gray-700"
        >
          Settings
        </button>
      </nav>
    </div>
  );
};

export default MobileSidebar;