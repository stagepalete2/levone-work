import axios from 'axios';

const domain = 'http://127.0.0.1:8000/api/'

const api = axios.create({
  baseURL: domain, // ← Change this to your backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;