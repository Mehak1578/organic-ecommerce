import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { products, categories } from '../../data/products';
import CategoryNav from '../../components/CategoryNav';
import './Products.css';

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderHighlightedText(text, query) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return text;

  const regex = new RegExp(`(${escapeRegExp(normalizedQuery)})`, 'ig');
  const parts = String(text).split(regex);

  return parts.map((part, index) => {
    const isMatch = part.toLowerCase() === normalizedQuery.toLowerCase();
    return isMatch ? (
      <span key={index} className="search-highlight">{part}</span>
    ) : (
      <span key={index}>{part}</span>
    );
  });
}

function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // debounced value used for filtering
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(1000);
  const searchBarRef = useRef(null);

  const countsByCategory = useMemo(() => {
    const counts = {};
    for (const product of products) {
      counts[product.category] = (counts[product.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Debounce search input for smoother UX
  useEffect(() => {
    const handle = setTimeout(() => {
      setSearchTerm(searchInput.trim());
    }, 250);

    return () => clearTimeout(handle);
  }, [searchInput]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const onPointerDown = (e) => {
      if (!searchBarRef.current) return;
      if (!searchBarRef.current.contains(e.target)) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const suggestions = useMemo(() => {
    const query = searchInput.trim().toLowerCase();
    if (!query) return [];

    return products
      .filter((p) => p.name.toLowerCase().includes(query))
      .slice(0, 6);
  }, [searchInput]);

  // Get cart and wishlist functions
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

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

  // UI-only: show skeleton placeholders briefly on category change
  useEffect(() => {
    setIsCategoryLoading(true);
    const t = window.setTimeout(() => setIsCategoryLoading(false), 220);
    return () => window.clearTimeout(t);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsSuggestionsOpen(false);
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
    
    // Check if user is logged in
    if (!isAuthenticated) {
      // Save product ID to localStorage for redirect after login
      localStorage.setItem('redirectProduct', JSON.stringify({ id: product.id, quantity: 1 }));
      // Redirect to login
      navigate('/login', { state: { from: { pathname: '/products' } } });
      return;
    }
    
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
          <div className="search-bar" ref={searchBarRef}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setIsSuggestionsOpen(true);
              }}
              onFocus={() => setIsSuggestionsOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsSuggestionsOpen(false);
                }
              }}
              className="search-input"
              aria-label="Search products"
              aria-autocomplete="list"
              aria-expanded={isSuggestionsOpen}
            />

            {isSuggestionsOpen && searchInput.trim() && (
              <div className="search-suggestions" role="listbox" aria-label="Search suggestions">
                {suggestions.length > 0 ? (
                  suggestions.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      className="search-suggestion"
                      onClick={() => {
                        setIsSuggestionsOpen(false);
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      <span className="suggestion-name">
                        {renderHighlightedText(product.name, searchInput)}
                      </span>
                      <span className="suggestion-meta">
                        ₹{product.price}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="search-suggestion-empty">
                    No results found for “{searchInput.trim()}”.
                  </div>
                )}
              </div>
            )}
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
            <CategoryNav
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              countsByCategory={countsByCategory}
              totalCount={products.length}
              isLoading={false}
            />

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
            {isCategoryLoading ? (
              <div className="products-grid products-grid-skeleton" aria-label="Loading products">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div key={idx} className="product-card skeleton-card" aria-hidden="true">
                    <div className="skeleton-image" />
                    <div className="product-info">
                      <div className="skeleton-line skeleton-line-sm" />
                      <div className="skeleton-line" />
                      <div className="skeleton-line" />
                      <div className="skeleton-line skeleton-line-lg" />
                      <div className="skeleton-footer" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="products-grid" key={`${selectedCategory}-${searchTerm}-${sortBy}-${maxPrice}`}>
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
                        <h3 className="product-name">
                          {searchTerm ? renderHighlightedText(product.name, searchTerm) : product.name}
                        </h3>
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
                <h3>No products found</h3>
                <p>
                  {searchTerm
                    ? <>No matches for “{searchTerm}”. Try a different keyword or adjust filters.</>
                    : <>No products are available for the selected filters. Try another category or adjust your filters.</>
                  }
                </p>
                <button 
                  onClick={() => {
                    setSearchInput('');
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
