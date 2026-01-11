# 🚀 Environment Variables - Quick Reference

## ⚡ Quick Setup (30 seconds)

```bash
# 1. Copy env example
cd frontend
cp .env.example .env

# 2. Start dev server
npm run dev

# Done! Backend URL is already configured for local development
```

---

## 📝 Key Points

### For Vite Projects (This Project):
- ✅ Use `VITE_` prefix (not `REACT_APP_`)
- ✅ Access via `import.meta.env.VITE_API_URL`
- ✅ Already configured: `VITE_API_URL=http://localhost:5000`

### Files:
- **`.env`** - Your local config (git-ignored, never commit)
- **`.env.example`** - Template for team (committed to git)
- **`src/config/api.js`** - All API endpoints
- **`src/services/api.js`** - Ready-to-use API methods

---

## 💻 Usage in Components

### Option 1: Use Pre-built API (Recommended)

```javascript
import api from '../services/api';

// Fetch products
const products = await api.products.getAll();

// Login
await api.auth.login(email, password);

// Add to cart
await api.cart.addToCart(productId, 1);
```

### Option 2: Use Endpoints Directly

```javascript
import { config } from '../config/api';

fetch(config.endpoints.products)
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 🌐 Deployment

### Render
```
Dashboard → Environment → Add Variable
Key: VITE_API_URL
Value: https://your-backend.onrender.com
```

### Netlify
```
Site Settings → Environment Variables
VITE_API_URL = https://your-backend.com
```

### Vercel
```
Project Settings → Environment Variables
VITE_API_URL = https://your-backend.com
```

---

## 🔒 Security

- ✅ `.env` is git-ignored (safe)
- ✅ Never commit API keys or secrets
- ✅ Use environment variables in deployment platforms
- ✅ Always use HTTPS in production

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| API calls fail locally | Check if backend is running on port 5000 |
| `VITE_API_URL` undefined | Restart dev server: `npm run dev` |
| CORS errors | Update backend CORS to allow frontend URL |
| Production API wrong | Check deployment platform env variables |

---

## 📚 Full Documentation

- **Complete Guide**: `frontend/API_USAGE_GUIDE.md`
- **Code Examples**: `frontend/src/examples/ApiExamples.jsx`
- **API Config**: `frontend/src/config/api.js`
- **API Service**: `frontend/src/services/api.js`

---

## ✅ Available API Methods

```javascript
// Products
api.products.getAll()
api.products.getById(id)
api.products.search(query)

// Auth
api.auth.login(email, password)
api.auth.register(userData)

// Cart
api.cart.getCart()
api.cart.addToCart(productId, quantity)

// Orders
api.orders.createOrder(orderData)
api.orders.getUserOrders()

// Wishlist
api.wishlist.addToWishlist(productId)

// Contact
api.contact.submitContactForm(data)

// Health
api.health.checkHealth()
```

---

**Need Help?** Read `API_USAGE_GUIDE.md` for detailed examples! 🎯
