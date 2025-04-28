// lib/auth.ts
import api from './api';
import { LoginRequestDTO, RegistroRequestDTO, Usuario, LoginResponseDTO, UpdateUserDTO } from './types';

export const AuthService = {
  login: async (credentials: LoginRequestDTO): Promise<LoginResponseDTO> => {
    const response = await api.post('/api/usuarios/login', credentials);
    return response.data;
  },

  register: async (userData: RegistroRequestDTO): Promise<Usuario> => {
    const response = await api.post('/api/usuarios/registro', userData);
    return response.data;
  },

  getProfile: async (): Promise<Usuario> => {
    const response = await api.get('/api/usuarios/perfil');
    return response.data;
  },

  changePassword: async (passwordData: { passwordActual: string, nuevaPassword: string }): Promise<void> => {
    await api.post('/api/usuarios/cambiar-password', passwordData);
  },

  updateProfile: async (userData: UpdateUserDTO): Promise<Usuario> => {
    const response = await api.put('/api/usuarios/actualizar', userData);
    return response.data;
  },
  
  logout: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }
};