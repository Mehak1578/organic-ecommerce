import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { products, categories } from '../../data/products';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  // Get featured products (limited to 6)
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (product) => {
    // Check if user is logged in
    if (!isAuthenticated) {
      // Save product ID to localStorage for redirect after login
      localStorage.setItem('redirectProduct', JSON.stringify({ id: product.id, quantity: 1 }));
      // Redirect to login
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }
    
    addToCart(product, 1);
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Holistic Organic <br />
                <span className="highlight">Wellness</span> From India
              </h1>
              <p className="hero-desc">
                Discover carefully curated organic groceries and wellness essentials inspired by traditional Indian living.
                Fresh, authentic, and delivered with care to your doorstep.
              </p>
              <div className="hero-badges">
                <span>100% Certified Organic</span>
                <span>Made for Indian Lifestyles</span>
                <span>Sourced from Trusted Farms</span>
              </div>
              <div className="hero-buttons">
                <Link to="/products" className="btn btn-primary">
                  Shop Now
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80" 
                alt="Fresh organic vegetables"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Browse our wide range of organic products</p>
          
          <div className="categories-grid">
            {categories.filter(cat => cat.id !== 'all').map(category => (
              <Link 
                to={`/products?category=${category.id}`} 
                key={category.id}
                className="category-card"
              >
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-name">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Handpicked favorites for you</p>
          
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-image-link">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <button 
                      className={`wishlist-icon ${isInWishlist(product.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                      }}
                      aria-label="Add to wishlist"
                    >
                      {isInWishlist(product.id) ? '♥' : '♡'}
                    </button>
                  </div>
                </Link>
                <div className="product-info">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                  </Link>
                  <div className="product-rating">
                    <span className="stars">⭐ {product.rating}</span>
                    <span className="reviews">({product.reviews})</span>
                  </div>
                  <div className="product-footer">
                    <span className="product-price">₹{product.price}</span>
                    <button 
                      className="btn-add-cart"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>100% Organic</h3>
              <p>All our products are certified organic, grown without harmful pesticides.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Free delivery on orders over ₹999. Get your order within 24–48 hours.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💚</div>
              <h3>Fresh & Healthy</h3>
              <p>Handpicked daily from local farms to ensure maximum freshness.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Your transactions are safe with our encrypted payment system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          CUSTOMER REVIEWS - Professional Design
          ======================================== */}
      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real reviews from real customers</p>
          
          <div className="reviews-grid">
            
            {/* Review 1 */}
            <div className="review-card">
              <div className="review-header">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" 
                  alt="Michael Chen"
                  className="customer-photo"
                />
                <div className="customer-info">
                  <h4>Michael Chen</h4>
                  <div className="verified-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Verified Customer
                  </div>
                </div>
              </div>
              
              <div className="review-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
              </div>
              
              <p className="review-text">
                "The quality of produce is outstanding! Everything arrives fresh and perfectly packaged. 
                I've been a customer for over a year now and couldn't be happier."
              </p>
            </div>

            {/* Review 2 */}
            <div className="review-card">
              <div className="review-header">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" 
                  alt="Sarah Johnson"
                  className="customer-photo"
                />
                <div className="customer-info">
                  <h4>Sarah Johnson</h4>
                  <div className="verified-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Verified Customer
                  </div>
                </div>
              </div>
              
              <div className="review-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
              </div>
              
              <p className="review-text">
                "Love the convenience and quality! The organic fruits and vegetables taste so much better 
                than regular grocery store products. Highly recommend!"
              </p>
            </div>

            {/* Review 3 */}
            <div className="review-card">
              <div className="review-header">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" 
                  alt="David Martinez"
                  className="customer-photo"
                />
                <div className="customer-info">
                  <h4>David Martinez</h4>
                  <div className="verified-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Verified Customer
                  </div>
                </div>
              </div>
              
              <div className="review-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
              </div>
              
              <p className="review-text">
                "Fast delivery, great prices, and excellent customer service. 
                This is now my go-to place for all organic groceries!"
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Subscribe to Our Newsletter</h2>
              <p>Get weekly updates on new products, special offers, and healthy recipes!</p>
            </div>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
