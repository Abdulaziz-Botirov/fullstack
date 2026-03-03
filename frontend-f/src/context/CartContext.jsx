import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await API.get('/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchLikes = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await API.get('/likes');
      setLikedProducts(response.data);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      fetchLikes();
    } else {
      setCartItems([]);
      setLikedProducts([]);
    }
  }, [isAuthenticated]);

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      alert('Iltimos, avval tizimga kiring');
      return;
    }
    try {
      await API.post('/cart', {
        productId: product.id,
        quantity: 1
      });
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await API.delete(`/cart/${cartItemId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    try {
      await API.put(`/cart/${cartItemId}`, { quantity });
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const toggleLike = async (product) => {
    if (!isAuthenticated) {
      alert('Iltimos, avval tizimga kiring');
      return;
    }
    try {
      const response = await API.post(`/likes/${product.id}/toggle`);
      await fetchLikes();
      return response.data;
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const isLiked = (productId) => {
    return likedProducts.some(p => p.id === productId);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.Product?.price || item.price) * item.quantity);
    }, 0);
  };

  const clearCart = async () => {
    try {
      await API.delete('/cart');
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      likedProducts,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleLike,
      isLiked,
      getCartTotal,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};