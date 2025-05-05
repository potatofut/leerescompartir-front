"use client"

import { createContext, useState, useContext, useEffect, type ReactNode, useCallback } from "react"
import { LoginResponseDTO, LibroPrestamoDTO, LibroReservaRequestDTO } from '../../lib/types'
import { AuthService } from '../../lib/auth'
import { LibroService } from '../../lib/libros'
import { LibroRequestDTO, LibroResponseDTO } from '../../lib/types'

interface UserContextType {
    user: LoginResponseDTO | null
    libros: LibroResponseDTO[]
    prestamos: LibroPrestamoDTO[]
    isLoggedIn: boolean
    login: (userData: LoginResponseDTO) => void
    logout: () => void
    loading: boolean
    updateUserImage: (imageBase64: string) => Promise<void>
    agregarLibro: (libro: LibroRequestDTO) => Promise<void>
    actualizarLibro: (indice: number, libro: LibroRequestDTO) => Promise<void>
    eliminarLibro: (indice: number) => Promise<void>
    cargarLibros: () => Promise<void>
    cargarPrestamos: () => Promise<void>
    devolverLibro: (libro: LibroReservaRequestDTO) => Promise<void>
    reservar: (libro: LibroReservaRequestDTO) => Promise<void>
}

const UserContext = createContext<UserContextType>({
    user: null,
    libros: [],
    prestamos: [],
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
    loading: true,
    updateUserImage: async () => { },
    agregarLibro: async () => { },
    actualizarLibro: async () => { },
    eliminarLibro: async () => { },
    cargarLibros: async () => { },
    cargarPrestamos: async () => { },
    devolverLibro: async () => { },
    reservar: async () => { }
})

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<LoginResponseDTO | null>(null)
    const [libros, setLibros] = useState<LibroResponseDTO[]>([])
    const [prestamos, setPrestamos] = useState<LibroPrestamoDTO[]>([])
    const [loading, setLoading] = useState(true)
    const [isClient, setIsClient] = useState(false)

    // Detect client-side rendering
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Load user data from localStorage only on client-side
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

    // Load books and loans when user is logged in
    useEffect(() => {
        if (user && isClient) {
            cargarLibros()
            cargarPrestamos()
        }
    }, [user, isClient])

    const cargarLibros = useCallback(async () => {
        if (!user) return

        try {
            const librosData = await LibroService.listar()
            setLibros(librosData)
        } catch (error) {
            console.error('Error loading books:', error)
        }
    }, [user])

    const cargarPrestamos = useCallback(async () => {
        if (!user) return

        try {
            const prestamosData = await LibroService.prestamos()
            setPrestamos(prestamosData)
        } catch (error) {
            console.error('Error loading loans:', error)
        }
    }, [user])

    const devolverLibro = async (libro: LibroReservaRequestDTO) => {
        try {
            await LibroService.devolver(libro)
            cargarPrestamos() // Refresh the loans list after returning
        } catch (error) {
            console.error('Error returning book:', error)
            throw error
        }
    }

    const reservar = async (libro: LibroReservaRequestDTO) => {
        try {
            await LibroService.reservar(libro)
            cargarPrestamos() // Refresh books after reservation
        } catch (error) {
            console.error('Error making reservation:', error)
            throw error
        }
    }

    const login = useCallback((userData: LoginResponseDTO) => {
        if (isClient) {
            localStorage.setItem('user_data', JSON.stringify(userData))
        }
        setUser(userData)
    }, [isClient])

    const logout = useCallback(() => {
        try {
            // Primero limpiar los datos en localStorage
            if (isClient) {
                localStorage.removeItem('user_data')
            }
            
            // Llamar al servicio de autenticación
            // Nota: movido después de limpiar localStorage para evitar problemas
            // si AuthService.logout() depende del estado actual
            AuthService.logout()
        } catch (error) {
            console.error('Error durante el logout:', error)
        } finally {
            // Siempre actualizar el estado, incluso si hay errores
            setUser(null)
            setLibros([])
            setPrestamos([])
        }
    }, [isClient])

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

    const agregarLibro = async (libro: LibroRequestDTO) => {
        try {
            const nuevoLibro = await LibroService.agregar(libro)
            setLibros(prevLibros => [...prevLibros, nuevoLibro])
        } catch (error) {
            console.error('Error adding book:', error)
            throw error
        }
    }

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

export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}