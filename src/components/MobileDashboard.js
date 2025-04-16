import React, { useState, useEffect } from "react";
import MobileSidebar from "./MobileSidebar";
import { useAppContext } from "../context/AppContext";
import { addPassword, deletePassword } from "../utils/api";

const MobileDashboard = ({ onLogout, isSidebarOpen, toggleSidebar }) => {
  const { username, accounts, setAccounts, fetchAccounts } = useAppContext();
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [editingPassword, setEditingPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAccounts(username);
  }, [username]);

  useEffect(() => {
    const filtered = accounts.filter((acc) =>
      acc.account_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAccounts(filtered);
    setCurrentPage(1);
  }, [accounts, searchQuery]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!newAccount || !newPassword) return showMessage("Please fill in all fields.");

    setLoading(true);
    try {
      const response = await addPassword(username, newAccount, newPassword);
      if (response.data.success) {
        const newEntry = { account_name: newAccount, password: newPassword };
        setAccounts([...accounts, newEntry]);
        setNewAccount("");
        setNewPassword("");
        showMessage("Account added successfully!");
        setShowForm(false);
      } else {
        showMessage("Failed to add account.");
      }
    } catch {
      showMessage("Failed to add account.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setEditingPassword(account.password);
  };

  const handleUpdateAccount = async () => {
    if (!editingAccount || !editingPassword) {
      showMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const updated = accounts.map((acc) =>
        acc.account_name === editingAccount.account_name
          ? { ...acc, password: editingPassword }
          : acc
      );
      setAccounts(updated);
      setEditingAccount(null);
      setEditingPassword("");
      showMessage("Account updated successfully!");
    } catch {
      showMessage("Error updating account.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (name) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;
    setLoading(true);
    try {
      const response = await deletePassword(username, name);
      if (response.data.success) {
        setAccounts(accounts.filter((acc) => acc.account_name !== name));
        showMessage("Account deleted successfully!");
      } else {
        showMessage("Failed to delete account.");
      }
    } catch {
      showMessage("Error deleting account.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (name) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSort = (criteria) => {
    const sorted =
      criteria === "alphabetical"
        ? [...filteredAccounts].sort((a, b) => a.account_name.localeCompare(b.account_name))
        : [...accounts];
    setFilteredAccounts(sorted);
  };

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["Account Name", "Password"],
      ...accounts.map((acc) => [acc.account_name, acc.password]),
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
    <div className="mobile-dashboard bg-gray-50 min-h-screen">
      <MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={onLogout} />
      <div className="mobile-content transition-all duration-300">
        <button onClick={toggleSidebar} className="p-4 text-2xl">☰</button>

        <main className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome, {username}</h1>
          <p className="text-gray-500 mb-5 text-sm">This is your password vault. Manage everything securely below.</p>

          <div className="bg-white rounded-lg shadow-md mb-5 transition-all duration-300">
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full p-3 text-left font-medium text-blue-700 border-b"
            >
              {showForm ? "➖ Hide New Account Form" : "➕ Add New Account"}
            </button>
            {showForm && (
              <form onSubmit={handleAddAccount} className="p-4 space-y-3 transition-all duration-300">
                <input
                  type="text"
                  placeholder="Account Name"
                  value={newAccount}
                  onChange={(e) => setNewAccount(e.target.value)}
                  className="form-input border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input border border-gray-300 rounded pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-sm text-blue-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <button type="submit" className="button bg-green-500 text-white py-2 px-4 rounded">
                  {loading ? "Adding..." : "Add Account"}
                </button>
              </form>
            )}
          </div>

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}

          <input
            type="text"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Manage Accounts</h2>
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="sort-dropdown p-2 border rounded bg-white text-sm"
            >
              <option value="default">Sort by: Default</option>
              <option value="alphabetical">Sort A–Z</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {paginatedAccounts.length === 0 ? (
              <p className="text-gray-500 px-4 py-6 text-center">No accounts yet. Start by adding one above!</p>
            ) : (
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="py-2 px-4 text-left">Account</th>
                    <th className="py-2 px-4 text-left">Password</th>
                    <th className="py-2 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAccounts.map((acc) => (
                    <tr key={acc.account_name} className="border-b border-gray-200">
                      <td className="py-2 px-4">{acc.account_name}</td>
                      <td className="py-2 px-4">
                        {passwordVisibility[acc.account_name] ? acc.password : "••••••••"}
                        <button onClick={() => togglePasswordVisibility(acc.account_name)} className="ml-2 text-blue-500">
                          {passwordVisibility[acc.account_name] ? "Hide" : "Show"}
                        </button>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button onClick={() => handleEditAccount(acc)} className="text-blue-500">Edit</button>
                        <button onClick={() => handleDeleteAccount(acc.account_name)} className="ml-2 text-red-500">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded border ${
                currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50"
              }`}
            >
              ← Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded border ${
                currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50"
              }`}
            >
              Next →
            </button>
          </div>

          <div className="flex flex-col items-center mt-6">
            <button onClick={handleExportCSV} className="bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600">
              Export to CSV
            </button>
            <p className="text-xs text-gray-500 mt-2">
              You’ve saved {filteredAccounts.length} {filteredAccounts.length === 1 ? "account" : "accounts"}.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MobileDashboard;