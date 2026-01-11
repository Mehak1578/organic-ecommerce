import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

// Dummy credentials for testing
const DUMMY_USER = {
  email: 'user@organicshop.com',
  password: 'organic123'
};

function Login() {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Error state
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    if (loginError) {
      setLoginError('');
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulate API login (fake authentication)
  const authenticateUser = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check against dummy credentials
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      return { success: true, user: { email, name: 'Organic User' } };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous login error
    setLoginError('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Authenticate user
      const result = await authenticateUser(formData.email, formData.password);

      if (result.success) {
        // Store user info based on "Remember me" option
        const userData = JSON.stringify(result.user);
        
        if (formData.rememberMe) {
          // Store in localStorage (persists after browser close)
          localStorage.setItem('organicShopUser', userData);
        } else {
          // Store in sessionStorage (cleared when browser closes)
          sessionStorage.setItem('organicShopUser', userData);
        }

        // Redirect to products page
        navigate('/products');
      } else {
        // Show error message
        setLoginError(result.message);
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Navigate to forgot password page (you can create this route later)
    alert('Forgot password functionality - Navigate to /forgot-password');
  };

  // Handle social login placeholders
  const handleSocialLogin = (provider) => {
    alert(`${provider} login is not implemented yet. This is a placeholder for future integration.`);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Back to Home Link */}
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="back-home-link"
          >
            ← Back to Home
          </button>

          {/* Logo */}
          <Link to="/" className="auth-logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">OrganicShop</span>
          </Link>

          {/* Header */}
          <div className="auth-header">
            <h1>Sign In</h1>
            <p>Enter your email and password to continue</p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="error-alert">
              {loginError}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
              <a href="#" onClick={handleForgotPassword} className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Social Login */}
          <button 
            type="button" 
            className="btn-social"
            onClick={() => handleSocialLogin('Google')}
          >
            <span>🔍</span> Continue with Google
          </button>

          <button 
            type="button" 
            className="btn-social"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <span>📘</span> Continue with Facebook
          </button>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
