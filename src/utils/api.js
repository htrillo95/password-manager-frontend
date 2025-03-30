import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

// Shared axios config with CORS credentials
const axiosConfig = {
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
};

export const registerUser = async (username, password) => {
  return await axios.post(`${BASE_URL}/register`, { username, password }, axiosConfig);
};

export const loginUser = async (username, password) => {
  return await axios.post(`${BASE_URL}/login`, { username, password }, axiosConfig);
};

export const fetchAccounts = async (username) => {
  return await axios.get(`${BASE_URL}/accounts`, {
    params: { username },
    ...axiosConfig
  });
};

export const addPassword = async (username, account_name, password) => {
  return await axios.post(`${BASE_URL}/passwords`, { username, account_name, password }, axiosConfig);
};

export const retrievePassword = async (username, account) => {
  return await axios.get(`${BASE_URL}/passwords`, {
    params: { username, account },
    ...axiosConfig
  });
};

export const updatePassword = async (username, account_name, password) => {
  return await axios.put(`${BASE_URL}/passwords/${account_name}`, {
    username,
    password
  }, axiosConfig);
};

export const deletePassword = async (username, accountName) => {
  return await axios.delete(`${BASE_URL}/passwords/${accountName}`, {
    data: { username },
    ...axiosConfig
  });
};

// 🟡 Still using fetch below — you can convert these to axios if you want
export const updateUsername = async (current_username, new_username) => {
  return await fetch(`${BASE_URL}/update-username`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include", // 👈 equivalent to withCredentials: true for fetch
    body: JSON.stringify({ current_username, new_username }),
  });
};

export const deleteUserAccount = async (username) => {
  return await fetch(`${BASE_URL}/delete-account`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ username }),
  });
};