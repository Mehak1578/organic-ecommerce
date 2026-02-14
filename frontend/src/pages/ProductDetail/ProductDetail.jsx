import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  
  // Get cart and wishlist functions
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  // Reset quantity and scroll to top when product changes
  useEffect(() => {
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container">
        <div className="not-found-content">
          <h2>Product not found</h2>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Calculate total price based on quantity
  const totalPrice = (product.price * quantity).toFixed(2);

  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // Check if user is logged in
    if (!isAuthenticated) {
      // Save product ID to localStorage for redirect after login
      localStorage.setItem('redirectProduct', JSON.stringify({ id: product.id, quantity }));
      // Redirect to login
      navigate('/login', { state: { from: { pathname: `/product/${product.id}` } } });
      return;
    }
    
    addToCart(product, quantity);
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    toggleWishlist(product);
    if (isInWishlist(product.id)) {
      alert('Removed from wishlist');
    } else {
      alert('Added to wishlist!');
    }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.name}</h1>
            
            <div className="detail-rating">
              <span className="stars">⭐ {product.rating}</span>
              <span className="reviews">({product.reviews} customer reviews)</span>
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="price-stock-container">
              <div className="detail-price">
                <span className="price">₹{totalPrice}</span>
                {quantity > 1 && (
                  <span className="price-unit">₹{product.price} each</span>
                )}
              </div>
              <div className="stock-status">
                {product.stock > 0 ? (
                  <span className="in-stock">✓ In Stock ({product.stock} available)</span>
                ) : (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="detail-actions">
              <button 
                className="btn btn-primary btn-large"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <button 
                className={`btn btn-outline btn-large wishlist-btn ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
                onClick={handleWishlistToggle}
              >
                {isInWishlist(product.id) ? '♥ Wishlisted' : '♡ Add to Wishlist'}
              </button>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>100% Organic Certified</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Fresh & Handpicked</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Free Delivery on $50+</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-section">
            <h2 className="section-title">Related Products</h2>
            <div className="related-grid">
              {relatedProducts.map(relatedProduct => (
                <Link 
                  to={`/product/${relatedProduct.id}`} 
                  key={relatedProduct.id} 
                  className="product-card"
                >
                  <div className="product-image">
                    <img src={relatedProduct.image} alt={relatedProduct.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{relatedProduct.name}</h3>
                    <div className="product-rating">
                      <span className="stars">⭐ {relatedProduct.rating}</span>
                    </div>
                    <div className="product-footer">
                      <span className="product-price">₹{relatedProduct.price}</span>
                      <span className="btn-view">View</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
