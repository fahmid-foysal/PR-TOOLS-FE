import apiClient from './client.js';

export const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/users/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },
};