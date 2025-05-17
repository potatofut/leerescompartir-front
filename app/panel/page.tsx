"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "../context/UserContext"
import { useRouter } from "next/navigation"
import { AuthService } from "../../lib/auth"

/**
 * Página principal del panel de usuario
 * Permite gestionar el perfil, libros y préstamos
 * Incluye funcionalidad para actualizar la imagen de perfil y datos personales
 */
export default function Panel() {
  // Obtener datos y funciones del contexto de usuario
  const { user, updateUserImage, isLoggedIn } = useUser()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Estados para la gestión de la imagen de perfil
  const [profileImage, setProfileImage] = useState("/default-profile.png")
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  /**
   * Redirige al usuario a la página de login si no está autenticado
   */
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])
  
  /**
   * Actualiza la imagen de perfil cuando cambian los datos del usuario
   */
  useEffect(() => {
    if (user?.imagen) {
      setProfileImage(user.imagen)
    }
  }, [user])

  /**
   * Maneja el clic en la imagen de perfil para abrir el selector de archivos
   */
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  /**
   * Procesa el cambio de imagen de perfil
   * Convierte la imagen a base64 y actualiza el estado
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento del input de archivo
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageBase64 = event.target.result as string
          setProfileImage(imageBase64)
          setIsUploading(false)
        }
      }
      
      reader.onerror = () => {
        setIsUploading(false)
        alert("Error al leer el archivo de imagen")
      }
      
      reader.readAsDataURL(file)
    }
  }

  /**
   * Guarda los cambios del perfil en el servidor
   * Actualiza la imagen y datos personales
   */
  const handleSaveChanges = async () => {
    if (!user) return
    
    try {
      setIsSaving(true)
      
      // Preparar los datos a actualizar
      const updateData = {
        nombre: user.nombre,
        email: user.email,
        ciudad: user.ciudad,
        provincia: user.provincia,
        pais: user.pais,
        continente: user.continente,
        imagen: profileImage
      }
      
      // Enviar los datos al servidor
      await AuthService.updateProfile(updateData)
      
      // Actualizar el contexto de usuario con la nueva imagen
      await updateUserImage(profileImage)
      
      alert("Perfil actualizado correctamente")
    } catch (error) {
      console.error("Error al actualizar el perfil:", error)
      alert("No se pudo actualizar el perfil")
    } finally {
      setIsSaving(false)
    }
  }

  // Mostrar estado de carga si no hay datos del usuario
  if (!user) {
    return <div className="container mx-auto px-4 py-12 text-center">Cargando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-orange-700 text-center mb-8">Mi Perfil</h1>
      
      {/* Tarjetas de navegación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Tarjeta de Mis Libros */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-orange-200">
          <div className="text-xl font-semibold text-orange-700 mb-3">Mis Libros</div>
          <p className="text-gray-600 mb-4">Gestiona tus libros disponibles para préstamo</p>
          <Link href="/panel/mis-libros" className="inline-block bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300">
            Ver mis libros
          </Link>
        </div>

        {/* Tarjeta de Mis Préstamos */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-orange-200">
          <div className="text-xl font-semibold text-orange-700 mb-3">Mis Préstamos</div>
          <p className="text-gray-600 mb-4">Consulta los libros que te han prestado</p>
          <Link href="/panel/prestamos" className="inline-block bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300">
            Ver préstamos
          </Link>
        </div>

        {/* Tarjeta de Datos Personales */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-orange-200">
          <div className="text-xl font-semibold text-orange-700 mb-3">Datos Personales</div>
          <p className="text-gray-600 mb-4">Completa tu información de ubicación y preferencias</p>
          <Link href="/panel/datos-usuario" className="inline-block bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300">
            Editar datos
          </Link>
        </div>
      </div>

      {/* Sección de perfil */}
      <div className="bg-white p-8 rounded-xl shadow-md border border-orange-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Imagen de perfil */}
          <div className="flex flex-col items-center">
            <div 
              className={`relative w-48 h-48 rounded-full overflow-hidden cursor-pointer mb-4 border-4 border-orange-300 ${isUploading ? 'opacity-50' : ''}`}
              onClick={handleImageClick}
            >
              <Image 
                src={profileImage}
                alt="Foto de perfil"
                fill
                className="object-cover"
              />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*"
                disabled={isUploading || isSaving}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-orange-500 bg-opacity-70 text-white py-2 text-center">
                {isUploading ? 'Subiendo...' : 'Cambiar foto'}
              </div>
            </div>
            <p className="text-gray-500 text-center">
              Haz clic en la imagen para cambiar tu foto
            </p>
          </div>

          {/* Información personal */}
          <div>
            <h2 className="text-2xl font-semibold text-orange-700 mb-6">
              Información personal
            </h2>
            <div className="space-y-4">
              {/* Nombre */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">
                  Nombre
                </p>
                <p className="text-gray-800 text-lg">
                  {user.nombre}
                </p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">
                  Email
                </p>
                <p className="text-gray-800 text-lg">
                  {user.email}
                </p>
              </div>

              {/* Botón de guardar */}
              <button 
                onClick={handleSaveChanges}
                disabled={isUploading || isSaving}
                className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300 disabled:bg-orange-300"
              >
                {isSaving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}