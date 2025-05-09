"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { LibroService } from "../../lib/libros"
import { useUser } from "../context/UserContext"
import { LibroDTO, TematicaDTO } from "../../lib/types"

export default function Buscar() {
  const [busqueda, setBusqueda] = useState("")
  const [resultados, setResultados] = useState<LibroDTO[]>([])
  const [tematicasDisponibles, setTematicasDisponibles] = useState<TematicaDTO[]>([])
  const [cargandoTematicas, setCargandoTematicas] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, isLoggedIn, reservar } = useUser()

  useEffect(() => {
      cargarTematicas()
    }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!busqueda.trim()) {
      setError("Por favor ingresa un término de búsqueda")
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const librosEncontrados = await LibroService.buscar(busqueda)
      setResultados(librosEncontrados)
      if (librosEncontrados.length === 0) {
        setError("No se encontraron libros con ese criterio de búsqueda")
      }
    } catch (err) {
      console.error("Error al buscar libros:", err)
      setError("Ocurrió un error al buscar libros. Intenta nuevamente.")
      setResultados([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSolicitarReserva = async (libro: LibroDTO) => {
      
      if (confirm(`¿Deseas solicitar la reserva de "${libro.titulo}"?`)) {
        try {
          await reservar({
            titulo: libro.titulo,
            emailUsuario: libro.emailUsuario,
          })
          alert("¡Reserva solicitada con éxito! El propietario del libro se pondrá en contacto contigo.")
          
          // Refresh books after reservation
          const librosEncontrados = await LibroService.buscar(busqueda)
          setResultados(librosEncontrados)
          if (librosEncontrados.length === 0) {
            setError("No se encontraron libros con ese criterio de búsqueda")
          }
          
        } catch (error) {
          alert("Error al solicitar la reserva. Por favor, inténtalo de nuevo.")
          console.error("Reservation error:", error)
        }
      }
    }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Buscar Libros</h1>

      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por título, autor o temática"
            className="flex-grow px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition duration-300 disabled:bg-orange-300"
            disabled={isLoading}
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-2xl font-semibold mb-6 text-orange-700">Resultados de la búsqueda</h2>

        {error && (
          <p className="text-center text-red-600 mb-4">{error}</p>
        )}

        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-orange-600">Buscando libros...</p>
          </div>
        ) : resultados.length === 0 && !error ? (
          <p className="text-center text-orange-900">Realiza una búsqueda para ver resultados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resultados.map((libro, index) => (
              <div key={index} className="bg-orange-50 p-6 rounded-lg shadow-md border border-orange-200">
                <div className="relative h-48 mb-4 rounded overflow-hidden">
                  <Image 
                    src={libro.portada || "/placeholder.svg"} 
                    alt={libro.titulo} 
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-800">{libro.titulo}</h3>
                <p className="text-orange-900 mb-2">Autor: {libro.autor}</p>
                <p className="text-orange-900 mb-2">
                  Estado:
                  <span className={
                    libro.estado === "disponible" 
                      ? "text-green-600 font-medium ml-1" 
                      : "text-red-600 font-medium ml-1"
                  }>
                    {libro.estado === "disponible" ? "Disponible" : "No disponible"}
                  </span>
                </p>
                {libro.tematicas && libro.tematicas.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-orange-700">Temáticas:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {libro.tematicas.map((tematicaId, i) => {
                              const tematica = tematicasDisponibles.find(t => t.id === tematicaId)
                              return (
                              <span key={i} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                  {tematica ? tematica.nombre : tematicaId}
                              </span>
                              )
                          })}
                    </div>
                  </div>
                )}
                {isLoggedIn && user?.email !== libro.emailUsuario && libro.estado === "disponible" && (
                  <button
                    className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
                    onClick={ () => handleSolicitarReserva(libro) }
                  >
                    Reservar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}