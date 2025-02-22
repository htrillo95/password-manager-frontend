import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom"; 
import Settings from "./Settings";

const Dashboard = ({ username, onLogout }) => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]); // All stored accounts
  const [filteredAccounts, setFilteredAccounts] = useState([]); // Filtered accounts for search
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [newAccount, setNewAccount] = useState(""); // New account input
  const [newPassword, setNewPassword] = useState(""); // New password input
  const [editingAccount, setEditingAccount] = useState(null); // Account being edited
  const [editingPassword, setEditingPassword] = useState(""); // New password for editing
  const [message, setMessage] = useState(""); // Feedback message
  const [loading, setLoading] = useState(false); // Loading state
  const [passwordVisibility, setPasswordVisibility] = useState({}); // Password visibility for stored accounts
  const [currentPage, setCurrentPage] = useState(1); // Current pagination page
  const itemsPerPage = 5; // Number of accounts per page
  const [showInstructions, setShowInstructions] = useState(true); // New state for instruction box

  // Fetch accounts on component load
// ✅ Extract fetchAccounts function outside useEffect so it's reusable
const fetchAccounts = async (username) => {
  if (!username) return; // 🔥 Ensures username exists before making API call

  try {
    const response = await axios.get("http://127.0.0.1:5000/accounts", {
      params: { username },
    });

    if (response.data.success) {
      setAccounts(response.data.accounts);
      setFilteredAccounts(response.data.accounts);
      setMessage("");
    } else {
      setMessage(response.data.message || "Failed to load accounts.");
    }
  } catch (error) {
    console.error("Error fetching accounts:", error);
    setMessage("Failed to load accounts.");
  }
};

// ✅ UseEffect still calls fetchAccounts on mount & username change
useEffect(() => {
  fetchAccounts(username);
}, [username]); // 🔥 Runs when username changes


  // Reset pagination whenever filteredAccounts change
useEffect(() => {
  setCurrentPage(1); // ✅ Resets to page 1 when filteredAccounts change
}, [filteredAccounts]); // ✅ Second useEffect, separate from the first one



  // UI Enhancements - Dismissible Instructions
