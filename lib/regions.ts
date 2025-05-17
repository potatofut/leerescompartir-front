import api from './api';

/**
 * Servicio que maneja la obtención de datos geográficos jerárquicos
 */
export const RegionService = {
  /**
   * Obtiene la lista de todos los continentes disponibles
   */
  getContinentes: async (): Promise<string[]> => {
    const response = await api.get('/api/regiones/continentes');
    return response.data;
  },

  /**
   * Obtiene la lista de países pertenecientes a un continente específico
   */
  getPaisesPorContinente: async (continente: string): Promise<string[]> => {
    const response = await api.get(`/api/regiones/continentes/${continente}/paises`);
    return response.data;
  },

  /**
   * Obtiene la lista de provincias pertenecientes a un país específico
   */
  getProvinciasPorPais: async (continente: string, pais: string): Promise<string[]> => {
    const response = await api.get(`/api/regiones/continentes/${continente}/paises/${pais}/provincias`);
    return response.data;
  },

  /**
   * Obtiene la lista de ciudades pertenecientes a una provincia específica
   */
  getCiudadesPorProvincia: async (continente: string, pais: string, provincia: string): Promise<string[]> => {
    const response = await api.get(`/api/regiones/continentes/${continente}/paises/${pais}/provincias/${provincia}/ciudades`);
    return response.data;
  }
};