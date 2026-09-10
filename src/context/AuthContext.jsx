import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('tasty_user');
    const token = Cookies.get('tasty_token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    Cookies.set('tasty_token', userData.token, { expires: 7 });
    localStorage.setItem('tasty_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove('tasty_token');
    localStorage.removeItem('tasty_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin: user?.role === 'Admin' }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);