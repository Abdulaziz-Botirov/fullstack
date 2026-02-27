import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Online Do'kon
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">
              Mahsulotlar
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-indigo-600">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Chiqish</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                  Kirish
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-indigo-600">
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;