"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "../context/UserContext"

/**
 * Página de cierre de sesión que maneja el proceso de logout
 * Se ejecuta automáticamente al cargar y redirige al inicio
 */
export default function Logout() {
  const router = useRouter()
  const { logout } = useUser()

  useEffect(() => {
    /**
     * Función que maneja el proceso de cierre de sesión
     * Ejecuta el logout y redirige al usuario al inicio
     */
    const handleLogout = async () => {
      try {
        // Ejecutar el proceso de cierre de sesión
        logout()
        
        // Redirigir al usuario a la página principal
        router.push("/")
      } catch (error) {
        console.error("Error durante el cierre de sesión:", error)
        // Asegurar la redirección incluso si hay un error
        router.push("/")
      }
    }
    
    // Ejecutar el proceso de logout inmediatamente
    handleLogout()
  }, [logout, router])

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      {/* Mensaje de estado durante el cierre de sesión */}
      <p>Cerrando sesión...</p>
    </div>
  )
}