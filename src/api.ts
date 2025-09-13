// src/api.ts
import axios from "axios";
import { AuthStore } from "./stores/AuthStore";


const api = axios.create({
  baseURL: "/", // since MSW intercepts, root is fine
});

// Optionally attach token automatically
api.interceptors.request.use((config) => {
  const token = AuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
