import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { fetchAccounts as fetchAccountsAPI } from "../utils/api"; 

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [accounts, setAccounts] = useState([]);

  // 🔥 Sync username from localStorage on first mount
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetchAccounts(username);
    }
  }, [username]); // 🔥 Anytime username changes, re-fetch accounts

  const fetchAccounts = async (usernameToFetch = username) => {
    if (!usernameToFetch) return;
  
    try {
      const response = await fetchAccountsAPI(usernameToFetch);
  
      if (response.data.success) {
        setAccounts(response.data.accounts);
      } else {
        console.error("Failed to fetch accounts:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        accounts,
        setAccounts,
        fetchAccounts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);