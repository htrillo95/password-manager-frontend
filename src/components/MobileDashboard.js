import React, { useState, useEffect } from "react";
import MobileSidebar from "./MobileSidebar";
import { useAppContext } from "../context/AppContext";
import { addPassword, deletePassword } from "../utils/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const MobileDashboard = ({ onLogout, isSidebarOpen, toggleSidebar }) => {
  const { username, accounts, setAccounts, fetchAccounts } = useAppContext();
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [editingAccount, setEditingAccount] = useState(null);
  const [editingPassword, setEditingPassword] = useState("");
  const [editingPasswordVisibility, setEditingPasswordVisibility] = useState({});
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
      const { data } = await addPassword(username, newAccount, newPassword);
      if (data.success) {
        const newEntry = { account_name: newAccount, password: newPassword };
        setAccounts((prev) => [...prev, newEntry]);
        setNewAccount("");
        setNewPassword("");
        showMessage("Account added successfully!");
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

  const handleUpdateAccount = () => {
    if (!editingPassword) return showMessage("Please fill in the new password.");
    const updated = accounts.map((acc) =>
      acc.account_name === editingAccount.account_name
        ? { ...acc, password: editingPassword }
        : acc
    );
    setAccounts(updated);
    setEditingAccount(null);
    setEditingPassword("");
    showMessage("Account updated successfully!");
  };

  const handleDeleteAccount = async (name) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;
    setLoading(true);
    try {
      const { data } = await deletePassword(username, name);
      if (data.success) {
        setAccounts((prev) => prev.filter((acc) => acc.account_name !== name));
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

  const toggleVisibility = (stateSetter, name) => {
    stateSetter((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  const handleSort = (criteria) => {
    const sorted =
      criteria === "alphabetical"
        ? [...filteredAccounts].sort((a, b) => a.account_name.localeCompare(b.account_name))
        : [...accounts];
    setFilteredAccounts(sorted);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["Account Name", "Password"],
      ...accounts.map(({ account_name, password }) => [account_name, password]),
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
    <div className="mobile-dashboard min-h-screen bg-gradient-to-br from-white to-slate-200 animate-background-flow">
      <MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={onLogout} />
      <div className="mobile-content transition-all duration-300">
        <button onClick={toggleSidebar} className="p-4 text-2xl">☰</button>
        <main className="p-4">
          {/* Welcome Box */}
          <div className="rounded-lg bg-gradient-to-r from-slate-100 to-slate-200 border px-4 py-3 mb-4 shadow-sm">
            <h1 className="text-xl font-semibold">Welcome, {username}</h1>
            <p className="text-sm opacity-90">Manage your passwords below.</p>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          {/* Add New Account */}
          <div className="bg-white rounded-lg shadow-md border mb-5">
            <button onClick={() => setShowForm(!showForm)} className="w-full p-3 text-left font-medium text-blue-700 border-b">
              {showForm ? "➖ Hide New Account Form" : "➕ Add New Account"}
            </button>
            {showForm && (
              <form onSubmit={handleAddAccount} className="p-4 space-y-3">
                <input
                  type="text"
                  placeholder="Account Name"
                  value={newAccount}
                  onChange={(e) => setNewAccount(e.target.value)}
                  className="form-input"
                />
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute top-1/3 right-3 -translate-y-1/4 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
                <button type="submit" className="button bg-green-500 text-white">
                  {loading ? "Adding..." : "Add Account"}
                </button>
              </form>
            )}
          </div>

          {/* Messages */}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}

          {/* Search and Sort */}
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input w-full p-2 mb-3"
          />
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Manage Accounts</h2>
            <select onChange={(e) => handleSort(e.target.value)} className="sort-dropdown p-2">
              <option value="default">Sort by: Default</option>
              <option value="alphabetical">Sort A–Z</option>
            </select>
          </div>

          {/* Accounts Table */}
          <div className="bg-white rounded-lg shadow-sm border">
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
                  {paginatedAccounts.map((acc, index) => (
                    <tr key={`${acc.account_name}-${index}`} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{acc.account_name}</td>
                      <td className="py-2 px-4">
                        {editingAccount?.account_name === acc.account_name ? (
                          <div className="relative">
                            <input
                              type={editingPasswordVisibility[acc.account_name] ? "text" : "password"}
                              value={editingPassword}
                              onChange={(e) => setEditingPassword(e.target.value)}
                              className="form-input w-full pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => toggleVisibility(setEditingPasswordVisibility, acc.account_name)}
                              className="absolute top-1/3 right-3 -translate-y-1/4 text-gray-400 hover:text-gray-600"
                            >
                              {editingPasswordVisibility[acc.account_name] ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="mr-2">{passwordVisibility[acc.account_name] ? acc.password : "••••••••"}</span>
                            <button
                              type="button"
                              onClick={() => toggleVisibility(setPasswordVisibility, acc.account_name)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {passwordVisibility[acc.account_name] ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {editingAccount?.account_name === acc.account_name ? (
                          <button onClick={handleUpdateAccount} className="text-blue-500">Save</button>
                        ) : (
                          <button onClick={() => handleEditAccount(acc)} className="text-blue-500">Edit</button>
                        )}
                        <button onClick={() => handleDeleteAccount(acc.account_name)} className="ml-2 text-red-500">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded border ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50"}`}
            >
              ← Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded border ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50"}`}
            >
              Next →
            </button>
          </div>

          {/* Export Section */}
          <div className="flex flex-col items-center mt-6">
            <button onClick={handleExportCSV} className="export-btn">
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