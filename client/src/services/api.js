import axios from "axios";

// Resolve API base URL:
// 1. Use VITE_API_URL when provided (preferred)
// 2. In production (non-localhost) fall back to same-origin `/api`
// 3. Otherwise use local dev server
let baseURL = import.meta.env.VITE_API_URL || "";
try {
  if (!baseURL) {
    const host = typeof window !== 'undefined' && window.location && window.location.hostname;
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      baseURL = `${window.location.origin}/api`;
    } else {
      baseURL = "http://localhost:8000/api";
    }
  }
} catch (e) {
  baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
}

const api = axios.create({
  baseURL,
  timeout: 30000 // 30s timeout to allow slower responses during debug
});

// Attach Authorization header if user token exists in localStorage
api.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (e) {
    // ignore JSON parse errors
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
