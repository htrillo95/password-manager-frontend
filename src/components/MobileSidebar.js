import React from "react";
import { useNavigate } from "react-router-dom"; // Importing React Router for navigation

const MobileSidebar = ({ isOpen, toggleSidebar, onLogout }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleNavigate = (route) => {
    toggleSidebar(); // Close the sidebar when a link is clicked
    navigate(route); // Navigate to the desired route
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-3/4 h-full bg-gray-800 text-white p-4 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close Menu Button */}
      <button
        onClick={toggleSidebar}
        className="text-white text-xl absolute top-4 right-4 p-2"
      >
        X {/* Close button */}
      </button>

      {/* Navigation Links */}
      <nav className="mt-16">
        <button
          onClick={() => handleNavigate("/dashboard")}
          className="w-full text-left py-2 px-4 rounded hover:bg-gray-700"
        >
          Vault
        </button>
        <button
          onClick={() => handleNavigate("/tools")}
          className="w-full text-left py-2 px-4 rounded hover:bg-gray-700"
        >
          Tools
        </button>
        <button
          onClick={() => handleNavigate("/settings")}
          className="w-full text-left py-2 px-4 rounded hover:bg-gray-700"
        >
          Settings
        </button>
      </nav>

      {/* Logout Button */}
      <button
        onClick={onLogout} // Call the onLogout function passed from the parent
        className="w-full text-left py-2 px-4 rounded bg-red-600 hover:bg-red-700 mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default MobileSidebar;