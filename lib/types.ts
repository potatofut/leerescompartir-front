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

export interface LibroDTO{
    titulo: string;
    autor: string;
    descripcion: string;
    portada: string;
    estado: string;
    tematicas: string[];
    reservas: Reserva[];
    emailUsuario: string;
    ciudadUsuario: string;
    provinciaUsuario: string;
    paisUsuario: string;
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
    fechaReserva: Date;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    emailUsuario: string;
}

export interface LibroPrestamoDTO {
    titulo: string;
    autor: string;
    descripcion: string;
    portada: string;
    estado: string;
    emailUsuario: string;
    fechaReserva: Date;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
}

export interface LibroReservaRequestDTO {
    titulo: string;
    emailUsuario: string;
}

export interface TematicaDTO {
    id: string;
    nombre: string;
    imagen: string;
    descripcion: string;
}