import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css"; // Custom CSS file

const Dashboard = ({ username, onLogout }) => {
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

  // Fetch accounts on component load
  useEffect(() => {
    const fetchAccounts = async () => {
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

    fetchAccounts();
  }, [username]);

  // Add a new account
  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!newAccount || !newPassword) {
      setMessage("Please fill in all fields.");
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
        setAccounts((prev) => [...prev, newEntry]);
        setFilteredAccounts((prev) => [...prev, newEntry]);
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col items-center py-6">
        <h2 className="text-2xl font-bold mb-8">PasswordVault</h2>
        <nav className="w-full px-4 space-y-6">
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700">
            Vault
          </button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700">
            Tools
          </button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700">
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
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {username}
        </h1>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {/* Add Account */}
        <form onSubmit={handleAddAccount} className="mb-6 bg-white shadow-md rounded-lg p-4" autoComplete="off">
          <h2 className="text-lg font-semibold mb-4">Add New Account</h2>
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

        {/* Search Bar */}
        <div className="flex items-center bg-white shadow-md rounded-lg px-4 py-3 mb-6">
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={handleSearch}
            className="flex-1 outline-none bg-gray-50 px-2 py-1 rounded-lg"
          />
        </div>

        {/* Vault Table */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Stored Accounts</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Password</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <tr
                      key={account.account_name}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="py-3 px-6">{account.account_name}</td>
                      <td className="py-3 px-6">
                        {passwordVisibility[account.account_name]
                          ? account.password
                          : "••••••••"}
                        <button
                          onClick={() =>
                            togglePasswordVisibility(account.account_name)
                          }
                          className="ml-2 text-blue-500"
                        >
                          {passwordVisibility[account.account_name]
                            ? "Hide"
                            : "Show"}
                        </button>
                      </td>
                      <td className="py-3 px-6 text-center space-x-2">
                        {editingAccount?.account_name ===
                        account.account_name ? (
                          <>
                            <input
                              type="password"
                              value={editingPassword}
                              onChange={(e) =>
                                setEditingPassword(e.target.value)
                              }
                              className="px-2 py-1 border rounded"
                            />
                            <button
                              onClick={handleUpdateAccount}
                              className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingAccount(null)}
                              className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditAccount(account)}
                              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteAccount(account.account_name)
                              }
                              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-3 px-6 text-center text-gray-500"
                    >
                      No accounts available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;