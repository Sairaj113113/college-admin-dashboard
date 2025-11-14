import axios from "axios";

// Use the live backend URL on Render
const api = axios.create({
  baseURL: "https://college-admin-backend.onrender.com", // ✅ fixed
});

// Attach token automatically if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
