"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "../context/UserContext"

export default function Logout() {
  const router = useRouter()
  const { logout } = useUser()

  useEffect(() => {
    // Cerrar sesión
    logout()

    // Redirigir al inicio
    router.push("/")
  }, [logout, router])

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <p>Cerrando sesión...</p>
    </div>
  )
}
