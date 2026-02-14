import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaUser, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Close user menu on outside click
  useEffect(() => {
    if (!isUserMenuOpen) return;

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">OrganicShop</span>
          </Link>

          {/* Navigation Links */}
          <ul className="navbar-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="navbar-actions">
            <Link to="/wishlist" className="navbar-icon" title="Wishlist">
              <span className="icon">❤️</span>
              {getWishlistCount() > 0 && (
                <span className="badge">{getWishlistCount()}</span>
              )}
            </Link>
            
            {/* Cart Icon - Navigate to Cart Page */}
            <Link to="/cart" className="navbar-icon" title="Shopping Cart">
              <span className="icon">🛒</span>
              {getCartCount() > 0 && (
                <span className="badge">{getCartCount()}</span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode} 
              className="theme-toggle"
              aria-label="Toggle dark mode"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
            
            {isAuthenticated ? (
              <div className="navbar-user" ref={userMenuRef}>
                <button
                  type="button"
                  className="navbar-user-btn"
                  onClick={() => setIsUserMenuOpen((open) => !open)}
                >
                  <FaUserCircle className="navbar-user-icon" />
                  <span className="navbar-user-name">
                    {user?.name ? user.name.split(' ')[0] : 'Account'}
                  </span>
                  <span className="navbar-user-caret">▾</span>
                </button>
                {isUserMenuOpen && (
                  <div className="navbar-user-menu">
                    <button
                      type="button"
                      className="user-menu-item"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate('/account');
                      }}
                    >
                      <FaUser className="user-menu-icon" />
                      <span>My Profile</span>
                    </button>
                    <button
                      type="button"
                      className="user-menu-item"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate('/orders');
                      }}
                    >
                      <FaShoppingBag className="user-menu-icon" />
                      <span>My Orders</span>
                    </button>
                    <button
                      type="button"
                      className="user-menu-item user-menu-logout"
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await handleLogout();
                      }}
                    >
                      <FaSignOutAlt className="user-menu-icon" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="navbar-btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
