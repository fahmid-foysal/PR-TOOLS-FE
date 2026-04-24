import apiClient from './client.js';

export const configurationApi = {
  // Brands
  getBrands: async () => {
    const response = await apiClient.get('/configuration/brand/all');
    return response.data;
  },

  createBrand: async (data) => {
    const response = await apiClient.post('/configuration/brand/create', data);
    return response.data;
  },

  updateBrand: async (id, data) => {
    const response = await apiClient.put(`/configuration/brand/update/${id}`, data);
    return response.data;
  },

  deleteBrand: async (id) => {
    const response = await apiClient.delete(`/configuration/brand/delete/${id}`);
    return response.data;
  },

  // Categories
  getCategories: async () => {
    const response = await apiClient.get('/configuration/category/all');
    return response.data;
  },

  createCategory: async (data) => {
    const response = await apiClient.post('/configuration/category/create', data);
    return response.data;
  },

  updateCategory: async (id, data) => {
    const response = await apiClient.put(`/configuration/category/update/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await apiClient.delete(`/configuration/category/delete/${id}`);
    return response.data;
  },

  // Offer Categories
  getOfferCategories: async () => {
    const response = await apiClient.get('/configuration/offer-category/all');
    return response.data;
  },

  createOfferCategory: async (data) => {
    const response = await apiClient.post('/configuration/offer-category/create', data);
    return response.data;
  },

  updateOfferCategory: async (id, data) => {
    const response = await apiClient.put(`/configuration/offer-category/update/${id}`, data);
    return response.data;
  },

  deleteOfferCategory: async (id) => {
    const response = await apiClient.delete(`/configuration/offer-category/delete/${id}`);
    return response.data;
  },

  // Home Page Sections
  getHomePageSections: async () => {
    const response = await apiClient.get('/configuration/home-page-section/all');
    return response.data;
  },

  createHomePageSection: async (data) => {
    const response = await apiClient.post('/configuration/home-page-section/create', data);
    return response.data;
  },

  updateHomePageSection: async (id, data) => {
    const response = await apiClient.put(`/configuration/home-page-section/update/${id}`, data);
    return response.data;
  },

  deleteHomePageSection: async (id) => {
    const response = await apiClient.delete(`/configuration/home-page-section/delete/${id}`);
    return response.data;
  },

  // Banners
  getBanners: async () => {
    const response = await apiClient.get('/configuration/banner/all');
    return response.data;
  },

  createBanner: async (data) => {
    const response = await apiClient.post('/configuration/banner/create', data);
    return response.data;
  },

  updateBanner: async (id, data) => {
    const response = await apiClient.put(`/configuration/banner/update/${id}`, data);
    return response.data;
  },

  deleteBanner: async (id) => {
    const response = await apiClient.delete(`/configuration/banner/delete/${id}`);
    return response.data;
  },
};