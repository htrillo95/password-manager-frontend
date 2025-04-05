import React, { useState, useEffect } from "react";
import MobileSidebar from "./MobileSidebar";
import { useAppContext } from "../context/AppContext";
import { addPassword, deletePassword } from "../utils/api";

const MobileDashboard = ({ onLogout, isSidebarOpen, toggleSidebar }) => {
  const { username, accounts, setAccounts, fetchAccounts } = useAppContext();
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editingAccount, setEditingAccount] = useState(null);
  const [editingPassword, setEditingPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAccounts(username);
  }, [username]);

  useEffect(() => {
    setFilteredAccounts(accounts);
    setCurrentPage(1);
  }, [accounts]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!newAccount || !newPassword) {
      showMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await addPassword(username, newAccount, newPassword);
      if (response.data.success) {
        const newEntry = { account_name: newAccount, password: newPassword };
        setAccounts([...accounts, newEntry]);
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

  const handleUpdateAccount = async () => {
    if (!editingAccount || !editingPassword) {
      showMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await addPassword(username, newAccount, newPassword);
      if (response.data.success) {
        const updated = accounts.map((acc) =>
          acc.account_name === editingAccount.account_name
            ? { ...acc, password: editingPassword }
            : acc
        );
        setAccounts(updated);
        setEditingAccount(null);
        setEditingPassword("");
        showMessage("Account updated successfully!");
      } else {
        showMessage("Failed to update account.");
      }
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

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="mobile-dashboard">
      <MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={onLogout} />

      <div className="mobile-content transition-all duration-300">
        <button onClick={toggleSidebar} className="p-4 text-2xl">☰</button>

        <main className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome, {username}
          </h1>

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleAddAccount} className="mb-6 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Add New Account</h2>
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

          <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
            Manage Accounts
            <select onChange={(e) => handleSort(e.target.value)} className="p-2 border rounded">
              <option value="default">Sort by: Default</option>
              <option value="alphabetical">Sort A-Z</option>
            </select>
          </h2>

          <table className="min-w-full table-auto overflow-x-auto">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-2 px-4 text-left">Account Name</th>
                <th className="py-2 px-4 text-left">Password</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAccounts.map((acc) => (
                <tr key={acc.account_name} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{acc.account_name}</td>
                  <td className="py-2 px-4">
                    {passwordVisibility[acc.account_name] ? acc.password : "••••••••"}
                    <button
                      onClick={() => togglePasswordVisibility(acc.account_name)}
                      className="ml-2 text-blue-500"
                    >
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

          <div className="flex justify-end mt-4">
            <button onClick={handleExportCSV} className="bg-purple-500 text-white p-2 rounded">
              Export to CSV
            </button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            <span>{currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MobileDashboard;