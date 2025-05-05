"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "../context/UserContext"

export default function Logout() {
  const router = useRouter()
  const { logout } = useUser()

  useEffect(() => {
    // Definir una función para gestionar el logout
    const handleLogout = async () => {
      try {
        // Cerrar sesión
        logout()
        
        // Redirigir al inicio
        router.push("/")
      } catch (error) {
        console.error("Error durante el cierre de sesión:", error)
        // Redirigir al inicio incluso si hay un error
        router.push("/")
      }
    }
    
    // Llamar a la función de logout
    handleLogout()
  }, [logout, router])

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <p>Cerrando sesión...</p>
    </div>
  )
}