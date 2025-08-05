// src/services/passwordService.ts
import api from './api';

class PasswordService {
  forgotPassword(data: { emailOrPhone: string }) {
    return api.post('/auth-service/api/Password/forgot-Password', data);
  }

  resetPassword(data: { token: string; newPassword: string }) {
    return api.post('/auth-service/api/Password/ResetPassword', data);
  }

  updatePassword(data: { oldPassword: string; newPassword: string }) {
    return api.put('/auth-service/api/Password/UpdatedPassword', data);
  }
}

export default new PasswordService();
