import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { products, categories } from '../../data/products';
import './Products.css';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(1000);

  // Get cart and wishlist functions
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by max price
    result = result.filter(p => p.price <= maxPrice);

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, sortBy, maxPrice]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  // Handle add to cart
  const handleAddToCart = (product, e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    addToCart(product, 1);
    alert(`Added ${product.name} to cart!`);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (product, e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="container">
          <h1 className="page-title">Our Products</h1>
          <p className="page-subtitle">Discover fresh, organic products for a healthier lifestyle</p>
        </div>
      </div>

      <div className="container">
        <div className="products-controls">
          {/* Search Bar */}
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="sort-control">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="products-content">
          {/* Category Filters */}
          <aside className="products-sidebar">
            <h3 className="sidebar-title">Categories</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                >
                  <span className="filter-icon">{category.icon}</span>
                  <span className="filter-name">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="price-filter-section">
              <h3 className="sidebar-title">Filter by Price</h3>
              <div className="price-range-slider">
                <div className="price-value">
                  Up to ₹{maxPrice}
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="price-slider"
                />
                <div className="price-range-labels">
                  <span>₹0</span>
                  <span>₹1000</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="products-main">
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <Link to={`/product/${product.id}`} className="product-image-link">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </Link>
                    <button 
                      className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                      onClick={(e) => handleWishlistToggle(product, e)}
                      aria-label="Add to wishlist"
                    >
                      {isInWishlist(product.id) ? '💚' : '🤍'}
                    </button>
                    <div className="product-info">
                      <span className="product-category">{product.category}</span>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="product-name">{product.name}</h3>
                      </Link>
                      <p className="product-desc">{product.description}</p>
                      <div className="product-rating">
                        <span className="stars">⭐ {product.rating}</span>
                        <span className="reviews">({product.reviews} reviews)</span>
                      </div>
                      <div className="product-footer">
                        <span className="product-price">₹{product.price}</span>
                        <div className="product-actions">
                          <button 
                            className="btn-add-cart"
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <span className="no-results-icon">😕</span>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSortBy('featured');
                  }}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
