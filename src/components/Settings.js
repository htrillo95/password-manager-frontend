import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // Keep the styling

const Settings = ({ username, onLogout }) => {
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // ✅ Apply the saved theme on component mount
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Toggle Light/Dark Mode
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // ✅ Change Username Functionality
  const handleChangeUsername = () => {
    if (!newUsername.trim()) {
      setMessage("Please enter a valid username.");
      return;
    }
    localStorage.setItem("loggedInUser", newUsername);
    setMessage("Username updated successfully!");
    setTimeout(() => setMessage(""), 2000);
  };

  // ✅ Delete Account Functionality
  const handleDeleteAccount = () => {
    if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) return;
    localStorage.removeItem("loggedInUser");
    navigate("/register");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col items-center py-6">
        <h2 className="text-2xl font-bold mb-8">PasswordVault</h2>
        <nav className="w-full px-4 space-y-6">
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700" onClick={() => navigate("/dashboard")}>
            Vault
          </button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700" onClick={() => navigate("/tools")}>
            Tools
          </button>
          <button className="w-full text-left py-2 px-4 rounded bg-gray-700">
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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Settings</h1>

        {message && (
          <div className="bg-green-100 dark:bg-green-800 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {/* ✅ Change Username */}
        <div className="mb-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Change Username</h2>
          <input
            type="text"
            placeholder="Enter new username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="px-4 py-2 border rounded w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleChangeUsername}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Username
          </button>
        </div>

        {/* ✅ Theme Switcher */}
        <div className="mb-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Theme</h2>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-300 text-black"}`}
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>

        {/* ✅ Delete Account */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h2>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </main>
    </div>
  );
};

export default Settings;