const handleDismissInstructions = () => {
  setShowInstructions(false);
};

  // Add a new account
  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!newAccount || !newPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (filteredAccounts.some((acc) => acc.account_name === newAccount)) {
      setMessage("This account name already exists.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/passwords", {
        username,
        account_name: newAccount,
        password: newPassword,
      });

      if (response.data.success) {
        const newEntry = { account_name: newAccount, password: newPassword };
        const updatedAccounts = [...filteredAccounts, newEntry];

        setAccounts(updatedAccounts);
        setFilteredAccounts(updatedAccounts);

        // Recalculate total pages and navigate to the last page
        const newTotalPages = Math.ceil(updatedAccounts.length / itemsPerPage);
        setCurrentPage(newTotalPages);

        setPasswordVisibility((prev) => ({
          ...prev,
          [newAccount]: false,
        }));

        setNewAccount("");
        setNewPassword("");
        setMessage("Account added successfully!");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error adding account:", error);
      setMessage("Failed to add account.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = accounts.filter(
      (account) =>
        account.account_name &&
        account.account_name.toLowerCase().includes(query)
    );
    setFilteredAccounts(filtered);
    setCurrentPage(1); // Reset to the first page on new search
  };

  // Handle sorting
  const handleSort = (criteria) => {
    let sorted;
    if (criteria === "alphabetical") {
      sorted = [...filteredAccounts].sort((a, b) =>
        a.account_name.localeCompare(b.account_name)
      );
    } else {
      sorted = [...accounts]; // Reset to original order
    }
    setFilteredAccounts(sorted);
    setCurrentPage(1); // ✅ Reset to first page after sorting
  };

  // Export accounts to CSV
  const handleExportCSV = () => {
    const csvContent = [
      ["Account Name", "Password"], // Add headers
      ...accounts.map((account) => [account.account_name, account.password]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "accounts.csv";
    link.click();
  };

  // Start editing an account
  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setEditingPassword(account.password);
  };

  // Handle updating the account
  const handleUpdateAccount = async () => {
    if (!editingAccount || !editingPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!window.confirm("Are you sure you want to update this account?")) return;

    setLoading(true);
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/passwords/${editingAccount.account_name}`,
        {
          username,
          password: editingPassword,
        }
      );

      if (response.data.success) {
        const updatedAccounts = accounts.map((account) =>
          account.account_name === editingAccount.account_name
            ? { ...account, password: editingPassword }
            : account
        );
        setAccounts(updatedAccounts);
        setFilteredAccounts(updatedAccounts);
        setEditingAccount(null);
        setEditingPassword("");
        setMessage("Account updated successfully!");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error updating account:", error);
      setMessage("Failed to update account.");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting an account
  const handleDeleteAccount = async (accountName) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;

    setLoading(true);
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/passwords/${accountName}`,
        {
          data: { username },
        }
      );

      if (response.data.success) {
        const updatedAccounts = accounts.filter(
          (account) => account.account_name !== accountName
        );
        setAccounts(updatedAccounts);
        setFilteredAccounts(updatedAccounts);
        setMessage("Account deleted successfully!");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setMessage("Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (accountName) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [accountName]: !prev[accountName],
    }));
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  // Get the accounts for the current page
  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Move to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Move to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col items-center py-6">
        <h2 className="text-2xl font-bold mb-8">PasswordVault</h2>
        <nav className="w-full px-4 space-y-6">
          <button
            className="w-full text-left py-2 px-4 rounded hover:bg-gray-700"
            onClick={() => navigate("/dashboard")}  // ⬅️ Vault sends user to Dashboard
          >
            Vault
          </button>
          <button
            className="w-full text-left py-2 px-4 rounded hover:bg-gray-700"
            onClick={() => navigate("/tools")}  // ⬅️ Tools page
          >
            Tools
          </button>
          <button
            className="w-full text-left py-2 px-4 rounded hover:bg-gray-700"
            onClick={() => navigate("/settings")}  // ⬅️ Settings page
          >
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {username}
        </h1>
    
        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {/* Add Account */}
        <form
          onSubmit={handleAddAccount}
          className="mb-6 bg-white shadow-md rounded-lg p-4"
          autoComplete="off"
        >
          <h2 className="text-lg font-semibold mb-4">Add New Account <span className="text-gray-500 text-sm">(e.g., Gmail, Netflix, Amazon)</span>
</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Account Name"
              value={newAccount}
              onChange={(e) => setNewAccount(e.target.value)}
              className="flex-1 px-4 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="flex-1 px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>

        {/* Divider */}
        <hr className="my-4 border-gray-300" />
        <h2 className="text-xl font-semibold mb-2">Manage Your Accounts</h2>
        <p className="text-gray-700 text-base mb-4">
          View, edit, or delete your saved accounts below. Use "Show" to reveal passwords.
        </p>
        {/* Sorting and Export Options */}
        <div className="flex space-x-4 mb-4 items-center">
        {/* Sorting Dropdown */}
        <div className="sort-container">
            <label htmlFor="sortOptions" className="sort-label">Sort by:</label>
            <select
            id="sortOptions"
            onChange={(e) => handleSort(e.target.value)}
            className="sort-dropdown"
            >
            <option value="default">Default</option>
            <option value="alphabetical">Sort A-Z</option>
            </select>
        </div>

        {/* Export Button */}
        <button
            onClick={handleExportCSV}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
            Export to CSV
        </button>
        </div>

        {/* Vault Table */}
        <section className="overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Stored Accounts ({filteredAccounts.length})
          </h2>
          <div className="bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Password</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
  {paginatedAccounts.length > 0 ? (
    paginatedAccounts.map((account, index) => {
      
      return (
        <tr
          key={account.account_name}
          className={`border-b hover:bg-gray-100 ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          }`}
        >
          <td className="py-3 px-6">{account.account_name}</td>
          <td className="py-3 px-6">
            {passwordVisibility[account.account_name] ? account.password : "••••••••"}
            <button
              onClick={() => togglePasswordVisibility(account.account_name)}
              className="ml-2 text-blue-500"
            >
              {passwordVisibility[account.account_name] ? "Hide" : "Show"}
            </button>
          </td>
          <td className="py-3 px-6 text-center">
            <div className="action-buttons">
              {editingAccount?.account_name === account.account_name ? (
                <>
                  <input
                    type="password"
                    value={editingPassword}
                    onChange={(e) => setEditingPassword(e.target.value)}
                    className="px-2 py-1 border rounded"
                  />
                  <button onClick={handleUpdateAccount} className="edit-btn">
                    Save
                  </button>
                  <button onClick={() => setEditingAccount(null)} className="cancel-btn">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button title="Edit this account" onClick={() => handleEditAccount(account)} className="edit-btn">
                    Edit
                  </button>
                  <button title="Delete this account" onClick={() => handleDeleteAccount(account.account_name)} className="delete-btn">
                    Delete
                  </button>
                </>
              )}
            </div>
          </td>
        </tr>
      );
    }) // ✅ Now this function is correctly formatted
  ) : (
    <tr>
      <td colSpan="3" className="py-3 px-6 text-center text-gray-500">
        No accounts available.
      </td>
    </tr>
  )}
</tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;