import React from "react";
import { useNavigate } from "react-router-dom";

const MobileSidebar = ({ isOpen, toggleSidebar, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    toggleSidebar();
    navigate(route);
  };

  return (
    <div className={`mobile-sidebar ${isOpen ? "open" : ""} flex flex-col h-full bg-gray-800 text-white p-4`}>
      {/* Top section */}
      <div>
        {/* App Title */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">PasswordVault</h2>
          <button
            onClick={toggleSidebar}
            className="text-white text-xl p-2"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
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
      </div>

      {/* Divider (optional) */}
      <hr className="border-gray-700 my-6" />

      {/* Bottom Logout */}
      <div className="flex justify-center mt-auto">
        <button
          onClick={onLogout}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium shadow transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MobileSidebar;