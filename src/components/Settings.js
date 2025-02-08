import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Settings = ({ username, setUsername, onLogout }) => {
  const navigate = useNavigate();
  const [currentUsername, setCurrentUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Change Username Functionality with Confirmation
  const handleChangeUsername = async () => {
    const storedUsername = localStorage.getItem("loggedInUser");
  
    if (!currentUsername.trim() || !newUsername.trim()) {
      setMessage("Please enter both your current and new username.");
      return;
    }
  
    if (currentUsername !== storedUsername) {
      setMessage("Current username does not match our records.");
      return;
    }
  
    if (!window.confirm(`Are you sure you want to change your username to "${newUsername}"?`)) {
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5000/update-username", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_username: currentUsername, new_username: newUsername }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        setMessage("Username updated successfully!");
        setUsername(newUsername);
        localStorage.setItem("loggedInUser", newUsername); // ✅ Update after backend confirms
        setCurrentUsername(""); 
        setNewUsername("");
      } else {
        setMessage(data.message || "Failed to update username.");
      }
    } catch (error) {
      setMessage("Error updating username. Please try again.");
    }
  
    setTimeout(() => setMessage(""), 3000);
  };

  // ✅ Delete Account Functionality
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) return;
  
    try {
      const response = await fetch("http://127.0.0.1:5000/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }), // Send username to identify account
      });
  
      if (response.ok) {
        localStorage.removeItem("loggedInUser"); // Clear user session
        setUsername(""); // Reset state
        navigate("/login"); // ✅ Redirect to login
      } else {
        const data = await response.json();
        setMessage(data.message || "Failed to delete account.");
      }
    } catch (error) {
      setMessage("Error deleting account. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 overflow-hidden">
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {/* ✅ Change Username with Verification */}
        <div className="mb-8 bg-white shadow-md rounded-lg p-6 w-2/3">
          <h2 className="text-xl font-semibold mb-4">Change Username</h2>
          <p className="text-sm text-gray-600 mb-3">
            Enter your <strong>current username</strong> and the new username you'd like to switch to. Make sure this is a username you'll remember for future logins.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Current Username</label>
              <input
                type="text"
                placeholder="Enter current username"
                value={currentUsername}
                onChange={(e) => setCurrentUsername(e.target.value)}
                className="px-4 py-2 border rounded w-3/4 bg-gray-100 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">New Username</label>
              <input
                type="text"
                placeholder="Enter new username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="px-4 py-2 border rounded w-3/4 bg-gray-100 text-gray-900"
              />
            </div>
            <button
              onClick={handleChangeUsername}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Username
            </button>
          </div>
        </div>

        {/* ✅ Danger Zone (Account Deletion) */}
        <div className="bg-white shadow-md rounded-lg p-6 w-2/3">
          <h2 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h2>
          <p className="text-sm text-gray-600 mb-3">
            <strong>Deleting your account is irreversible.</strong> This will remove all your saved data.
          </p>
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