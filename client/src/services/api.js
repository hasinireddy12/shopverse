import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL,
  timeout: 10000 // 10s timeout to avoid hanging requests
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
