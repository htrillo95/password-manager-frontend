import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

export const registerUser = async (username, password) => {
  return await axios.post(`${BASE_URL}/register`, { username, password });
};

export const loginUser = async (username, password) => {
  return await axios.post(`${BASE_URL}/login`, { username, password });
};

export const fetchAccounts = async (username) => {
  return await axios.get(`${BASE_URL}/accounts`, { params: { username } });
};

export const addPassword = async (username, account, password) => {
  return await axios.post(`${BASE_URL}/passwords`, { username, account, password });
};

export const retrievePassword = async (username, account) => {
  return await axios.get(`${BASE_URL}/passwords`, { params: { username, account } });
};