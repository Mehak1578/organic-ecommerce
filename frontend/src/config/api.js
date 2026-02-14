import axios from 'axios';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const config = {
  apiUrl: API_URL,
  endpoints: {
    // Products
    products: `${API_URL}/api/products`,
    productById: (id) => `${API_URL}/api/products/${id}`,
    
    // Authentication
    login: `${API_URL}/api/auth/login`,
    register: `${API_URL}/api/auth/register`,
    logout: `${API_URL}/api/auth/logout`,
    
    // User
    profile: `${API_URL}/api/user/profile`,
    
    // Cart
    cart: `${API_URL}/api/cart`,
    
    // Orders
    orders: `${API_URL}/api/orders`,
    orderById: (id) => `${API_URL}/api/orders/${id}`,
    
    // Contact
    contact: `${API_URL}/api/contact`,
  }
};

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Log request for debugging
    console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    
    // Get token from localStorage (if you want to send in headers as well)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });
    } else if (error.request) {
      // Request was made but no response received (network error)
      console.error('Network Error - No response from server:', {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        message: error.message
      });
      console.error('Is backend running on http://localhost:5000?');
    } else {
      // Error in request setup
      console.error('Request Setup Error:', error.message);
    }
    
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Update password
  updatePassword: async (passwordData) => {
    const response = await api.put('/auth/updatepassword', passwordData);
    return response.data;
  }
};

// Orders API methods
export const ordersAPI = {
  // Get user orders
  getUserOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  }
};

export { api };
export default config;
