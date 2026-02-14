import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  const handleIncrement = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page">
      {/* Page Header */}
      <section className="cart-hero">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <p className="page-subtitle">
            {cartItems.length === 0 ? 'No items in cart' : `${getCartCount()} ${getCartCount() === 1 ? 'item' : 'items'} in your cart`}
          </p>
        </div>
      </section>

      <div className="container">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="empty-cart">
            <div className="empty-cart-card">
              <div className="empty-cart-icon">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything to your cart yet</p>
              <Link to="/products" className="btn-browse-products">
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
        ) : (
          /* Cart with Items */
          <div className="cart-layout">
            {/* Left Column - Cart Items */}
            <div className="cart-items-container">
              <div className="cart-items-header">
                <h2>Cart Items</h2>
                <Link to="/products" className="continue-shopping-link">Continue Shopping</Link>
              </div>

              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="item-image">
                      <img src={item.image} alt={item.name} />
                    </Link>

                    {/* Product Info */}
                    <div className="item-info">
                      <Link to={`/product/${item.id}`} className="item-name">
                        {item.name}
                      </Link>
                      <p className="item-category">{item.category}</p>
                      <p className="item-price">₹{item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="item-quantity">
                      <label>Qty</label>
                      <div className="quantity-selector">
                        <button 
                          onClick={() => handleDecrement(item.id, item.quantity)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => handleIncrement(item.id, item.quantity)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Item Subtotal */}
                    <div className="item-subtotal">
                      <label>Subtotal</label>
                      <p className="subtotal-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    {/* Remove Button */}
                    <button 
                      className="item-remove"
                      onClick={() => handleRemove(item.id)}
                      aria-label="Remove item"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"></path>
                      </svg>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="order-summary-container">
              <div className="order-summary">
                <h2>Order Summary</h2>

                <div className="summary-details">
                  <div className="summary-row">
                    <span>Items ({getCartCount()})</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="summary-row">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'free-text' : ''}>
                      {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>

                  {shipping > 0 && (
                    <div className="shipping-notice">
                      Add ₹{(500 - subtotal).toFixed(2)} more for FREE shipping!
                    </div>
                  )}

                  <div className="summary-divider"></div>

                  <div className="summary-row summary-total">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="promo-code">
                  <input 
                    type="text" 
                    placeholder="Enter promo code"
                    className="promo-input"
                  />
                  <button className="promo-btn">Apply</button>
                </div>

                {/* Checkout Button */}
                <Link to="/checkout" className="checkout-btn">
                  Proceed to Checkout
                </Link>

                <div className="secure-notice">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
