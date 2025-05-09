import api from './api';
import { LibroRequestDTO, LibroResponseDTO, TematicaDTO, CambioEstadoRequest,
         LibroPrestamoDTO, LibroReservaRequestDTO, LibroDTO } from './types';

export const LibroService = {
  agregar: async (libro: LibroRequestDTO): Promise<LibroResponseDTO> => {
    const response = await api.post('/api/libros', libro);
    return response.data;
  },

  listar: async (): Promise<LibroResponseDTO[]> => {
    const response = await api.get('/api/libros');
    return response.data;
  },

  filtrar: async (
    tematicaId?: string,
    estado?: string,
    pais?: string,
    provincia?: string,
    ciudad?: string
  ): Promise<LibroDTO[]> => {
    const response = await api.get('/api/libros/filtrar', {
      params: { tematicaId, estado, pais, provincia, ciudad }
    });
    return response.data;
  },

  actualizar: async (indice: number, libro: LibroRequestDTO): Promise<LibroResponseDTO> => {
    const response = await api.put('/api/libros/' + indice, libro);
    return response.data;
  },

  eliminar: async (indice: number): Promise<void> => {
    await api.delete('/api/libros/' + indice);
  },

  tematicas: async (): Promise<TematicaDTO[]> => {
    const response = await api.get('/api/tematicas');
    return response.data;
  },

  prestamos: async (): Promise<LibroPrestamoDTO[]> => {
    const response = await api.get('/api/libros/prestados');
    return response.data;
  },

  devolver: async (libro:LibroReservaRequestDTO): Promise<void> => {
    await api.post('/api/libros/devolver', libro);
  },

  reservar: async (libro:LibroReservaRequestDTO): Promise<void> => {
    await api.post('/api/libros/reservar', libro);
  },

  cambiarEstado: async (indice: number, estado: CambioEstadoRequest): Promise<LibroResponseDTO> => {
    const response = await api.put('/api/libros/' + indice +'/estado', estado);
    return response.data;
  },

    buscar: async (query: string): Promise<LibroDTO[]> => {
        const response = await api.get('/api/libros/buscar', { params: { query } });
        return response.data;
    },
};