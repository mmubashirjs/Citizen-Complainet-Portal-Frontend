import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('citizen_portal_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('citizen_portal_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('citizen_portal_user');
      localStorage.removeItem('citizen_portal_token');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      if (res && res.user) {
        setUser(res.user);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await authService.signup(data);
      if (res && res.user) {
        setUser(res.user);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    token: localStorage.getItem('citizen_portal_token'),
    isAuthenticated: !!user,
    isOfficer: user?.role === 'officer',
    isCitizen: user?.role === 'citizen',
    loading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
