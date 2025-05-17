"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "../context/UserContext"

/**
 * Componente UserMenu que muestra el menú desplegable del usuario
 * Incluye la foto de perfil y opciones de navegación
 * Se cierra automáticamente al hacer clic fuera del menú
 */
export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const menuRef = useRef<HTMLDivElement>(null)
  
  // Imagen por defecto si el usuario no tiene foto de perfil
  const userImage = user?.imagen || "/placeholder.svg?height=100&width=100"

  /**
   * Maneja el cierre del menú al hacer clic fuera de él
   * Utiliza un event listener para detectar clics en el documento
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón de perfil con imagen */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-300 hover:border-orange-500 transition-colors">
          <Image
            src={userImage}
            alt="Foto de perfil"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-orange-200">
          {/* Enlaces de navegación del usuario */}
          <Link href="/panel" className="block px-4 py-2 text-orange-900 hover:bg-orange-100">
            Mi perfil
          </Link>
          <Link href="/panel/mis-libros" className="block px-4 py-2 text-orange-900 hover:bg-orange-100">
            Mis libros
          </Link>
          <Link href="/panel/prestamos" className="block px-4 py-2 text-orange-900 hover:bg-orange-100">
            Mis préstamos
          </Link>
          <Link href="/panel/datos-usuario" className="block px-4 py-2 text-orange-900 hover:bg-orange-100">
            Datos personales
          </Link>
          
          {/* Separador */}
          <div className="border-t border-orange-200 my-1"></div>
          
          {/* Opción de cierre de sesión */}
          <Link href="/logout" className="block px-4 py-2 text-orange-900 hover:bg-orange-100">
            Cerrar sesión
          </Link>
        </div>
      )}
    </div>
  )
}