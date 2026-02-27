import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedLikes = localStorage.getItem('likes');
    
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedLikes) setLikedProducts(JSON.parse(savedLikes));
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.productId === product.id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }];
    }
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const toggleLike = (product) => {
    const exists = likedProducts.find(p => p.id === product.id);
    
    let updatedLikes;
    if (exists) {
      updatedLikes = likedProducts.filter(p => p.id !== product.id);
    } else {
      updatedLikes = [...likedProducts, product];
    }
    
    setLikedProducts(updatedLikes);
    localStorage.setItem('likes', JSON.stringify(updatedLikes));
  };

  const isLiked = (productId) => {
    return likedProducts.some(p => p.id === productId);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      likedProducts,
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