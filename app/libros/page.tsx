"use client"

import { useState } from "react"
import Image from "next/image"
import { useUser } from "../context/UserContext"
import { temas } from "../context/UserContext"

export default function Libros() {
  const { user, librosDisponibles, removeLibro, solicitarPrestamo } = useUser()
  const [temaSeleccionado, setTemaSeleccionado] = useState<string | null>(null)

  const handleEliminarLibro = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      removeLibro(id)
    }
  }

  const handleSolicitarPrestamo = (libro: any) => {
    if (confirm(`¿Deseas solicitar el préstamo de "${libro.titulo}"?`)) {
      solicitarPrestamo(libro)
      alert("¡Préstamo solicitado con éxito! Puedes ver el libro en tu sección de 'Préstamos recibidos'.")
    }
  }

  // Filtrar libros por tema si hay uno seleccionado
  const librosFiltrados = temaSeleccionado
    ? librosDisponibles.filter((libro) => {
        // Aquí deberíamos tener una propiedad tema en los libros, pero como no la tenemos,
        // vamos a simular la filtración basada en el título o descripción
        const temaActual = temas.find((t) => t.id === temaSeleccionado)
        if (!temaActual) return false

        return (
          libro.titulo.toLowerCase().includes(temaActual.nombre.toLowerCase()) ||
          libro.descripcion.toLowerCase().includes(temaActual.nombre.toLowerCase())
        )
      })
    : librosDisponibles

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Libros Disponibles</h1>

      {/* Sección de temáticas */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-orange-700 text-center">Explora por temática</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {temas.map((tema) => (
            <div
              key={tema.id}
              onClick={() => setTemaSeleccionado(temaSeleccionado === tema.id ? null : tema.id)}
              className={`relative h-32 rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                temaSeleccionado === tema.id ? "ring-4 ring-orange-500" : ""
              }`}
            >
              <Image src={tema.imagen || "/placeholder.svg"} alt={tema.nombre} layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{tema.nombre}</h3>
              </div>
            </div>
          ))}
        </div>
        {temaSeleccionado && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setTemaSeleccionado(null)}
              className="bg-orange-100 text-orange-800 py-2 px-4 rounded-lg font-medium hover:bg-orange-200 transition duration-300"
            >
              Mostrar todos los libros
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-2xl font-semibold mb-6 text-orange-700">
          {temaSeleccionado
            ? `Libros de ${temas.find((t) => t.id === temaSeleccionado)?.nombre || ""}`
            : "Todos los libros"}
        </h2>

        {librosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-orange-900 mb-4">
              {temaSeleccionado
                ? `No hay libros disponibles en la categoría ${
                    temas.find((t) => t.id === temaSeleccionado)?.nombre || ""
                  }`
                : "No hay libros disponibles actualmente"}
            </p>
            <p className="text-orange-700">Vuelve más tarde o regístrate para compartir tus propios libros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {librosFiltrados.map((libro) => (
              <div key={libro.id} className="bg-orange-50 p-6 rounded-lg shadow-md border border-orange-200">
                <div className="relative h-64 mb-4 rounded overflow-hidden">
                  <Image src={libro.portada || "/placeholder.svg"} alt={libro.titulo} layout="fill" objectFit="cover" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-800">{libro.titulo}</h3>
                <p className="text-orange-900 mb-2">Autor: {libro.autor}</p>
                <p className="text-orange-900 mb-4 line-clamp-2">{libro.descripcion}</p>
                <div className="flex flex-col gap-2">
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
                    <span className="text-sm text-orange-700">Usuario: {libro.propietario}</span>
                  </div>

                  {libro.estado === "prestado" && libro.fechaDevolucion && (
                    <p className="text-sm text-orange-900 mt-2">
                      <span className="font-medium">Disponible a partir de:</span> {libro.fechaDevolucion}
                    </p>
                  )}

                  <div className="flex justify-between mt-2">
                    {user.isLoggedIn && libro.estado === "disponible" && (
                      <button
                        onClick={() => handleSolicitarPrestamo(libro)}
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition duration-300 mr-2"
                      >
                        Solicitar préstamo
                      </button>
                    )}

                    {user.isLoggedIn && user.name === libro.propietario && (
                      <button
                        onClick={() => handleEliminarLibro(libro.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition duration-300"
                      >
                        Eliminar
                      </button>
                    )}
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
