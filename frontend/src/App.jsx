import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './layouts/Layout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Wishlist from './pages/Wishlist/Wishlist';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Account from './pages/Account/Account';
import Orders from './pages/Orders/Orders';
import OrderDetail from './pages/Orders/OrderDetail';
import EditProfile from './pages/Profile/EditProfile';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AuthCallback from './pages/Auth/AuthCallback';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
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
                
                {/* Protected Routes - require authentication */}
                <Route 
                  path="account" 
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="orders" 
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="wishlist" 
                  element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="cart" 
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  } 
                />
                 <Route 
                   path="profile/edit" 
                   element={
                     <ProtectedRoute>
                       <EditProfile />
                     </ProtectedRoute>
                   } 
                 />
                <Route 
                  path="checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                 <Route 
                   path="orders" 
                   element={
                     <ProtectedRoute>
                       <Orders />
                     </ProtectedRoute>
                   } 
                 />
                 <Route 
                   path="orders/:id" 
                   element={
                     <ProtectedRoute>
                       <OrderDetail />
                     </ProtectedRoute>
                   } 
                 />
              </Route>

              {/* Routes without Layout (Auth pages, 404) */}
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Register />} />
              <Route path="register" element={<Register />} /> {/* Redirect old route */}
              <Route path="auth/google/callback" element={<AuthCallback />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
