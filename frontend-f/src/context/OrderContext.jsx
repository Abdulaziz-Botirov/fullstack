import React, { createContext, useState, useContext } from 'react';
import API from '../api/axios';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchMyOrders = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const response = await API.get('/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      const response = await API.post('/orders', orderData);
      await fetchMyOrders();
      return { success: true, order: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to create order' 
      };
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (id) => {
    try {
      const response = await API.get(`/orders/my-orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  };

  return (
    <OrderContext.Provider value={{
      orders,
      loading,
      fetchMyOrders,
      createOrder,
      getOrderById
    }}>
      {children}
    </OrderContext.Provider>
  );
};