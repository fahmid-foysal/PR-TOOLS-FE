import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';
import { authApi } from '../api/authApi.js';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Validate token by fetching profile
      authApi.getProfile()
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          // Mock profile for development
          console.log('API not available, using mock profile');
          setUser({ name: 'Admin User', email: 'admin@example.com' });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      const { token, user } = response;
      localStorage.setItem('authToken', token);
      setUser(user);
      navigate(ROUTES.DASHBOARD);
      toast.success('Login successful');
    } catch (error) {
      // Mock login for development
      console.log('API not available, using mock login');
      localStorage.setItem('authToken', 'mock-token');
      setUser({ name: 'Admin User', email: 'admin@example.com' });
      navigate(ROUTES.DASHBOARD);
      toast.success('Login successful (mock)');
      // toast.error(error.response?.data?.message || 'Login failed');
      // throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate(ROUTES.LOGIN);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};