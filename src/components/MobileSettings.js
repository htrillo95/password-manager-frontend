import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import MobileSidebar from "./MobileSidebar";
import { updateUsername, deleteUserAccount } from "../utils/api";

const MobileSettings = ({ onLogout }) => {
  const { username, setUsername, fetchAccounts } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setMessage("");
  };

  const handleChangeUsername = async () => {
    const storedUsername = localStorage.getItem("loggedInUser");

    if (!currentUsername.trim() || !newUsername.trim()) {
      setMessage("Please enter both your current and new username.");
      return;
    }
    if (currentUsername === newUsername) {
      setMessage("New username cannot be the same as the current username.");
      return;
    }
    if (currentUsername !== storedUsername) {
      setMessage("Current username does not match our records.");
      return;
    }
    if (!window.confirm(`Are you sure you want to change your username to "${newUsername}"?`)) return;

    try {
      const response = await updateUsername(currentUsername, newUsername);
      const data = await response.json();

      if (data.success) {
        setMessage("✅ Username updated successfully!");
        setTimeout(() => {
          setUsername(newUsername);
          localStorage.setItem("loggedInUser", newUsername);
          fetchAccounts(newUsername);
          setCurrentUsername("");
          setNewUsername("");
          setMessage("");
        }, 2000);
      } else {
        setMessage(`⚠️ ${data.message}`);
      }
    } catch {
      setMessage("❌ Error updating username. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "delete my account") {
      setMessage("You must type 'delete my account' exactly to proceed.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) return;

    try {
      const response = await deleteUserAccount(username);

      if (response.ok) {
        localStorage.removeItem("loggedInUser");
        setUsername("");
        onLogout();
      } else {
        const data = await response.json();
        setMessage(data.message || "Failed to delete account.");
      }
    } catch {
      setMessage("Error deleting account. Please try again.");
    }
  };

  return (
    <div className="mobile-settings min-h-screen bg-gradient-to-br from-white to-slate-200">
      <MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={onLogout} />
      <div className="mobile-content transition-all duration-300">
        <button onClick={toggleSidebar} className="p-4 text-2xl">☰</button>

        <main className="p-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {message}
            </div>
          )}

          {/* Change Username */}
          <div className="border-t border-gray-200 my-6"></div>
          <div className="mb-6 bg-white shadow-md border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Change Username</h2>
            <p className="text-sm text-gray-600 mb-3">
              Enter your <strong>current username</strong> and the new username you'd like to switch to.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Current Username</label>
                <input
                  type="text"
                  placeholder="Enter current username"
                  value={currentUsername}
                  onChange={handleInputChange(setCurrentUsername)}
                  className="px-4 py-2 border rounded w-full bg-gray-100 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">New Username</label>
                <input
                  type="text"
                  placeholder="Enter new username"
                  value={newUsername}
                  onChange={handleInputChange(setNewUsername)}
                  className="px-4 py-2 border rounded w-full bg-gray-100 text-gray-900"
                />
              </div>
              <button
                onClick={handleChangeUsername}
                disabled={
                  !currentUsername.trim() ||
                  !newUsername.trim() ||
                  currentUsername === newUsername
                }
                className={`bg-blue-500 text-white px-4 py-2 rounded ${
                  (!currentUsername.trim() ||
                    !newUsername.trim() ||
                    currentUsername === newUsername)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                Update Username
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-gray-200 my-6"></div>
          <div className="mb-6 bg-white shadow-md border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h2>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Deleting your account is irreversible.</strong> Please type
              <code className="bg-gray-200 px-1 ml-1">delete my account</code> below to confirm.
            </p>
            <input
              type="text"
              placeholder="Type 'delete my account' to confirm"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className="px-4 py-2 border rounded w-full bg-gray-100 text-gray-900 mb-3"
            />
            <button
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation !== "delete my account"}
              className={`bg-red-500 text-white px-4 py-2 rounded ${
                deleteConfirmation !== "delete my account"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-600"
              }`}
            >
              Delete Account
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MobileSettings;