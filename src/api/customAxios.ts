import 'dotenv/config';
import axios from 'axios';

export const customAxios = axios.create({
  // baseURL: process.env.API_BASE_URL,
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  }
});

customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)