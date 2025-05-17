"use client"

import { createContext, useState, useContext, useEffect, type ReactNode, useCallback } from "react"
import { LoginResponseDTO, LibroPrestamoDTO, LibroReservaRequestDTO } from '../../lib/types'
import { AuthService } from '../../lib/auth'
import { LibroService } from '../../lib/libros'
import { LibroRequestDTO, LibroResponseDTO, UpdateUserDTO, Usuario } from '../../lib/types'

/**
 * Interfaz que define la estructura del contexto de usuario
 * Incluye el estado del usuario, libros, préstamos y métodos para gestionarlos
 */
interface UserContextType {
    user: LoginResponseDTO | null
    libros: LibroResponseDTO[]
    prestamos: LibroPrestamoDTO[]
    isLoggedIn: boolean
    login: (userData: LoginResponseDTO) => void
    logout: () => void
    loading: boolean
    updateUserImage: (imageBase64: string) => Promise<void>
    updateProfile: (userData: UpdateUserDTO) => Promise<Usuario>
    agregarLibro: (libro: LibroRequestDTO) => Promise<void>
    actualizarLibro: (indice: number, libro: LibroRequestDTO) => Promise<void>
    eliminarLibro: (indice: number) => Promise<void>
    cargarLibros: () => Promise<void>
    cargarPrestamos: () => Promise<void>
    devolverLibro: (libro: LibroReservaRequestDTO) => Promise<void>
    reservar: (libro: LibroReservaRequestDTO) => Promise<void>
}

// Contexto con valores por defecto
const UserContext = createContext<UserContextType>({
    user: null,
    libros: [],
    prestamos: [],
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
    loading: true,
    updateUserImage: async () => { },
    updateProfile: async () => { return {} as Usuario },
    agregarLibro: async () => { },
    actualizarLibro: async () => { },
    eliminarLibro: async () => { },
    cargarLibros: async () => { },
    cargarPrestamos: async () => { },
    devolverLibro: async () => { },
    reservar: async () => { }
})

