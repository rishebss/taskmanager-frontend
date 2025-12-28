import axios from 'axios';

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('🌐 API Base URL:', API_BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  // Register
  register: (userData) => api.post('/auth/register', userData),

  // Login
  login: (credentials) => api.post('/auth/login', credentials),

  // Get profile
  getProfile: () => api.get('/auth/profile'),

  // Update profile
  updateProfile: (userData) => api.put('/auth/profile', userData),

  // Change password
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
};

// Todo API
export const todoApi = {
  // Get todos with pagination and filters
  getTodos: (params = {}) => {
    // Default parameters
    const defaultParams = {
      page: 1,
      limit: 10,
      status: '',
      sortBy: 'createdAt',
      order: 'desc'
    };

    const queryParams = { ...defaultParams, ...params };
    // Remove empty status from params
    if (!queryParams.status) delete queryParams.status;
    // Remove empty search from params
    if (!queryParams.search) delete queryParams.search;

    return api.get('/todos', { params: queryParams });
  },

  // Get single todo
  getTodo: (id) => api.get(`/todos/${id}`),

  // Create todo
  createTodo: (todoData) => {
    // Ensure deadline is properly formatted if provided
    if (todoData.deadline && typeof todoData.deadline === 'string') {
      // Convert to ISO string if it's not already
      try {
        const date = new Date(todoData.deadline);
        if (!isNaN(date.getTime())) {
          todoData.deadline = date.toISOString();
        }
      } catch (e) {
        console.warn('Could not parse deadline date:', e);
      }
    }

    return api.post('/todos', todoData);
  },

  // Update todo
  updateTodo: (id, todoData) => {
    // Ensure deadline is properly formatted if provided
    if (todoData.deadline && typeof todoData.deadline === 'string') {
      try {
        const date = new Date(todoData.deadline);
        if (!isNaN(date.getTime())) {
          todoData.deadline = date.toISOString();
        }
      } catch (e) {
        console.warn('Could not parse deadline date:', e);
      }
    }
    return api.put(`/todos/${id}`, todoData);
  },

  // Delete todo
  deleteTodo: (id) => {
    console.log('🗑️ Deleting todo with ID:', id);
    return api.delete(`/todos/${id}`);
  },

  // Get stats
  getStats: () => api.get('/todos/stats'),

  // Test API connection
  testConnection: () => api.get('/'),
};

export default api;