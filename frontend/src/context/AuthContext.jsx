import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  };

  const register = async (name, email, password, phone = '', address = '') => {
    try {
      const response = await axios.post('/api/auth/register', { name, email, password, phone, address });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Registration failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateProfile = async (data) => {
    try {
      const response = await axios.put('/api/auth/profile', data);
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Update failed';
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
