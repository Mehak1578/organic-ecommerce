// API Configuration
// This file helps you use the backend API URL from environment variables

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

export default config;
