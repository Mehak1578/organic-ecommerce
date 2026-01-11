import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

function Navbar() {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();

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
            
            <Link to="/login" className="navbar-btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
