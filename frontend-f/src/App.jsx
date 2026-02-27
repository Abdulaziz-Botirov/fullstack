import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import Products from './components/Products';
import Cart from './components/Cart';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <div className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Products />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </div>
            </div>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;