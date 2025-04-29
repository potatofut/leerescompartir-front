import api from './api';
import { LibroRequestDTO, LibroResponseDTO, TematicaDTO } from './types';

export const LibroService = {
  agregar: async (libro: LibroRequestDTO): Promise<LibroResponseDTO> => {
    const response = await api.post('/api/libros', libro);
    return response.data;
  },

  listar: async (): Promise<LibroResponseDTO[]> => {
    const response = await api.get('/api/libros');
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
  }
};