"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useUser } from "../context/UserContext"
import { LibroService } from '../../lib/libros'
import { TematicaDTO, LibroDTO } from '../../lib/types'
import { useSearchParams } from 'next/navigation'
import { RegionService } from '../../lib/regions'

/**
 * Página principal de libros que muestra el catálogo disponible
 * Incluye filtros por temática y ubicación, y permite solicitar reservas
 */
export default function Libros() {
  const { user, isLoggedIn, reservar, cargarLibros, cargarPrestamos } = useUser()
  const [temaSeleccionado, setTemaSeleccionado] = useState<string | null>(null)
  const [temas, setTemas] = useState<TematicaDTO[]>([])
  const [librosDisponibles, setLibrosDisponibles] = useState<LibroDTO[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  // Estados para los filtros de región
  const [continentes, setContinentes] = useState<string[]>([])
  const [paises, setPaises] = useState<string[]>([])
  const [provincias, setProvincias] = useState<string[]>([])
  const [ciudades, setCiudades] = useState<string[]>([])
  const [continenteSeleccionado, setContinenteSeleccionado] = useState<string>("")
  const [paisSeleccionado, setPaisSeleccionado] = useState<string>("")
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string>("")
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<string>("")

  // Cargar tema desde la URL si existe
  useEffect(() => {
    const temaFromUrl = searchParams.get('tema')
    if (temaFromUrl) {
      setTemaSeleccionado(temaFromUrl)
    }
  }, [searchParams])

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar temáticas
        const temasData = await LibroService.tematicas()
        setTemas(temasData)

        // Cargar regiones
        const continentesData = await RegionService.getContinentes()
        setContinentes(continentesData)

        // Cargar libros disponibles
        await cargarLibrosFiltrados()

        // Cargar datos del usuario si está autenticado
        await cargarLibros();
        await cargarPrestamos();

      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [])

  /**
   * Carga los libros filtrados según los criterios seleccionados
   */
  const cargarLibrosFiltrados = async () => {
    try {
      const librosData = await LibroService.filtrar(
        undefined, // tematicaId
        "disponible", // estado
        paisSeleccionado || undefined,
        provinciaSeleccionada || undefined,
        ciudadSeleccionada || undefined
      )
      setLibrosDisponibles(librosData)
    } catch (error) {
      console.error("Error loading filtered books:", error)
    }
  }

  /**
   * Maneja el cambio de continente y actualiza los países disponibles
   * @param {string} continente - Continente seleccionado
   */
  const handleContinenteChange = async (continente: string) => {
    setContinenteSeleccionado(continente)
    setPaisSeleccionado("")
    setProvinciaSeleccionada("")
    setCiudadSeleccionada("")
    
    if (continente) {
      try {
        const paisesData = await RegionService.getPaisesPorContinente(continente)
        setPaises(paisesData)
        setProvincias([])
        setCiudades([])
      } catch (error) {
        console.error("Error loading countries:", error)
      }
    } else {
      setPaises([])
      setProvincias([])
      setCiudades([])
      await cargarLibrosFiltrados()
    }
  }

  /**
   * Maneja el cambio de país y actualiza las provincias disponibles
   * @param {string} pais - País seleccionado
   */
  const handlePaisChange = async (pais: string) => {
    setPaisSeleccionado(pais)
    setProvinciaSeleccionada("")
    setCiudadSeleccionada("")
    
    if (pais && continenteSeleccionado) {
      try {
        const provinciasData = await RegionService.getProvinciasPorPais(continenteSeleccionado, pais)
        setProvincias(provinciasData)
        setCiudades([])
        await cargarLibrosFiltrados()
      } catch (error) {
        console.error("Error loading provinces:", error)
      }
    } else {
      setProvincias([])
      setCiudades([])
      await cargarLibrosFiltrados()
    }
  }

  /**
   * Maneja el cambio de provincia y actualiza las ciudades disponibles
   * @param {string} provincia - Provincia seleccionada
   */
  const handleProvinciaChange = async (provincia: string) => {
    setProvinciaSeleccionada(provincia)
    setCiudadSeleccionada("")
    
    if (provincia && continenteSeleccionado && paisSeleccionado) {
      try {
        const ciudadesData = await RegionService.getCiudadesPorProvincia(
          continenteSeleccionado, 
          paisSeleccionado, 
          provincia
        )
        setCiudades(ciudadesData)
        await cargarLibrosFiltrados()
      } catch (error) {
        console.error("Error loading cities:", error)
      }
    } else {
      setCiudades([])
      await cargarLibrosFiltrados()
    }
  }

  /**
   * Maneja el cambio de ciudad y actualiza los libros filtrados
   * @param {string} ciudad - Ciudad seleccionada
   */
  const handleCiudadChange = async (ciudad: string) => {
    setCiudadSeleccionada(ciudad)
    await cargarLibrosFiltrados()
  }

  /**
   * Limpia todos los filtros de región y actualiza la lista de libros
   */
  const limpiarFiltrosRegion = async () => {
    setContinenteSeleccionado("")
    setPaisSeleccionado("")
    setProvinciaSeleccionada("")
    setCiudadSeleccionada("")
    setPaises([])
    setProvincias([])
    setCiudades([])
    await cargarLibrosFiltrados()
  }

  /**
   * Maneja la solicitud de reserva de un libro
   * @param {LibroDTO} libro - Libro a reservar
   */
  const handleSolicitarReserva = async (libro: LibroDTO) => {
    if (!user) return
    
    if (confirm(`¿Deseas solicitar la reserva de "${libro.titulo}"?`)) {
      try {
        await reservar({
          titulo: libro.titulo,
          emailUsuario: libro.emailUsuario,
        })
        alert("¡Reserva solicitada con éxito! El propietario del libro se pondrá en contacto contigo.")
        
        // Actualizar lista de libros después de la reserva
        await cargarLibrosFiltrados()
      } catch (error) {
        alert("Error al solicitar la reserva. Por favor, inténtalo de nuevo.")
        console.error("Reservation error:", error)
      }
    }
  }

  // Filtrar libros por tema si hay uno seleccionado
  const librosFiltrados = temaSeleccionado
    ? librosDisponibles.filter((libro) => libro.tematicas.includes(temaSeleccionado))
    : librosDisponibles

  // Estado de carga
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Cargando libros disponibles...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Libros Disponibles</h1>

      {/* Sección de filtros por región */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-orange-200">
        <h2 className="text-xl font-semibold mb-4 text-orange-700">Filtrar por ubicación</h2>
        
        {/* Grid de selectores de ubicación */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Selector de continente */}
          <div>
            <label htmlFor="continente" className="block text-sm font-medium text-orange-800 mb-1">
              Continente
            </label>
            <select
              id="continente"
              value={continenteSeleccionado}
              onChange={(e) => handleContinenteChange(e.target.value)}
              className="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Seleccione un continente</option>
              {continentes.map((continente) => (
                <option key={continente} value={continente}>
                  {continente}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de país */}
          <div>
            <label htmlFor="pais" className="block text-sm font-medium text-orange-800 mb-1">
              País
            </label>
            <select
              id="pais"
              value={paisSeleccionado}
              onChange={(e) => handlePaisChange(e.target.value)}
              disabled={!continenteSeleccionado}
              className="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
            >
              <option value="">Seleccione un país</option>
              {paises.map((pais) => (
                <option key={pais} value={pais}>
                  {pais}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de provincia */}
          <div>
            <label htmlFor="provincia" className="block text-sm font-medium text-orange-800 mb-1">
              Provincia/Estado
            </label>
            <select
              id="provincia"
              value={provinciaSeleccionada}
              onChange={(e) => handleProvinciaChange(e.target.value)}
              disabled={!paisSeleccionado}
              className="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
            >
              <option value="">Seleccione una provincia</option>
              {provincias.map((provincia) => (
                <option key={provincia} value={provincia}>
                  {provincia}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de ciudad */}
          <div>
            <label htmlFor="ciudad" className="block text-sm font-medium text-orange-800 mb-1">
              Ciudad
            </label>
            <select
              id="ciudad"
              value={ciudadSeleccionada}
              onChange={(e) => handleCiudadChange(e.target.value)}
              disabled={!provinciaSeleccionada}
              className="w-full p-2 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
            >
              <option value="">Seleccione una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón para limpiar filtros */}
        {(continenteSeleccionado || paisSeleccionado || provinciaSeleccionada || ciudadSeleccionada) && (
          <div className="mt-4">
            <button
              onClick={limpiarFiltrosRegion}
              className="bg-orange-100 text-orange-800 py-2 px-4 rounded-lg font-medium hover:bg-orange-200 transition duration-300"
            >
              Limpiar filtros de ubicación
            </button>
          </div>
        )}
      </div>

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
        {/* Botón para mostrar todos los libros */}
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

      {/* Lista de libros */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-2xl font-semibold mb-6 text-orange-700">
          {temaSeleccionado
            ? `Libros de ${temas.find((t) => t.id === temaSeleccionado)?.nombre || ""}`
            : "Todos los libros"}
          {(paisSeleccionado || provinciaSeleccionada || ciudadSeleccionada) && (
            <span className="text-lg font-normal ml-2">
              en {ciudadSeleccionada || provinciaSeleccionada || paisSeleccionado}
            </span>
          )}
        </h2>

        {/* Mensaje cuando no hay libros */}
        {librosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-orange-900 mb-4">
              {temaSeleccionado
                ? `No hay libros disponibles en la categoría ${
                    temas.find((t) => t.id === temaSeleccionado)?.nombre || ""
                  }`
                : "No hay libros disponibles actualmente"}
              {(paisSeleccionado || provinciaSeleccionada || ciudadSeleccionada) && (
                <span> en {ciudadSeleccionada || provinciaSeleccionada || paisSeleccionado}</span>
              )}
            </p>
            <p className="text-orange-700">Vuelve más tarde o regístrate para compartir tus propios libros.</p>
          </div>
        ) : (
          /* Grid de libros */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {librosFiltrados.map((libro) => (
              <div key={libro.titulo} className="bg-orange-50 p-6 rounded-lg shadow-md border border-orange-200">
                {/* Imagen del libro */}
                <div className="relative h-64 mb-4 rounded overflow-hidden">
                  <Image src={libro.portada || "/placeholder.svg"} alt={libro.titulo} layout="fill" objectFit="cover" />
                </div>
                {/* Información del libro */}
                <h3 className="text-xl font-semibold mb-2 text-orange-800">{libro.titulo}</h3>
                <p className="text-orange-900 mb-2">Autor: {libro.autor}</p>
                <p className="text-orange-900 mb-4 line-clamp-2">{libro.descripcion}</p>
                <div className="flex flex-col gap-2">
                  {/* Estado y ubicación */}
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
                    <span className="text-sm text-orange-800">
                      {libro.ciudadUsuario}, {libro.provinciaUsuario}
                    </span>
                  </div>

                  {/* Información de reservas */}
                  {libro.reservas && libro.reservas.length > 0 && (
                    <p className="text-sm text-orange-900 mt-2">
                      <span className="font-medium">Reservas:</span> {libro.reservas.length}
                    </p>
                  )}

                  {/* Botón de reserva */}
                  <div className="flex justify-between mt-2">
                    {isLoggedIn && user?.email !== libro.emailUsuario && libro.estado === "disponible" && (
                      <button
                        onClick={() => handleSolicitarReserva(libro)}
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
                      >
                        Solicitar reserva
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