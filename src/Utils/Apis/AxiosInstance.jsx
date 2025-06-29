import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',  // Ganti dengan URL backend Anda
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
