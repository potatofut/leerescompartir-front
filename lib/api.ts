import axios from 'axios';

/**
 * Instancia de axios configurada con valores predeterminados para la API
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Interceptor de solicitudes que agrega el token de autenticación a cada petición
 * @param {import('axios').AxiosRequestConfig} config - Configuración de la solicitud
 * @returns {import('axios').AxiosRequestConfig} Configuración modificada con el token de autenticación
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Interceptor de respuestas que maneja errores de autenticación
 * @param {import('axios').AxiosResponse} response - Respuesta exitosa
 * @param {import('axios').AxiosError} error - Error de la solicitud
 * @returns {Promise<import('axios').AxiosResponse>} Respuesta original o rechazo de la promesa
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado o inválido, redirigir al login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;