import api from './api';
import { LibroRequestDTO, LibroResponseDTO, TematicaDTO, CambioEstadoRequest,
         LibroPrestamoDTO, LibroReservaRequestDTO, LibroDTO } from './types';

/**
 * Servicio que maneja todas las operaciones relacionadas con libros
 */
export const LibroService = {
  /**
   * Agrega un nuevo libro al sistema
   */
  agregar: async (libro: LibroRequestDTO): Promise<LibroResponseDTO> => {
    const response = await api.post('/api/libros', libro);
    return response.data;
  },

  /**
   * Obtiene la lista completa de libros disponibles
   */
  listar: async (): Promise<LibroResponseDTO[]> => {
    const response = await api.get('/api/libros');
    return response.data;
  },

  /**
   * Filtra libros según temática, estado y ubicación
   */
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

  /**
   * Actualiza la información de un libro existente
   */
  actualizar: async (indice: number, libro: LibroRequestDTO): Promise<LibroResponseDTO> => {
    const response = await api.put('/api/libros/' + indice, libro);
    return response.data;
  },

  /**
   * Elimina un libro del sistema
   */
  eliminar: async (indice: number): Promise<void> => {
    await api.delete('/api/libros/' + indice);
  },

  /**
   * Obtiene todas las temáticas disponibles para los libros
   */
  tematicas: async (): Promise<TematicaDTO[]> => {
    const response = await api.get('/api/tematicas');
    return response.data;
  },

  /**
   * Obtiene la lista de libros que están actualmente prestados
   */
  prestamos: async (): Promise<LibroPrestamoDTO[]> => {
    const response = await api.get('/api/libros/prestados');
    return response.data;
  },

  /**
   * Registra la devolución de un libro prestado
   */
  devolver: async (libro:LibroReservaRequestDTO): Promise<void> => {
    await api.post('/api/libros/devolver', libro);
  },

  /**
   * Registra la reserva de un libro disponible
   */
  reservar: async (libro:LibroReservaRequestDTO): Promise<void> => {
    await api.post('/api/libros/reservar', libro);
  },

  /**
   * Actualiza el estado de un libro (disponible, prestado, en reparación, etc.)
   */
  cambiarEstado: async (indice: number, estado: CambioEstadoRequest): Promise<LibroResponseDTO> => {
    const response = await api.put('/api/libros/' + indice +'/estado', estado);
    return response.data;
  },

  /**
   * Busca libros por título, autor u otros términos
   */
  buscar: async (query: string): Promise<LibroDTO[]> => {
    const response = await api.get('/api/libros/buscar', { params: { query } });
    return response.data;
  },
};