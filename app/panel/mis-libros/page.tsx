"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { useUser } from "../../context/UserContext"

export default function MisLibros() {
  const { user, addLibro, updateLibroEstado, removeLibro } = useUser()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [portadaPreview, setPortadaPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPortadaPreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNuevoLibro((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Crear el nuevo libro
    addLibro({
      titulo: nuevoLibro.titulo,
      autor: nuevoLibro.autor,
      descripcion: nuevoLibro.descripcion,
      portada:
        portadaPreview ||
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      estado: "disponible",
    })

    // Resetear el formulario
    setNuevoLibro({
      titulo: "",
      autor: "",
      descripcion: "",
    })
    setPortadaPreview(null)
    setMostrarFormulario(false)
  }

  const cambiarEstadoLibro = (id: string, estado: "disponible" | "no-disponible" | "prestado") => {
    updateLibroEstado(id, estado)
  }

  const eliminarLibro = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      removeLibro(id)
    }
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

        {user.libros.length === 0 ? (
          <p className="text-center text-orange-900 py-8">No has subido ningún libro todavía.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.libros.map((libro) => (
              <div key={libro.id} className="bg-orange-50 p-6 rounded-lg shadow-md border border-orange-200">
                <div className="relative h-64 mb-4 rounded overflow-hidden">
                  <Image src={libro.portada || "/placeholder.svg"} alt={libro.titulo} layout="fill" objectFit="cover" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-800">{libro.titulo}</h3>
                <p className="text-orange-900 mb-2">Autor: {libro.autor}</p>
                <p className="text-orange-900 mb-4 line-clamp-2">{libro.descripcion}</p>
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
                      onClick={() => eliminarLibro(libro.id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      Eliminar
                    </button>
                  </div>

                  {libro.estado === "prestado" && libro.fechaDevolucion && (
                    <p className="text-sm text-orange-900">
                      <span className="font-medium">Fecha de devolución:</span> {libro.fechaDevolucion}
                    </p>
                  )}

                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-orange-900">Cambiar estado:</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => cambiarEstadoLibro(libro.id, "disponible")}
                        className={`text-xs py-1 px-2 rounded ${
                          libro.estado === "disponible"
                            ? "bg-green-500 text-white"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                      >
                        Disponible
                      </button>
                      <button
                        onClick={() => cambiarEstadoLibro(libro.id, "no-disponible")}
                        className={`text-xs py-1 px-2 rounded ${
                          libro.estado === "no-disponible"
                            ? "bg-red-500 text-white"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        No disponible
                      </button>
                      <button
                        onClick={() => cambiarEstadoLibro(libro.id, "prestado")}
                        className={`text-xs py-1 px-2 rounded ${
                          libro.estado === "prestado"
                            ? "bg-blue-500 text-white"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                      >
                        Prestado
                      </button>
                    </div>
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
