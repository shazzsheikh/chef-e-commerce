import axios from "axios";

export const API = axios.create({
  //   baseURL: "https://your-backend.onrender.com/api", // 🛠️ yahan apna backend URL daal
  baseURL: "https://lineally-unenervated-eusebia.ngrok-free.dev/api ",
  withCredentials: true, // agar cookies/session token use ho
});

export const AdminAPI = axios.create({
  //   baseURL: "https://your-backend.onrender.com/api", // 🛠️ yahan apna backend URL daal
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // agar cookies/session token use ho
});
