import api from './api';

export const RegionService = {
  getContinentes: async (): Promise<string[]> => {
    const response = await api.get('/api/regiones/continentes');
    return response.data;
  },

  getPaisesPorContinente: async (continente: string): Promise<string[]> => {
    const response = await api.get(`/api/regiones/continentes/${continente}/paises`);
    return response.data;
  },

  getProvinciasPorPais: async (continente: string, pais: string): Promise<string[]> => {
    const response = await api.get(`/api/regiones/continentes/${continente}/paises/${pais}/provincias`);
    return response.data;
  },

  getCiudadesPorProvincia: async (continente: string, pais: string, provincia: string): Promise<string[]> => {
    const response = await api.get(`/api/regiones/continentes/${continente}/paises/${pais}/provincias/${provincia}/ciudades`);
    return response.data;
  }
};