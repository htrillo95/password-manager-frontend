import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // Keep the same styling

const Tools = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col items-center py-6">
        <h2 className="text-2xl font-bold mb-8">PasswordVault</h2>
        <nav className="w-full px-4 space-y-6">
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700" onClick={() => navigate("/dashboard")}>
            Vault
          </button>
          <button className="w-full text-left py-2 px-4 rounded bg-gray-700">
            Tools
          </button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700" onClick={() => navigate("/settings")}>
            Settings
          </button>
        </nav>
        <button
          onClick={onLogout}
          className="mt-auto w-11/12 py-2 px-4 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-hidden">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tools</h1>
        <p className="text-gray-600">This is where you'll add the password generator and strength checker.</p>
        {/* Add tool-related components here */}
      </main>
    </div>
  );
};

export default Tools;