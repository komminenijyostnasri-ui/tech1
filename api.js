import axios from "axios";

const API = axios.create({
  // 🟠 Base URL must be your backend's root (no extra /api here)
  baseURL: "http://localhost:5000", 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
