import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  // Configure axios defaults
  axios.defaults.baseURL = API_URL;
  axios.defaults.withCredentials = true;

  // Add token to requests if available
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Load user on mount
  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Load user from token
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/user/me');
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/api/user/register', { name, email, password });
      
      if (res.data.success) {
        const newToken = res.data.token;
        setToken(newToken);
        localStorage.setItem('token', newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/user/login', { email, password });
      
      if (res.data.success) {
        const newToken = res.data.token;
        setToken(newToken);
        localStorage.setItem('token', newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post('/api/user/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const value = {
    user,
    loading,
    token,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
