import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signin`, {
        email,
        password
      });
      
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
      
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Signup failed' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUserImage = (imagePath) => {
    setUser(prevUser => ({
      ...prevUser,
      image: imagePath
    }));
    
    // Update localStorage
    const updatedUser = { ...user, image: imagePath };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const checkAuth = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    // Try to get user data from localStorage first
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }

    // If no stored user data, try to verify token with server
    try {
      const response = await axios.get(`${API_BASE_URL}/user/dashboard`);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [token]);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    signup,
    logout,
    updateUserImage,
    token
  }), [user, loading, token]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 