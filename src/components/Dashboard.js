import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { addPassword, updatePassword, deletePassword } from "../utils/api";
import "../styles/Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const { username, accounts, setAccounts, fetchAccounts } = useAppContext();
  const navigate = useNavigate();
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editingAccount, setEditingAccount] = useState(null);
  const [editingPassword, setEditingPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    if (username) fetchAccounts(username);
  }, [username]);

  useEffect(() => {
    setFilteredAccounts(accounts);
    setCurrentPage(1);
  }, [accounts]);

  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!newAccount || !newPassword) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (filteredAccounts.some(acc => acc.account_name === newAccount)) {
      setMessage("This account name already exists.");
      return;
    }

    setLoading(true);
    try {
      const res = await addPassword(username, newAccount, newPassword);
      if (res.data.success) {
        const updated = [...filteredAccounts, { account_name: newAccount, password: newPassword }];
        setAccounts(updated);
        setFilteredAccounts(updated);
        setCurrentPage(Math.ceil(updated.length / itemsPerPage));
        setNewAccount("");
        setNewPassword("");
        setMessage("Account added successfully!");
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to add account.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredAccounts(accounts.filter(acc => acc.account_name?.toLowerCase().includes(query)));
    setCurrentPage(1);
  };

  const handleSort = (criteria) => {
    if (criteria === "alphabetical") {
      setFilteredAccounts([...filteredAccounts].sort((a, b) => a.account_name.localeCompare(b.account_name)));
    } else {
      setFilteredAccounts(accounts);
    }
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    const csv = [
      ["Account Name", "Password"],
      ...accounts.map(acc => [acc.account_name, acc.password]),
    ].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "accounts.csv";
    link.click();
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setEditingPassword(account.password);
  };

  const handleUpdateAccount = async () => {
    if (!editingAccount || !editingPassword) return;
    if (!window.confirm("Are you sure you want to update this account?")) return;

    setLoading(true);
    try {
      const res = await updatePassword(username, editingAccount.account_name, editingPassword);
      if (res.data.success) {
        const updated = accounts.map(acc => acc.account_name === editingAccount.account_name
          ? { ...acc, password: editingPassword } : acc);
        setAccounts(updated);
        setFilteredAccounts(updated);
        setEditingAccount(null);
        setEditingPassword("");
        setMessage("Account updated successfully!");
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to update account.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (accountName) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;

    setLoading(true);
    try {
      const res = await deletePassword(username, accountName);
      if (res.data.success) {
        const updated = accounts.filter(acc => acc.account_name !== accountName);
        setAccounts(updated);
        setFilteredAccounts(updated);
        setMessage("Account deleted successfully!");
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (name) => {
    setPasswordVisibility(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const paginatedAccounts = filteredAccounts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <aside className="w-64 bg-gray-800 text-white flex flex-col items-center py-6">
        <h2 className="text-2xl font-bold mb-8">PasswordVault</h2>
        <nav className="w-full px-4 space-y-6">
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700" onClick={() => navigate("/dashboard")}>Vault</button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700" onClick={() => navigate("/tools")}>Tools</button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700" onClick={() => navigate("/settings")}>Settings</button>
        </nav>
        <button onClick={onLogout} className="mt-auto w-11/12 py-2 px-4 bg-red-500 rounded hover:bg-red-600">Logout</button>
      </aside>

      <main className="flex-1 p-6 overflow-hidden">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {username}</h1>
        <hr className="my-4 border-gray-300" />

        {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">{message}</div>}

        <form onSubmit={handleAddAccount} className="mb-6 bg-white shadow-md rounded-lg p-4" autoComplete="off">
          <h2 className="text-lg font-semibold mb-4">Add New Account <span className="text-gray-500 text-sm">(e.g., Gmail, Netflix)</span></h2>
          <div className="flex space-x-4">
            <input type="text" placeholder="Account Name" value={newAccount} onChange={(e) => setNewAccount(e.target.value)} className="flex-1 px-4 py-2 border rounded" />
            <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="flex-1 px-4 py-2 border rounded" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add</button>
          </div>
        </form>

        <hr className="my-4 border-gray-300" />

        <h2 className="text-xl font-semibold mb-2">Manage Your Accounts</h2>
        <p className="text-gray-700 text-base mb-4">View, edit, or delete your saved accounts below. Use "Show" to reveal passwords.</p>

        <div className="flex space-x-4 mb-4 items-center">
          <div className="sort-container">
            <label htmlFor="sortOptions" className="sort-label">Sort by:</label>
            <select id="sortOptions" onChange={(e) => handleSort(e.target.value)} className="sort-dropdown">
              <option value="default">Default</option>
              <option value="alphabetical">Sort A-Z</option>
            </select>
          </div>
          <button onClick={handleExportCSV} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Export to CSV</button>
        </div>

        <section className="overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Stored Accounts ({filteredAccounts.length})</h2>
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
                {paginatedAccounts.length > 0 ? paginatedAccounts.map((account) => (
                  <tr key={account.account_name} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-6">{account.account_name}</td>
                    <td className="py-3 px-6">
                      {passwordVisibility[account.account_name] ? account.password : "••••••••"}
                      <button onClick={() => togglePasswordVisibility(account.account_name)} className="ml-2 text-blue-500">
                        {passwordVisibility[account.account_name] ? "Hide" : "Show"}
                      </button>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {editingAccount?.account_name === account.account_name ? (
                        <>
                          <input type="password" value={editingPassword} onChange={(e) => setEditingPassword(e.target.value)} className="px-2 py-1 border rounded" />
                          <button onClick={handleUpdateAccount} className="edit-btn">Save</button>
                          <button onClick={() => setEditingAccount(null)} className="cancel-btn">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditAccount(account)} className="edit-btn">Edit</button>
                          <button onClick={() => handleDeleteAccount(account.account_name)} className="delete-btn">Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="py-3 px-6 text-center text-gray-500">No accounts available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>Previous</button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>Next</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;