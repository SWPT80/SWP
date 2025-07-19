import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('AuthContext - No token found');
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      console.log('AuthContext - Checking auth with token:', token.substring(0, 10) + '...');
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('AuthContext - API response:', res.data);
      const userData = {
        id: res.data.id,
        fullName: res.data.fullName || res.data.email.split('@')[0],
        role: res.data.role?.toUpperCase() || 'USER',
      };
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('AuthContext - Error checking auth:', error.response?.data || error.message);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, checkAuth, setIsLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);