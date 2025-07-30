import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    axios.get('/api/auth/me')
      .then((res) => {
        setUser(res.data);
        setIsLoggedIn(true);
        setRole(res.data.role?.toUpperCase() || null);
        localStorage.setItem('role', res.data.role?.toUpperCase() || '');
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('AuthContext - No token found');
      setIsLoggedIn(false);
      setUser(null);
      return;
    }

    try {
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('AuthContext - API response:', res.data);
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('AuthContext - Error checking auth:', error);
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, role, logout, checkAuth, setIsLoggedIn, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
