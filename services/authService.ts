// src/services/authService.ts
import api from './api';

class AuthService {

  login(data: { username: string; passwordHash: string }) {
    return api.post('/auth-service/api/Auth/login', data);
  }
  otpLogin(data: any) {
    return api.post('/auth-service/api/Auth/otp-login', data);
  }

  refresh(data: any) {
    return api.post('/auth-service/api/Auth/refresh', data);
  }

  secure() {
    return api.get('/auth-service/api/Auth/secure');
  }

  logout() {
    return api.post('/auth-service/api/Auth/logout');
  }

  validateToken() {
    return api.get('/auth-service/api/Auth/validate-token');
  }

  validate(data: any) {
    return api.post('/auth-service/api/Auth/validate', data);
  }
}

export default new AuthService();
