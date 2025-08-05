// src/services/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://crossbiz-api.apexpath.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Set a timeout for requests
  accept: '*/*',
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
