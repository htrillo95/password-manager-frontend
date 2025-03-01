import React, { useState, useEffect } from "react";
import axios from "axios";
import MobileSidebar from "./MobileSidebar"; // Importing the sidebar component

const MobileDashboard = ({ username, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [accounts, setAccounts] = useState([]); // All stored accounts
  const [filteredAccounts, setFilteredAccounts] = useState([]); // Filtered accounts
  const [newAccount, setNewAccount] = useState(""); // New account input
  const [newPassword, setNewPassword] = useState(""); // New password input
  const [editingAccount, setEditingAccount] = useState(null); // Account being edited
  const [editingPassword, setEditingPassword] = useState(""); // New password for editing
  const [message, setMessage] = useState(""); // Feedback message
  const [loading, setLoading] = useState(false); // Loading state
  const [passwordVisibility, setPasswordVisibility] = useState({}); // Password visibility for stored accounts
  const [currentPage, setCurrentPage] = useState(1); // Current pagination page
  const itemsPerPage = 5; // Number of accounts per page

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch accounts when the component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/accounts", {
          params: { username },
        });

        setAccounts(response.data.accounts);
        setFilteredAccounts(response.data.accounts);
      } catch (error) {
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
        const updatedAccounts = [...filteredAccounts, { account_name: newAccount, password: newPassword }];
        setAccounts(updatedAccounts);
        setFilteredAccounts(updatedAccounts);

        setNewAccount("");
        setNewPassword("");
        setMessage("Account added successfully!");
      } else {
        setMessage("Failed to add account.");
      }
    } catch (error) {
      setMessage("Failed to add account.");
    } finally {
      setLoading(false);
    }
  };

  // Edit an account
  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setEditingPassword(account.password);
  };

  // Update an account
  const handleUpdateAccount = async () => {
    if (!editingAccount || !editingPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

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
        setMessage("Failed to update account.");
      }
    } catch (error) {
      setMessage("Error updating account.");
    } finally {
      setLoading(false);
    }
  };

  // Delete an account
  const handleDeleteAccount = async (accountName) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;

    setLoading(true);
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/passwords/${accountName}`, {
        data: { username },
      });

      if (response.data.success) {
        const updatedAccounts = accounts.filter((account) => account.account_name !== accountName);
        setAccounts(updatedAccounts);
        setFilteredAccounts(updatedAccounts);
        setMessage("Account deleted successfully!");
      } else {
        setMessage("Failed to delete account.");
      }
    } catch (error) {
      setMessage("Error deleting account.");
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

  // Pagination logic
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
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
  };

  // Export to CSV
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

  return (
    <div className="mobile-dashboard">
      <MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : ""}`}>
        <button onClick={toggleSidebar} className="p-4 text-2xl">
          ☰ {/* Hamburger icon */}
        </button>

        <main className="p-4">
  <h1 className="text-2xl font-bold text-gray-800 mb-4">
    Your Password Vault - Welcome, {username}
  </h1>
  <div className="border-t border-gray-300 mb-6"></div>

          <form onSubmit={handleAddAccount} className="mb-6 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">
              Add New Account{" "}
              <span className="text-gray-500 text-sm">(e.g., Gmail, Netflix, Amazon)</span>
            </h2>
            <input
              type="text"
              placeholder="Account Name"
              value={newAccount}
              onChange={(e) => setNewAccount(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
              {loading ? "Adding..." : "Add Account"}
            </button>
          </form>

          <div className="border-t border-gray-300 mb-6"></div>

          <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
            Manage Accounts
            <select onChange={(e) => handleSort(e.target.value)} className="p-2 border rounded">
              <option value="default">Sort by: Default</option>
              <option value="alphabetical">Sort A-Z</option>
            </select>
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            View, edit, or delete your saved accounts below. Use "Show" to reveal passwords.
          </p>

          <table className="min-w-full table-auto overflow-x-auto">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-2 px-4 text-left">Account Name</th>
                <th className="py-2 px-4 text-left">Password</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAccounts.map((account) => (
                <tr key={account.account_name} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{account.account_name}</td>
                  <td className="py-2 px-4">
                    {passwordVisibility[account.account_name] ? account.password : "••••••••"}
                    <button
                      onClick={() => setPasswordVisibility((prev) => ({
                        ...prev,
                        [account.account_name]: !prev[account.account_name],
                      }))}
                      className="ml-2 text-blue-500"
                    >
                      {passwordVisibility[account.account_name] ? "Hide" : "Show"}
                    </button>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button onClick={() => setEditingAccount(account)} className="text-blue-500">Edit</button>
                    <button onClick={() => handleDeleteAccount(account.account_name)} className="ml-2 text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-4">
            <button onClick={handleExportCSV} className="bg-purple-500 text-white p-2 rounded">
              Export to CSV
            </button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MobileDashboard;