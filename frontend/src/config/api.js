// API Configuration
// Centralized configuration for backend API URLs
// Uses VITE_API_URL environment variable for flexibility across environments

// Get backend URL from environment variable with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Validate that API URL is set (especially important for production)
if (!import.meta.env.VITE_API_URL && import.meta.env.PROD) {
  console.warn('⚠️ VITE_API_URL is not set in production environment!');
}

export const config = {
  apiUrl: API_URL,
  
  // API Endpoints - All backend routes are defined here
  endpoints: {
    // Products
    products: `${API_URL}/api/products`,
    productById: (id) => `${API_URL}/api/products/${id}`,
    productsByCategory: (category) => `${API_URL}/api/products/category/${category}`,
    searchProducts: `${API_URL}/api/products/search`,
    
    // Authentication
    login: `${API_URL}/api/auth/login`,
    register: `${API_URL}/api/auth/register`,
    logout: `${API_URL}/api/auth/logout`,
    verifyToken: `${API_URL}/api/auth/verify`,
    
    // User
    profile: `${API_URL}/api/user/profile`,
    updateProfile: `${API_URL}/api/user/profile`,
    
    // Cart
    cart: `${API_URL}/api/cart`,
    addToCart: `${API_URL}/api/cart/add`,
    updateCartItem: (itemId) => `${API_URL}/api/cart/update/${itemId}`,
    removeFromCart: (itemId) => `${API_URL}/api/cart/remove/${itemId}`,
    clearCart: `${API_URL}/api/cart/clear`,
    
    // Orders
    orders: `${API_URL}/api/orders`,
    createOrder: `${API_URL}/api/orders/create`,
    orderById: (id) => `${API_URL}/api/orders/${id}`,
    userOrders: `${API_URL}/api/orders/user`,
    
    // Wishlist
    wishlist: `${API_URL}/api/wishlist`,
    addToWishlist: `${API_URL}/api/wishlist/add`,
    removeFromWishlist: (itemId) => `${API_URL}/api/wishlist/remove/${itemId}`,
    
    // Contact
    contact: `${API_URL}/api/contact`,
    
    // Health check
    health: `${API_URL}/api/health`,
  }
};

// Export API URL separately for direct use if needed
export const API_BASE_URL = API_URL;

export default config;
