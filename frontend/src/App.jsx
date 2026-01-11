import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Layout from './layouts/Layout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Wishlist from './pages/Wishlist/Wishlist';
import Cart from './pages/Cart/Cart';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            {/* Routes with Layout (Navbar + Footer) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="cart" element={<Cart />} />
            </Route>

            {/* Routes without Layout (Login, Register, 404) */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route path="register" element={<Register />} /> {/* Redirect old route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
