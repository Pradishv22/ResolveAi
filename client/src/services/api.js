import axios from 'axios';

// Create Axios client instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Phase 3 will attach JWT token from storage if present
    const token = localStorage.getItem('resolveai_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.error?.message || error.message || 'Network error occurred',
      code: error.response?.data?.error?.code || 'NETWORK_ERROR',
      status: error.response?.status || 500,
      details: error.response?.data?.error?.details || null
    };
    return Promise.reject(customError);
  }
);

export default api;
