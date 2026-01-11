# 🔧 Environment Variables & API Setup Guide

## 📋 Overview

This project uses **Vite** environment variables to manage backend API URLs across different environments (local, staging, production).

### ✅ What's Been Set Up

1. **`frontend/.env`** - Local development configuration (git-ignored)
2. **`frontend/.env.example`** - Template for environment variables
3. **`frontend/src/config/api.js`** - Centralized API configuration
4. **`frontend/src/services/api.js`** - Complete API service layer with error handling

---

## 🚀 Quick Start

### For Local Development

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Copy the example env file
cp .env.example .env

# 3. Update .env with your local backend URL (default is already set)
VITE_API_URL=http://localhost:5000

# 4. Start development server
npm run dev
```

---

## 📁 File Structure

```
frontend/
├── .env                     # Local environment variables (git-ignored)
├── .env.example            # Template for env variables
├── src/
│   ├── config/
│   │   └── api.js          # API endpoints configuration
│   └── services/
│       └── api.js          # API service layer with methods
```

---

## 🔑 Environment Variables

### Vite Environment Variable Rules:

1. **Must start with `VITE_`** - This is a Vite requirement
2. **Embedded at build time** - Values are baked into the bundle
3. **Access via `import.meta.env`** - Not `process.env`

### Available Variables:

```env
# Backend API Base URL
VITE_API_URL=http://localhost:5000    # Local development
```

### Accessing in Code:

```javascript
// ✅ Correct (Vite)
const apiUrl = import.meta.env.VITE_API_URL;

// ❌ Wrong (This is for Create React App)
const apiUrl = process.env.REACT_APP_BACKEND_URL;
```

---

## 💻 How to Use the API Service

### Method 1: Using Pre-built API Methods (Recommended)

```javascript
import api from '../services/api';

// Example 1: Fetch all products
const MyComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await api.products.getAll();
        setProducts(data.products || data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

// Example 2: User Login
const LoginForm = () => {
  const handleLogin = async (email, password) => {
    try {
      const response = await api.auth.login(email, password);
      
      // Save token to localStorage
      localStorage.setItem('authToken', response.token);
      
      // Redirect or update state
      console.log('Login successful!', response.user);
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      handleLogin(email, password);
    }}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
};

// Example 3: Add to Cart
const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      await api.cart.addToCart(product.id, 1);
      alert('Added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error.message);
    }
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

// Example 4: Submit Contact Form
const ContactForm = () => {
  const handleSubmit = async (formData) => {
    try {
      await api.contact.submitContactForm({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Failed to send message:', error.message);
    }
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
};
```

### Method 2: Using API Endpoints Directly

```javascript
import { config } from '../config/api';

// Example: Custom fetch
const fetchProducts = async () => {
  const response = await fetch(config.endpoints.products);
  const data = await response.json();
  return data;
};

// Example: Get specific product
const getProduct = async (productId) => {
  const response = await fetch(config.endpoints.productById(productId));
  const data = await response.json();
  return data;
};
```

---

## 🌐 Deployment Setup

### For Render

1. Deploy your backend first and get the URL
2. Go to your **Frontend Static Site** on Render
3. Navigate to **Environment** tab
4. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://organic-shop-backend.onrender.com`
5. Save changes (auto-redeploys)

### For Netlify

1. Go to **Site Settings** → **Build & Deploy** → **Environment**
2. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.com`
3. Redeploy site

### For Vercel

1. Go to **Project Settings** → **Environment Variables**
2. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.com`
   - **Environment**: Production, Preview, Development
3. Redeploy

---

## 📦 Available API Methods

### Products
- `api.products.getAll(filters)` - Get all products with optional filters
- `api.products.getById(id)` - Get single product by ID
- `api.products.getByCategory(category)` - Get products by category
- `api.products.search(query)` - Search products

### Authentication
- `api.auth.login(email, password)` - User login
- `api.auth.register(userData)` - User registration
- `api.auth.logout()` - User logout
- `api.auth.verifyToken()` - Verify auth token

### User
- `api.user.getProfile()` - Get user profile
- `api.user.updateProfile(userData)` - Update user profile

### Cart
- `api.cart.getCart()` - Get cart items
- `api.cart.addToCart(productId, quantity)` - Add item to cart
- `api.cart.updateCartItem(itemId, quantity)` - Update cart item quantity
- `api.cart.removeFromCart(itemId)` - Remove item from cart
- `api.cart.clearCart()` - Clear entire cart

### Orders
- `api.orders.getUserOrders()` - Get all user orders
- `api.orders.createOrder(orderData)` - Create new order
- `api.orders.getOrderById(orderId)` - Get specific order

### Wishlist
- `api.wishlist.getWishlist()` - Get wishlist items
- `api.wishlist.addToWishlist(productId)` - Add to wishlist
- `api.wishlist.removeFromWishlist(itemId)` - Remove from wishlist

### Contact
- `api.contact.submitContactForm(formData)` - Submit contact form

### Health
- `api.health.checkHealth()` - Check backend health

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use environment variables for sensitive data** - API keys, tokens, URLs
3. **Validate environment variables** - Check if `VITE_API_URL` is set
4. **Use HTTPS in production** - Always use secure URLs
5. **Store auth tokens securely** - Use `localStorage` or `httpOnly` cookies

---

## 🐛 Troubleshooting

### Issue: "VITE_API_URL is not defined"
**Solution**: Make sure `.env` file exists with `VITE_API_URL` set

### Issue: API calls return CORS errors
**Solution**: Update backend CORS settings to allow your frontend URL

### Issue: Changes to .env not reflecting
**Solution**: 
1. Stop dev server (`Ctrl + C`)
2. Restart: `npm run dev`
3. Environment variables are cached - restart is required

### Issue: Production build has wrong API URL
**Solution**: 
1. Check environment variables in deployment platform
2. Ensure `VITE_API_URL` is set correctly
3. Redeploy the application

---

## ✅ Checklist for Deployment

- [ ] Backend deployed and URL obtained
- [ ] `VITE_API_URL` set in frontend deployment platform
- [ ] Backend CORS configured to allow frontend URL
- [ ] Frontend built and deployed
- [ ] Tested API calls from deployed frontend
- [ ] No console errors related to API
- [ ] Authentication flow working
- [ ] All CRUD operations functional

---

## 📚 Additional Resources

- [Vite Environment Variables Docs](https://vitejs.dev/guide/env-and-mode.html)
- [Render Deployment Guide](https://render.com/docs/deploy-vite)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

---

**Happy Coding! 🚀**
