import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    if (email === 'abdulazizbotirov527@gmail.com' && password === 'Abu1122@') {
      const userData = {
        email: 'abdulazizbotirov527@gmail.com',
        name: 'Admin',
        role: 'admin'
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Email yoki parol notogri' };
  };

  const register = (name, email, password) => {
    const userData = {
      name,
      email,
      role: 'user'
    };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('products');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};