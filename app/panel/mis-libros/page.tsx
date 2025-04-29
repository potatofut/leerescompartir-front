"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useUser } from "../../context/UserContext"
import { LibroService } from "../../../lib/libros"
import { useRouter } from "next/navigation"
import { TematicaDTO } from "../../../lib/types"

export default function MisLibros() {
  const { user, libros, agregarLibro, eliminarLibro, isLoggedIn, loading } = useUser()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    portada: "",
    tematicas: [] as string[],
  })
  const [tematicasDisponibles, setTematicasDisponibles] = useState<TematicaDTO[]>([])
  const [cargandoTematicas, setCargandoTematicas] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [portadaPreview, setPortadaPreview] = useState<string | null>(null)

  useEffect(() => {
    if (mostrarFormulario) {
      cargarTematicas()
    }
  }, [mostrarFormulario])

  const cargarTematicas = async () => {
    setCargandoTematicas(true)
    try {
      const tematicas = await LibroService.tematicas()
      setTematicasDisponibles(tematicas)
    } catch (error) {
      console.error("Error cargando temáticas:", error)
    } finally {
      setCargandoTematicas(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPortadaPreview(event.target.result as string)
          setNuevoLibro(prev => ({
            ...prev,
            portada: event.target?.result as string
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNuevoLibro((prev) => ({ ...prev, [name]: value }))
  }

  const handleTematicaChange = (tematica: string) => {
    setNuevoLibro(prev => {
      if (prev.tematicas.includes(tematica)) {
        return {
          ...prev,
          tematicas: prev.tematicas.filter(t => t !== tematica)
        }
      } else {
        return {
          ...prev,
          tematicas: [...prev.tematicas, tematica]
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await agregarLibro({
        titulo: nuevoLibro.titulo,
        autor: nuevoLibro.autor,
        descripcion: nuevoLibro.descripcion,
        portada: portadaPreview || "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        tematicas: nuevoLibro.tematicas
      })

      // Reset form
      setNuevoLibro({
        titulo: "",
        autor: "",
        descripcion: "",
        portada: "",
        tematicas: []
      })
      setPortadaPreview(null)
      setMostrarFormulario(false)
    } catch (error) {
      console.error("Error adding book:", error)
      alert("Error al agregar el libro. Por favor intenta nuevamente.")
    }
  }

  const handleEliminarLibro = async (indice: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      try {
        await eliminarLibro(indice)
      } catch (error) {
        console.error("Error deleting book:", error)
        alert("Error al eliminar el libro. Por favor intenta nuevamente.")
      }
    }
  }

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>
  }

  if (!isLoggedIn) {
    return <div className="text-center py-8">Por favor inicia sesión para ver tus libros</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Mis Libros</h1>

      <div className="mb-8 flex justify-end">
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition duration-300 flex items-center"
        >
          {mostrarFormulario ? "Cancelar" : "Subir nuevo libro"}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-orange-700">Subir nuevo libro</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="titulo" className="block text-lg font-medium text-orange-900 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={nuevoLibro.titulo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="autor" className="block text-lg font-medium text-orange-900 mb-2">
                    Autor
                  </label>
                  <input
                    type="text"
                    id="autor"
                    name="autor"
                    value={nuevoLibro.autor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="descripcion" className="block text-lg font-medium text-orange-900 mb-2">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={nuevoLibro.descripcion}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-orange-900 mb-2">
                    Temáticas
                  </label>
                  {cargandoTematicas ? (
                    <p>Cargando temáticas...</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {tematicasDisponibles.map(tematica => (
                        <div key={tematica.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`tematica-${tematica.id}`}
                            checked={nuevoLibro.tematicas.includes(tematica.nombre)}
                            onChange={() => handleTematicaChange(tematica.nombre)}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-orange-300 rounded"
                          />
                          <label htmlFor={`tematica-${tematica.id}`} className="ml-2 text-sm text-orange-900">
                            {tematica.nombre}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-48 h-64 border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  {portadaPreview ? (
                    <Image
                      src={portadaPreview || "/placeholder.svg"}
                      alt="Vista previa de portada"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <p className="text-orange-500">Haz clic para subir la portada</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <p className="mt-2 text-sm text-orange-600">Formato recomendado: JPG, PNG</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
              >
                Guardar libro
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-2xl font-semibold mb-6 text-orange-700">Libros subidos</h2>

        {libros.length === 0 ? (
          <p className="text-center text-orange-900 py-8">No has subido ningún libro todavía.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {libros.map((libro, index) => (
              <div key={index} className="bg-orange-50 p-6 rounded-lg shadow-md border border-orange-200">
                <div className="relative h-64 mb-4 rounded overflow-hidden">
                  <Image 
                    src={libro.portada || "/placeholder.svg"} 
                    alt={libro.titulo} 
                    layout="fill" 
                    objectFit="cover" 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-800">{libro.titulo}</h3>
                <p className="text-orange-900 mb-2">Autor: {libro.autor}</p>
                <p className="text-orange-900 mb-4 line-clamp-2">{libro.descripcion}</p>
                {libro.tematicas && libro.tematicas.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-orange-900">Temáticas:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {libro.tematicas.map((tematica, i) => (
                        <span key={i} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                          {tematica}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        libro.estado === "disponible"
                          ? "bg-green-100 text-green-800"
                          : libro.estado === "prestado"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {libro.estado === "disponible"
                        ? "Disponible"
                        : libro.estado === "prestado"
                          ? "Prestado"
                          : "No disponible"}
                    </span>
                    <button
                      onClick={() => handleEliminarLibro(index)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}