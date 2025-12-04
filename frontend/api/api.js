import axios from "axios";

export const API = axios.create({
  //   baseURL: "https://your-backend.onrender.com/api", // 🛠️ yahan apna backend URL daal
  // baseURL: "https://lineally-unenervated-eusebia.ngrok-free.dev/api",
  // baseURL: "https://chef-e-commerce-api.onrender.com/api",
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true", // ✅ This bypasses ngrok splash
  },
});
