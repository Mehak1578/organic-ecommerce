// API Service Layer
// Centralized API calls with error handling and authentication

import { config } from '../config/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken') || '';
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  // Parse JSON response
  const data = contentType && contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const errorMessage = data.message || data.error || 'Something went wrong';
    throw new Error(errorMessage);
  }

  return data;
};

// Generic API request function
const apiRequest = async (url, options = {}) => {
  const token = getAuthToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('API Request Error:', error.message);
    throw error;
  }
};

// ==================== PRODUCTS API ====================

export const productsAPI = {
  // Get all products
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams 
      ? `${config.endpoints.products}?${queryParams}`
      : config.endpoints.products;
    
    return apiRequest(url, { method: 'GET' });
  },

  // Get product by ID
  getById: async (id) => {
    return apiRequest(config.endpoints.productById(id), { method: 'GET' });
  },

  // Get products by category
  getByCategory: async (category) => {
    return apiRequest(config.endpoints.productsByCategory(category), { method: 'GET' });
  },

  // Search products
  search: async (query) => {
    const url = `${config.endpoints.searchProducts}?q=${encodeURIComponent(query)}`;
    return apiRequest(url, { method: 'GET' });
  },
};

// ==================== AUTHENTICATION API ====================

export const authAPI = {
  // Login
  login: async (email, password) => {
    return apiRequest(config.endpoints.login, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Register
  register: async (userData) => {
    return apiRequest(config.endpoints.register, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Logout
  logout: async () => {
    return apiRequest(config.endpoints.logout, { method: 'POST' });
  },

  // Verify token
  verifyToken: async () => {
    return apiRequest(config.endpoints.verifyToken, { method: 'GET' });
  },
};

// ==================== USER API ====================

export const userAPI = {
  // Get user profile
  getProfile: async () => {
    return apiRequest(config.endpoints.profile, { method: 'GET' });
  },

  // Update user profile
  updateProfile: async (userData) => {
    return apiRequest(config.endpoints.updateProfile, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// ==================== CART API ====================

export const cartAPI = {
  // Get cart
  getCart: async () => {
    return apiRequest(config.endpoints.cart, { method: 'GET' });
  },

  // Add to cart
  addToCart: async (productId, quantity = 1) => {
    return apiRequest(config.endpoints.addToCart, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  // Update cart item
  updateCartItem: async (itemId, quantity) => {
    return apiRequest(config.endpoints.updateCartItem(itemId), {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  // Remove from cart
  removeFromCart: async (itemId) => {
    return apiRequest(config.endpoints.removeFromCart(itemId), {
      method: 'DELETE',
    });
  },

  // Clear cart
  clearCart: async () => {
    return apiRequest(config.endpoints.clearCart, { method: 'DELETE' });
  },
};

// ==================== ORDERS API ====================

export const ordersAPI = {
  // Get all user orders
  getUserOrders: async () => {
    return apiRequest(config.endpoints.userOrders, { method: 'GET' });
  },

  // Create new order
  createOrder: async (orderData) => {
    return apiRequest(config.endpoints.createOrder, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    return apiRequest(config.endpoints.orderById(orderId), { method: 'GET' });
  },
};

// ==================== WISHLIST API ====================

export const wishlistAPI = {
  // Get wishlist
  getWishlist: async () => {
    return apiRequest(config.endpoints.wishlist, { method: 'GET' });
  },

  // Add to wishlist
  addToWishlist: async (productId) => {
    return apiRequest(config.endpoints.addToWishlist, {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  },

  // Remove from wishlist
  removeFromWishlist: async (itemId) => {
    return apiRequest(config.endpoints.removeFromWishlist(itemId), {
      method: 'DELETE',
    });
  },
};

// ==================== CONTACT API ====================

export const contactAPI = {
  // Submit contact form
  submitContactForm: async (formData) => {
    return apiRequest(config.endpoints.contact, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },
};

// ==================== HEALTH CHECK API ====================

export const healthAPI = {
  // Check backend health
  checkHealth: async () => {
    return apiRequest(config.endpoints.health, { method: 'GET' });
  },
};

// Export all APIs as a single object
const api = {
  products: productsAPI,
  auth: authAPI,
  user: userAPI,
  cart: cartAPI,
  orders: ordersAPI,
  wishlist: wishlistAPI,
  contact: contactAPI,
  health: healthAPI,
};

export default api;
