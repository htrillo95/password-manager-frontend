import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

const headers = {
  "Content-Type": "application/json"
};

export const registerUser = async (username, password) => {
  return await axios.post(`${BASE_URL}/register`, { username, password }, { headers });
};

export const loginUser = async (username, password) => {
  return await axios.post(`${BASE_URL}/login`, { username, password }, { headers });
};

export const fetchAccounts = async (username) => {
  return await axios.get(`${BASE_URL}/accounts`, { params: { username }, headers });
};

export const addPassword = async (username, account_name, password) => {
  return await axios.post(`${BASE_URL}/passwords`, { username, account_name, password }, { headers });
};

export const retrievePassword = async (username, account) => {
  return await axios.get(`${BASE_URL}/passwords`, { params: { username, account }, headers });
};

export const updatePassword = async (username, account_name, password) => {
  return await axios.put(`${BASE_URL}/passwords/${account_name}`, {
    username,
    password
  }, { headers });
};

export const updateUsername = async (current_username, new_username) => {
  return await fetch(`${BASE_URL}/update-username`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ current_username, new_username }),
  });
};

export const deletePassword = async (username, accountName) => {
  return await axios.delete(`${BASE_URL}/passwords/${accountName}`, {
    data: { username },
    headers
  });
};

export const deleteUserAccount = async (username) => {
  return await fetch(`${BASE_URL}/delete-account`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ username }),
  });
};