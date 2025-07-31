import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initAuth(); // gọi riêng initAuth thay vì lặp lại
  }, []);

  const initAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedRole = res.data.role?.toUpperCase() || null;
      setUser(res.data);
      setIsLoggedIn(true);
      setRole(fetchedRole);
      localStorage.setItem('role', fetchedRole);
    } catch (err) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Gọi sau login thành công
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('AuthContext - No token');
      logout();
      return;
    }

    try {
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedRole = res.data.role?.toUpperCase() || null;
      setUser(res.data);
      setIsLoggedIn(true);
      setRole(fetchedRole);
      localStorage.setItem('role', fetchedRole);
      console.log('✅ AuthContext - checkAuth updated:', res.data);
    } catch (err) {
      console.error('❌ AuthContext - checkAuth failed:', err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, role, logout, checkAuth, setUser, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
