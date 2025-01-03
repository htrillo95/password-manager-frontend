import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ username, onLogout }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [retrievedPassword, setRetrievedPassword] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/accounts", {
          params: { username },
        });
        setAccounts(response.data.accounts || []);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, [username]);

  const handleAddPassword = async (e) => {
    e.preventDefault();
    if (!account || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:5000/passwords", {
        username,
        account,
        password,
      });
      setAccounts((prev) => [...prev, account]);
      setMessage("Password added successfully!");
      setAccount("");
      setPassword("");
    } catch (error) {
      console.error("Error adding password:", error);
      setMessage("Failed to add password.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetrievePassword = async (e) => {
    e.preventDefault();
    if (!account) {
      setMessage("Please enter an account name.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/passwords", {
        params: { username, account },
      });
      setRetrievedPassword(response.data.password || "Not found");
      setMessage("");
    } catch (error) {
      console.error("Error retrieving password:", error);
      setMessage("Failed to retrieve password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {username}</h2>
      <button className="btn logout" onClick={onLogout}>
        Logout
      </button>

      {message && <p className="message">{message}</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={handleAddPassword} className="form">
        <h3>Add Password</h3>
        <input
          type="text"
          placeholder="Account Name"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Add Password</button>
      </form>

      <form onSubmit={handleRetrievePassword} className="form">
        <h3>Retrieve Password</h3>
        <input
          type="text"
          placeholder="Account Name"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <button type="submit">Retrieve</button>
      </form>
      {retrievedPassword && <p>Retrieved Password: {retrievedPassword}</p>}

      <h3>Stored Accounts</h3>
      {accounts.length > 0 ? (
        <ul>
          {accounts.map((acc, index) => (
            <li key={index}>{acc}</li>
          ))}
        </ul>
      ) : (
        <p>No accounts stored yet.</p>
      )}
    </div>
  );
};

export default Dashboard;