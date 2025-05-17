// lib/auth.ts
import api from './api';
import { LoginRequestDTO, RegistroRequestDTO, Usuario, LoginResponseDTO, UpdateUserDTO } from './types';

/**
 * Servicio de autenticación que maneja todas las operaciones relacionadas con usuarios
 * @namespace AuthService
 */
export const AuthService = {
  /**
   * Inicia sesión de un usuario
   * @param {LoginRequestDTO} credentials - Credenciales del usuario (email y contraseña)
   * @returns {Promise<LoginResponseDTO>} Datos de la respuesta del login incluyendo el token
   * @throws {Error} Si las credenciales son inválidas
   */
  login: async (credentials: LoginRequestDTO): Promise<LoginResponseDTO> => {
    const response = await api.post('/api/usuarios/login', credentials);
    return response.data;
  },

  /**
   * Registra un nuevo usuario en el sistema
   * @param {RegistroRequestDTO} userData - Datos del nuevo usuario
   * @returns {Promise<Usuario>} Datos del usuario registrado
   * @throws {Error} Si el email ya está registrado o los datos son inválidos
   */
  register: async (userData: RegistroRequestDTO): Promise<Usuario> => {
    const response = await api.post('/api/usuarios/registro', userData);
    return response.data;
  },

  /**
   * Obtiene el perfil del usuario actualmente autenticado
   * @returns {Promise<Usuario>} Datos del perfil del usuario
   * @throws {Error} Si no hay usuario autenticado
   */
  getProfile: async (): Promise<Usuario> => {
    const response = await api.get('/api/usuarios/perfil');
    return response.data;
  },

  /**
   * Cambia la contraseña del usuario actual
   * @param {Object} passwordData - Datos para el cambio de contraseña
   * @param {string} passwordData.passwordActual - Contraseña actual del usuario
   * @param {string} passwordData.nuevaPassword - Nueva contraseña deseada
   * @returns {Promise<void>}
   * @throws {Error} Si la contraseña actual es incorrecta
   */
  changePassword: async (passwordData: { passwordActual: string, nuevaPassword: string }): Promise<void> => {
    await api.post('/api/usuarios/cambiar-password', passwordData);
  },

  /**
   * Actualiza los datos del perfil del usuario
   * @param {UpdateUserDTO} userData - Nuevos datos del usuario
   * @returns {Promise<Usuario>} Datos actualizados del usuario
   * @throws {Error} Si los datos son inválidos
   */
  updateProfile: async (userData: UpdateUserDTO): Promise<Usuario> => {
    const response = await api.put('/api/usuarios/actualizar', userData);
    return response.data;
  },
  
  /**
   * Cierra la sesión del usuario actual
   * Elimina el token de autenticación y los datos del usuario del almacenamiento local
   */
  logout: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }
};