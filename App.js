import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import About from './pages/About';
import MyOrders from './pages/MyOrders';
import AdminOrders from './pages/AdminOrders';
import Login from './pages/Login';           // ✅ Import Login
import Register from './pages/Register';     // ✅ Import Register (Sign Up)
import { CartProvider, useCart } from './context/CartContext';
import './styles/main.css';

function AppContent() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <BrowserRouter>
      {/* 🔸 Header / Navbar */}
      <header className="topbar">
        <div className="logo">TechWorld</div>
        <nav className="navlinks">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/about">About</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/login">Login</Link>            {/* ✅ Added Login link */}
          <Link to="/register">Sign Up</Link>       {/* ✅ Added Sign Up link */}
        </nav>
      </header>

      {/* 🔸 Main Page Routes */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/admin" element={<AdminOrders />} />
          <Route path="/login" element={<Login />} />       {/* ✅ Added route */}
          <Route path="/register" element={<Register />} /> {/* ✅ Added route */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
