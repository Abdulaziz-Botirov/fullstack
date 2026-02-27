import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts([]);
    }
  }, []);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      price: parseFloat(productData.price)
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return { success: true, product: newProduct };
  };

  const updateProduct = (id, productData) => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...productData, id, price: parseFloat(productData.price) } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return { success: true };
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return { success: true };
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};