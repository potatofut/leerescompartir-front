/**
 * Datos requeridos para iniciar sesión en el sistema
 */
export interface LoginRequestDTO {
    email: string;
    password: string;
}

/**
 * Datos del usuario devueltos después de un inicio de sesión exitoso
 */
export interface LoginResponseDTO {
    id: string;
    nombre: string;
    email: string;
    ciudad: string;
    provincia: string;
    pais: string;
    continente: string;
    imagen?: string;
    cp?: string;
    telefono?: string;
    biografia?: string;
    intereses?: string;
}

/**
 * Datos requeridos para registrar un nuevo usuario en el sistema
 */
export interface RegistroRequestDTO {
    nombre: string;
    email: string;
    password: string;
    ciudad: string;
    provincia: string;
    pais: string;
    continente: string;
}

/**
 * Información geográfica de un usuario
 */
export interface RegionUsuario {
    ciudad: string;
    provincia: string;
    pais: string;
    continente: string;
}

/**
 * Datos completos de un usuario en el sistema
 */
export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    password?: string;
    region: RegionUsuario;
    imagen?: string;
}

/**
 * Datos que se pueden actualizar del perfil de un usuario
 */
export interface UpdateUserDTO {
    nombre: string;
    email: string;
    ciudad: string;
    provincia: string;
    pais: string;
    continente: string;
    imagen?: string;
    cp?: string;
    telefono?: string;
    biografia?: string;
    intereses?: string;
}

/**
 * Datos requeridos para agregar un nuevo libro al sistema
 */
export interface LibroRequestDTO {
    titulo: string;
    autor: string;
    descripcion: string;
    portada: string;
    tematicas: string[];
}

/**
 * Datos completos de un libro incluyendo información de reservas y ubicación
 */
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

/**
 * Datos básicos de un libro devueltos por la API
 */
export interface LibroResponseDTO {
    titulo: string;
    autor: string;
    estado: string;
    descripcion: string;
    portada: string;
    tematicas: string[];
    reservas: Reserva[];
}

/**
 * Información de una reserva o préstamo de libro
 */
export interface Reserva {
    fechaReserva: Date;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    emailUsuario: string;
}

/**
 * Datos para cambiar el estado de un libro
 */
export interface CambioEstadoRequest {
    nuevoEstado: string; // disponible, prestado, reservado
}

/**
 * Datos de un libro que está actualmente prestado
 */
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

/**
 * Datos mínimos requeridos para reservar o devolver un libro
 */
export interface LibroReservaRequestDTO {
    titulo: string;
    emailUsuario: string;
}

/**
 * Datos de una temática o categoría de libros
 */
export interface TematicaDTO {
    id: string;
    nombre: string;
    imagen: string;
    descripcion: string;
}