import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile')
};

// Swap API calls
export const swapAPI = {
  swap: (data) => api.post('/swap/swap', data),
  getHistory: (params) => api.get('/swap/history', { params }),
  getTransaction: (id) => api.get(`/swap/${id}`),
  updateTransaction: (id, data) => api.put(`/swap/${id}`, data),
  deleteTransaction: (id) => api.delete(`/swap/${id}`),
  searchTransactions: (params) => api.get('/swap/search', { params })
};

export default api;
