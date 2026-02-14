import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../config/api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod' // default to Cash on Delivery
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Refs for form fields to enable scroll and focus
  const fieldRefs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    address: useRef(null),
    city: useRef(null),
    pincode: useRef(null)
  };

  const deliveryCharge = 50;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryCharge;

  // Auto-fill user details on component mount
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        city: user.city || prev.city,
        pincode: user.pincode || prev.pincode
      }));
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form and return first error field
  const validateForm = () => {
    const newErrors = {};
    const fieldOrder = ['name', 'email', 'phone', 'address', 'city', 'pincode'];

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please provide a complete address';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }

    setErrors(newErrors);

    // Find first error field in order
    const firstErrorField = fieldOrder.find(field => newErrors[field]);
    
    return { 
      isValid: Object.keys(newErrors).length === 0,
      firstErrorField 
    };
  };

  // Scroll to and focus the first invalid field
  const scrollToFirstError = (fieldName) => {
    if (!fieldName || !fieldRefs[fieldName]?.current) return;

    const element = fieldRefs[fieldName].current;
    
    // Smooth scroll to the field
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center',
      inline: 'nearest'
    });

    // Focus the field after a short delay to ensure scroll completes
    setTimeout(() => {
      element.focus();
      
      // Add a subtle shake animation to draw attention
      element.classList.add('shake-error');
      setTimeout(() => {
        element.classList.remove('shake-error');
      }, 500);
    }, 300);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm();
    
    if (!validation.isValid) {
      // Scroll to and focus the first invalid field silently
      scrollToFirstError(validation.firstErrorField);
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        deliveryAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode
        },
        paymentMethod: formData.paymentMethod,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        total: total
      };

      const response = await api.post('/orders', orderData);

      if (response.data.success) {
        // Clear cart after successful order
        clearCart();
        
        // Show success message
        alert('Order placed successfully! Order ID: ' + response.data.order._id);
        
        // Redirect to account page or orders page
        navigate('/account');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      alert(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart before checkout</p>
          <button onClick={() => navigate('/products')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-content">
        {/* Left Section - Cart Items & Delivery Form */}
        <div className="checkout-left">
          
          {/* Cart Items */}
          <div className="checkout-card">
            <h2 className="section-title">Order Items</h2>
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="checkout-item">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="checkout-item-image"
                  />
                  <div className="checkout-item-details">
                    <h3 className="checkout-item-name">{item.name}</h3>
                    <p className="checkout-item-quantity">Quantity: {item.quantity}</p>
                  </div>
                  <div className="checkout-item-price">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Form */}
          <div className="checkout-card">
            <h2 className="section-title">Delivery Address</h2>
            <form className="delivery-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  ref={fieldRefs.name}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-message">⚠️ {errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  ref={fieldRefs.email}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error readonly-field' : 'readonly-field'}
                  placeholder="Your email address"
                  readOnly
                />
                {errors.email && <span className="error-message">⚠️ {errors.email}</span>}
                {formData.email && !errors.email && (
                  <small className="field-info">Email cannot be changed</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  ref={fieldRefs.phone}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="10-digit phone number"
                  maxLength="10"
                />
                {errors.phone && <span className="error-message">⚠️ {errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <textarea
                  ref={fieldRefs.address}
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="House No., Building, Street, Area"
                  rows="3"
                />
                {errors.address && <span className="error-message">⚠️ {errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    ref={fieldRefs.city}
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                    placeholder="Enter city"
                  />
                  {errors.city && <span className="error-message">⚠️ {errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    ref={fieldRefs.pincode}
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={errors.pincode ? 'error' : ''}
                    placeholder="6-digit pincode"
                    maxLength="6"
                  />
                  {errors.pincode && <span className="error-message">⚠️ {errors.pincode}</span>}
                </div>
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="checkout-card">
            <h2 className="section-title">Payment Method</h2>
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <span className="payment-label">
                  <strong>Cash on Delivery</strong>
                  <small>Pay when you receive the order</small>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={formData.paymentMethod === 'online'}
                  onChange={handleChange}
                />
                <span className="payment-label">
                  <strong>Online Payment</strong>
                  <small>Pay securely using UPI, Card, or Net Banking</small>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="checkout-right">
          <div className="checkout-card summary-card">
            <h2 className="section-title">Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Delivery Charge</span>
              <span>₹{deliveryCharge.toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row summary-total">
              <span>Total Amount</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button 
              className="place-order-btn" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>

            <div className="secure-checkout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
