import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL  || "http://localhost:7771/api";

// Customize baseURL in .env or use default for dev
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // for HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;