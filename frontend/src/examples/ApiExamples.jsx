// Example Component: How to Use API Service
// This file demonstrates best practices for making API calls

import { useState, useEffect } from 'react';
import api from '../services/api';

// ========================================
// Example 1: Fetch Products with Loading & Error States
// ========================================
export const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using API service
        const data = await api.products.getAll();
        setProducts(data.products || data);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="products-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
};

// ========================================
// Example 2: User Authentication (Login)
// ========================================
export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      // Call login API
      const response = await api.auth.login(formData.email, formData.password);
      
      // Save auth token
      localStorage.setItem('authToken', response.token);
      
      // Redirect or update app state
      console.log('Login successful!', response.user);
      alert('Login successful!');
      
    } catch (err) {
      setError(err.message || 'Login failed');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="error-message">{error}</div>}
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

// ========================================
// Example 3: Add to Cart with Optimistic UI
// ========================================
export const AddToCartButton = ({ productId, onSuccess }) => {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      
      // Add to cart via API
      await api.cart.addToCart(productId, 1);
      
      // Success callback
      if (onSuccess) onSuccess();
      
      alert('Added to cart successfully!');
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <button 
      onClick={handleAddToCart} 
      disabled={adding}
      className="add-to-cart-btn"
    >
      {adding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

// ========================================
// Example 4: Contact Form Submission
// ========================================
export const ContactFormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setSuccess(false);
      
      // Submit contact form
      await api.contact.submitContactForm(formData);
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSuccess(true);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to submit form:', err);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {success && <div className="success">Message sent successfully!</div>}
      
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      
      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        required
      />
      
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      
      <button type="submit" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

// ========================================
// Example 5: Fetch Product by ID with URL Param
// ========================================
export const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await api.products.getById(productId);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">₹{product.price}</p>
    </div>
  );
};

// ========================================
// Example 6: Search Products with Debouncing
// ========================================
export const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(async () => {
      if (query.trim()) {
        try {
          setSearching(true);
          const data = await api.products.search(query);
          setResults(data.products || data);
        } catch (err) {
          console.error('Search failed:', err);
          setResults([]);
        } finally {
          setSearching(false);
        }
      } else {
        setResults([]);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {searching && <div>Searching...</div>}
      
      <div className="search-results">
        {results.map(product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
};

// ========================================
// Example 7: Backend Health Check
// ========================================
export const BackendStatus = () => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await api.health.checkHealth();
        setStatus('online');
      } catch (err) {
        setStatus('offline');
        console.error('Backend is offline:', err);
      }
    };

    checkHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`backend-status ${status}`}>
      Backend: {status === 'online' ? '✅ Online' : '❌ Offline'}
    </div>
  );
};

// Note: These are example components demonstrating API usage patterns.
// Integrate them into your actual components as needed.
