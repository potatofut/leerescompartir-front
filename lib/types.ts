export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    id: string;
    nombre: string;
    email: string;
    imagen?: string;
}

export interface RegistroRequestDTO {
    nombre: string;
    email: string;
    password: string;
    ciudad: string;
    provincia: string;
    pais: string;
    continente: string;
}

export interface RegionUsuario {
    ciudad: string;
    provincia: string;
    pais: string;
    continente: string;
}

export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    password?: string;
    region: RegionUsuario;
    imagen?: string;
}

export interface UpdateUserDTO {
    nombre: string;
    email: string;
    imagen?: string;
}

export interface LibroRequestDTO {
    titulo: string;
    autor: string;
    descripcion: string;
    portada: string;
    tematicas: string[];
}

export interface LibroResponseDTO {
    titulo: string;
    autor: string;
    estado: string;
    descripcion: string;
    portada: string;
    tematicas: string[];
    reservas: Reserva[];
}

export interface Reserva {
    fecha: string;
    usuario_id: string;
}

export interface TematicaDTO {
    id: string;
    nombre: string;
    imagen: string;
    descripcion: string;
}