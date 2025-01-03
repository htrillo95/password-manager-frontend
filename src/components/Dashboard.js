import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ username, onLogout }) => {
  const [accounts, setAccounts] = useState([]); // All stored accounts
  const [filteredAccounts, setFilteredAccounts] = useState([]); // Filtered accounts for search
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [newAccount, setNewAccount] = useState(""); // New account input
  const [newPassword, setNewPassword] = useState(""); // New password input
  const [selectedAccount, setSelectedAccount] = useState(null); // Selected account for modal
  const [message, setMessage] = useState(""); // Feedback message
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch accounts on component load
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/accounts", {
          params: { username },
        });
        setAccounts(response.data.accounts || []);
        setFilteredAccounts(response.data.accounts || []);
      } catch (error) {
        console.error("Error fetching accounts:", error);
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
        account: newAccount,
        password: newPassword,
      });
      const newEntry = { name: newAccount, password: newPassword };
      setAccounts((prev) => [...prev, newEntry]);
      setFilteredAccounts((prev) => [...prev, newEntry]);
      setNewAccount("");
      setNewPassword("");
      setMessage("Account added successfully!");
    } catch (error) {
      console.error("Error adding account:", error);
      setMessage("Failed to add account.");
    } finally {
      setLoading(false);
    }
  };

  // Delete an account
  const handleDeleteAccount = async (accountName) => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:5000/accounts/${accountName}`, {
        params: { username },
      });
      setAccounts(accounts.filter((account) => account.name !== accountName));
      setFilteredAccounts(
        filteredAccounts.filter((account) => account.name !== accountName)
      );
      setSelectedAccount(null);
      setMessage(`Account "${accountName}" deleted successfully.`);
    } catch (error) {
      console.error("Error deleting account:", error);
      setMessage("Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredAccounts(
      accounts.filter((account) =>
        account.name.toLowerCase().includes(query)
      )
    );
  };

  // Display modal for selected account
  const handleAccountClick = (account) => {
    setSelectedAccount(account);
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

        {/* Notification Message */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {/* Add New Account */}
        <form
          onSubmit={handleAddAccount}
          className="mb-6 bg-white shadow-md rounded-lg p-4"
          autoComplete="off" // Disabling autofill
        >
          {/* Hidden fields to trick browsers */}
          <input type="text" style={{ display: "none" }} autoComplete="off" />
          <input type="password" style={{ display: "none" }} autoComplete="off" />
          <h2 className="text-lg font-semibold mb-4">Add New Account</h2>
          <div className="flex space-x-4">
            <input
              id="new-account-name"
              type="text"
              placeholder="Account Name"
              value={newAccount}
              onChange={(e) => setNewAccount(e.target.value)}
              className="flex-1 px-4 py-2 border rounded"
              autoComplete="new-account" // Custom autocomplete to prevent autofill
              name="newAccount"
            />
            <input
              id="new-account-password"
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="flex-1 px-4 py-2 border rounded"
              autoComplete="new-password" // Custom autocomplete to prevent autofill
              name="newPassword"
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
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Stored Accounts
          </h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredAccounts.map((account, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleAccountClick(account)}
                  >
                    <td className="py-3 px-6">{account.name}</td>
                    <td className="py-3 px-6 text-center">
                      <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Account Details Modal */}
        {selectedAccount && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
              <h2 className="text-xl font-semibold mb-4">
                {selectedAccount.name}
              </h2>
              <p>
                <strong>Username:</strong> {username}
              </p>
              <p>
                <strong>Password:</strong> {selectedAccount.password || "*****"}
              </p>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDeleteAccount(selectedAccount.name)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;