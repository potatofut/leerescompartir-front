"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import { LoginResponseDTO, UpdateUserDTO } from '../../lib/types'
import { AuthService } from '../../lib/auth'
import { LibroService } from '../../lib/libros'
import { LibroRequestDTO, LibroResponseDTO } from '../../lib/types'

interface UserContextType {
    user: LoginResponseDTO | null
    libros: LibroResponseDTO[]
    isLoggedIn: boolean
    login: (userData: LoginResponseDTO) => void
    logout: () => void
    loading: boolean
    updateUserImage: (imageBase64: string) => Promise<void>
    agregarLibro: (libro: LibroRequestDTO) => Promise<void>
    actualizarLibro: (indice: number, libro: LibroRequestDTO) => Promise<void>
    eliminarLibro: (indice: number) => Promise<void>
    cargarLibros: () => Promise<void>
}

const UserContext = createContext<UserContextType>({
    user: null,
    libros: [],
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
    loading: true,
    updateUserImage: async () => { },
    agregarLibro: async () => { },
    actualizarLibro: async () => { },
    eliminarLibro: async () => { },
    cargarLibros: async () => { },
})

export const temas = [
    {
        id: "aventura",
        nombre: "Aventura",
        imagen:
            "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
        id: "historia",
        nombre: "Historia",
        imagen:
            "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
        id: "filosofia",
        nombre: "Filosofía",
        imagen:
            "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
        id: "ciencia-ficcion",
        nombre: "Ciencia Ficción",
        imagen:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
        id: "programacion",
        nombre: "Programación",
        imagen:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
]

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<LoginResponseDTO | null>(null)
    const [libros, setLibros] = useState<LibroResponseDTO[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('user_data')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
                cargarLibros() // Load books when user is loaded
            } catch (e) {
                console.error('Failed to parse user data from storage')
            }
        }
        setLoading(false)
    }, [])

    const cargarLibros = async () => {
        try {
            const librosData = await LibroService.listar()
            setLibros(librosData)
        } catch (error) {
            console.error('Error loading books:', error)
        }
    }

    const login = (userData: LoginResponseDTO) => {
        localStorage.setItem('user_data', JSON.stringify(userData))
        setUser(userData)
        cargarLibros()
    }

    const logout = () => {
        AuthService.logout()
        setUser(null)
        setLibros([])
    }

    const updateUserImage = async (imageBase64: string) => {
        if (user) {
            try {
                const newUserData = { ...user, imagen: imageBase64 }
                localStorage.setItem('user_data', JSON.stringify(newUserData))
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
            setLibros([...libros, nuevoLibro])
        } catch (error) {
            console.error('Error adding book:', error)
            throw error
        }
    }

    const actualizarLibro = async (indice: number, libro: LibroRequestDTO) => {
        try {
            const libroActualizado = await LibroService.actualizar(indice, libro)
            const nuevosLibros = [...libros]
            nuevosLibros[indice] = libroActualizado
            setLibros(nuevosLibros)
        } catch (error) {
            console.error('Error updating book:', error)
            throw error
        }
    }

    const eliminarLibro = async (indice: number) => {
        try {
            await LibroService.eliminar(indice)
            const nuevosLibros = libros.filter((_, i) => i !== indice)
            setLibros(nuevosLibros)
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
                login,
                logout,
                isLoggedIn: !!user,
                loading,
                updateUserImage,
                agregarLibro,
                actualizarLibro,
                eliminarLibro,
                cargarLibros
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