import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Wishlist.css';

function Wishlist() {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (item) => {
    // Check if user is logged in
    if (!isAuthenticated) {
      // Save product ID to localStorage for redirect after login
      localStorage.setItem('redirectProduct', JSON.stringify({ id: item.id, quantity: 1 }));
      // Redirect to login
      navigate('/login', { state: { from: { pathname: '/wishlist' } } });
      return;
    }
    
    addToCart(item, 1);
    alert(`Added ${item.name} to cart!`);
  };

  return (
    <div className="wishlist-page">
      {/* Hero */}
      <section className="wishlist-hero">
        <div className="container">
          <h1 className="page-title">My Wishlist</h1>
          <p className="page-subtitle">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
      </section>

      <div className="container">
        {wishlistItems.length > 0 ? (
          <div className="wishlist-container">
            <div className="wishlist-grid">
              {wishlistItems.map(item => (
                <div key={item.id} className="wishlist-card">
                <Link to={`/product/${item.id}`} className="wishlist-image">
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="wishlist-info">
                  <div className="wishlist-details">
                    <span className="wishlist-category">{item.category}</span>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="wishlist-name">{item.name}</h3>
                    </Link>
                    <div className="wishlist-rating">
                      <span className="stars">⭐ {item.rating}</span>
                      <span className="reviews">({item.reviews} reviews)</span>
                    </div>
                    <div className="wishlist-price">₹{item.price}</div>
                  </div>

                  <div className="wishlist-actions">
                    <button 
                      className="btn-add-cart"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="btn-remove-icon"
                      onClick={() => removeFromWishlist(item.id)}
                      title="Remove from wishlist"
                      aria-label="Remove from wishlist"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        ) : (
          <div className="empty-wishlist">
            <div className="empty-card">
              <div className="empty-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h2>Your wishlist is empty</h2>
              <p>Save items you love so you don't lose sight of them</p>
              <Link to="/products" className="btn-browse">
                Browse Products
              </Link>
              <button 
                type="button" 
                onClick={() => navigate('/')} 
                className="btn-home-secondary"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
