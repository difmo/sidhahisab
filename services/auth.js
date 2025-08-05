// auth.js
import api from './api';

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const logout = () => {
  return api.post('/auth/logout');
};

export const refreshToken = (token) => {
  return api.post('/auth/refresh', { token });
};