/**
 * Proveedor del contexto de usuario que maneja el estado global de la aplicación
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 */
export function UserProvider({ children }: { children: ReactNode }) {
    // Estados principales
    const [user, setUser] = useState<LoginResponseDTO | null>(null)
    const [libros, setLibros] = useState<LibroResponseDTO[]>([])
    const [prestamos, setPrestamos] = useState<LibroPrestamoDTO[]>([])
    const [loading, setLoading] = useState(true)
    const [isClient, setIsClient] = useState(false)

    // Detectar renderizado del lado del cliente
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Cargar datos del usuario desde localStorage solo en el cliente
    useEffect(() => {
        if (isClient) {
            const storedUser = localStorage.getItem('user_data')
            if (storedUser) {
                try {
                    const userData = JSON.parse(storedUser)
                    setUser(userData)
                } catch (e) {
                    console.error('Failed to parse user data from storage')
                }
            }
            setLoading(false)
        }
    }, [isClient])

    // Cargar libros y préstamos cuando el usuario está autenticado
    useEffect(() => {
        if (user && isClient) {
            cargarLibros()
            cargarPrestamos()
        }
    }, [user, isClient])

    /**
     * Carga la lista de libros del usuario
     */
    const cargarLibros = useCallback(async () => {
        if (!user) return

        try {
            const librosData = await LibroService.listar()
            setLibros(librosData)
        } catch (error) {
            console.error('Error loading books:', error)
        }
    }, [user])

    /**
     * Carga la lista de préstamos del usuario
     */
    const cargarPrestamos = useCallback(async () => {
        if (!user) return

        try {
            const prestamosData = await LibroService.prestamos()
            setPrestamos(prestamosData)
        } catch (error) {
            console.error('Error loading loans:', error)
        }
    }, [user])

    /**
     * Registra la devolución de un libro
     * @param {LibroReservaRequestDTO} libro - Datos del libro a devolver
     */
    const devolverLibro = async (libro: LibroReservaRequestDTO) => {
        try {
            await LibroService.devolver(libro)
            cargarPrestamos() // Actualizar lista de préstamos
        } catch (error) {
            console.error('Error returning book:', error)
            throw error
        }
    }

    /**
     * Registra la reserva de un libro
     * @param {LibroReservaRequestDTO} libro - Datos del libro a reservar
     */
    const reservar = async (libro: LibroReservaRequestDTO) => {
        try {
            await LibroService.reservar(libro)
            cargarPrestamos() // Actualizar lista de préstamos
        } catch (error) {
            console.error('Error making reservation:', error)
            throw error
        }
    }

    /**
     * Inicia sesión del usuario y guarda sus datos
     * @param {LoginResponseDTO} userData - Datos del usuario
     */
    const login = useCallback((userData: LoginResponseDTO) => {
        if (isClient) {
            localStorage.setItem('user_data', JSON.stringify(userData))
        }
        setUser(userData)
    }, [isClient])

    /**
     * Cierra la sesión del usuario y limpia sus datos
     */
    const logout = useCallback(() => {
        try {
            // Limpiar datos en localStorage
            if (isClient) {
                localStorage.removeItem('user_data')
            }
            
            // Llamar al servicio de autenticación
            AuthService.logout()
        } catch (error) {
            console.error('Error durante el logout:', error)
        } finally {
            // Limpiar estado
            setUser(null)
            setLibros([])
            setPrestamos([])
        }
    }, [isClient])

    /**
     * Actualiza la imagen de perfil del usuario
     * @param {string} imageBase64 - Imagen en formato base64
     */
    const updateUserImage = async (imageBase64: string) => {
        if (user) {
            try {
                const newUserData = { ...user, imagen: imageBase64 }
                if (isClient) {
                    localStorage.setItem('user_data', JSON.stringify(newUserData))
                }
                setUser(newUserData)
                return Promise.resolve()
            } catch (error) {
                console.error('Error updating user image in context:', error)
                return Promise.reject(error)
            }
        }
        return Promise.reject(new Error('No user logged in'))
    }

    /**
     * Actualiza el perfil del usuario
     * @param {UpdateUserDTO} userData - Nuevos datos del usuario
     * @returns {Promise<Usuario>} Usuario actualizado
     */
    const updateProfile = useCallback(async (userData: UpdateUserDTO) => {
        if (!user) throw new Error('No user logged in');
        
        try {
            const updatedUser = await AuthService.updateProfile(userData);
            const newUserData = { ...user, ...updatedUser };
            
            setUser(newUserData);
            return updatedUser;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }, [user, isClient]);

    /**
     * Agrega un nuevo libro
     * @param {LibroRequestDTO} libro - Datos del libro a agregar
     */
    const agregarLibro = async (libro: LibroRequestDTO) => {
        try {
            const nuevoLibro = await LibroService.agregar(libro)
            setLibros(prevLibros => [...prevLibros, nuevoLibro])
        } catch (error) {
            console.error('Error adding book:', error)
            throw error
        }
    }

    /**
     * Actualiza un libro existente
     * @param {number} indice - Índice del libro a actualizar
     * @param {LibroRequestDTO} libro - Nuevos datos del libro
     */
    const actualizarLibro = async (indice: number, libro: LibroRequestDTO) => {
        try {
            const libroActualizado = await LibroService.actualizar(indice, libro)
            setLibros(prevLibros => {
                const nuevosLibros = [...prevLibros]
                nuevosLibros[indice] = libroActualizado
                return nuevosLibros
            })
        } catch (error) {
            console.error('Error updating book:', error)
            throw error
        }
    }

    /**
     * Elimina un libro
     * @param {number} indice - Índice del libro a eliminar
     */
    const eliminarLibro = async (indice: number) => {
        try {
            await LibroService.eliminar(indice)
            setLibros(prevLibros => prevLibros.filter((_, i) => i !== indice))
        } catch (error) {
            console.error('Error deleting book:', error)
            throw error
        }
    }

    return (
        <UserContext.Provider
            value={{
                user,
                libros,
                prestamos,
                login,
                logout,
                isLoggedIn: !!user,
                loading,
                updateUserImage,
                updateProfile,
                agregarLibro,
                actualizarLibro,
                eliminarLibro,
                cargarLibros,
                cargarPrestamos,
                devolverLibro,
                reservar
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

/**
 * Hook personalizado para acceder al contexto de usuario
 * @returns {UserContextType} Contexto de usuario
 * @throws {Error} Si se usa fuera de un UserProvider
 */
export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}