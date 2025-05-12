"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useUser } from "../../context/UserContext"
import { RegionService } from "../../../lib/regions"
import { toast } from "react-hot-toast"

export default function DatosUsuario() {
  const { user, updateProfile } = useUser()
  const [continentes, setContinentes] = useState<string[]>([])
  const [paises, setPaises] = useState<string[]>([])
  const [provincias, setProvincias] = useState<string[]>([])
  const [ciudades, setCiudades] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [geoLoading, setGeoLoading] = useState(true)

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    ciudad: "",
    provincia: "",
    pais: "",
    continente: "",
    cp: "",
    telefono: "",
    biografia: "",
    intereses: "",
    imagen: ""
  })

  // Cargar datos iniciales del usuario y geográficos
  useEffect(() => {
    if (!user) return

    // Establecer datos básicos del usuario
    setFormData({
      nombre: user.nombre || "",
      email: user.email || "",
      ciudad: user.ciudad || "",
      provincia: user.provincia || "",
      pais: user.pais || "",
      continente: user.continente || "",
      cp: user.cp || "",
      telefono: user.telefono || "",
      biografia: user.biografia || "",
      intereses: user.intereses || "",
      imagen: user.imagen || ""
    })

    const loadGeographicData = async () => {
      try {
        setGeoLoading(true)

        // 1. Cargar continentes y seleccionar el del usuario
        const continentesData = await RegionService.getContinentes()
        setContinentes(continentesData)

        if (!user.continente) return

        // 2. Cargar países del continente del usuario y seleccionar su país
        const paisesData = await RegionService.getPaisesPorContinente(user.continente)
        setPaises(paisesData)

        if (!user.pais) return

        // 3. Cargar provincias del país del usuario y seleccionar su provincia
        const provinciasData = await RegionService.getProvinciasPorPais(user.continente, user.pais)
        setProvincias(provinciasData)

        if (!user.provincia) return

        // 4. Cargar ciudades de la provincia del usuario y seleccionar su ciudad
        const ciudadesData = await RegionService.getCiudadesPorProvincia(
          user.continente,
          user.pais,
          user.provincia
        )
        setCiudades(ciudadesData)

      } catch (error) {
        console.error("Error loading geographic data:", error)
        toast.error("Error al cargar datos geográficos")
      } finally {
        setGeoLoading(false)
      }
    }

    loadGeographicData()
  }, [user])

  // Manejar cambios en los selects geográficos
  const handleContinenteChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const continente = e.target.value
    setFormData(prev => ({
      ...prev,
      continente,
      pais: "",
      provincia: "",
      ciudad: ""
    }))

    if (!continente) {
      setPaises([])
      setProvincias([])
      setCiudades([])
      return
    }

    try {
      setGeoLoading(true)
      const paisesData = await RegionService.getPaisesPorContinente(continente)
      setPaises(paisesData)
      setProvincias([])
      setCiudades([])
    } catch (error) {
      console.error("Error fetching countries:", error)
      toast.error("Error al cargar países")
    } finally {
      setGeoLoading(false)
    }
  }

  const handlePaisChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pais = e.target.value
    setFormData(prev => ({
      ...prev,
      pais,
      provincia: "",
      ciudad: ""
    }))

    if (!pais || !formData.continente) {
      setProvincias([])
      setCiudades([])
      return
    }

    try {
      setGeoLoading(true)
      const provinciasData = await RegionService.getProvinciasPorPais(formData.continente, pais)
      setProvincias(provinciasData)
      setCiudades([])
    } catch (error) {
      console.error("Error fetching provinces:", error)
      toast.error("Error al cargar provincias")
    } finally {
      setGeoLoading(false)
    }
  }

  const handleProvinciaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provincia = e.target.value
    setFormData(prev => ({
      ...prev,
      provincia,
      ciudad: ""
    }))

    if (!provincia || !formData.continente || !formData.pais) {
      setCiudades([])
      return
    }

    try {
      setGeoLoading(true)
      const ciudadesData = await RegionService.getCiudadesPorProvincia(
        formData.continente,
        formData.pais,
        provincia
      )
      setCiudades(ciudadesData)
    } catch (error) {
      console.error("Error fetching cities:", error)
      toast.error("Error al cargar ciudades")
    } finally {
      setGeoLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      await updateProfile({
        nombre: formData.nombre,
        email: formData.email,
        ciudad: formData.ciudad,
        provincia: formData.provincia,
        pais: formData.pais,
        continente: formData.continente,
        cp: formData.cp,
        telefono: formData.telefono,
        biografia: formData.biografia,
        intereses: formData.intereses,
        imagen: formData.imagen
      })
      toast.success("Datos actualizados correctamente")
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Error al actualizar los datos")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div>Cargando datos del usuario...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Datos de Usuario</h1>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-2xl font-semibold mb-6 text-orange-700">Información personal</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nombre" className="block text-lg font-medium text-orange-900 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-orange-900 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Continente */}
            <div>
              <label htmlFor="continente" className="block text-lg font-medium text-orange-900 mb-2">
                Continente
              </label>
              <select
                id="continente"
                name="continente"
                value={formData.continente}
                onChange={handleContinenteChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
                disabled={geoLoading}
              >
                <option value="">Selecciona un continente</option>
                {continentes.map((continente) => (
                  <option key={continente} value={continente}>
                    {continente}
                  </option>
                ))}
              </select>
            </div>

            {/* País */}
            <div>
              <label htmlFor="pais" className="block text-lg font-medium text-orange-900 mb-2">
                País
              </label>
              <select
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handlePaisChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
                disabled={!formData.continente || geoLoading}
              >
                <option value="">Selecciona un país</option>
                {paises.map((pais) => (
                  <option key={pais} value={pais} selected={pais === formData.pais}>
                    {pais}
                  </option>
                ))}
              </select>
            </div>

            {/* Provincia */}
            <div>
              <label htmlFor="provincia" className="block text-lg font-medium text-orange-900 mb-2">
                Provincia
              </label>
              <select
                id="provincia"
                name="provincia"
                value={formData.provincia}
                onChange={handleProvinciaChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
                disabled={!formData.pais || geoLoading}
              >
                <option value="">Selecciona una provincia</option>
                {provincias.map((provincia) => (
                  <option key={provincia} value={provincia}>
                    {provincia}
                  </option>
                ))}
              </select>
            </div>

            {/* Ciudad */}
            <div>
              <label htmlFor="ciudad" className="block text-lg font-medium text-orange-900 mb-2">
                Ciudad
              </label>
              <select
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={(e) => setFormData(prev => ({ ...prev, ciudad: e.target.value }))}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
                disabled={!formData.provincia || geoLoading}
              >
                <option value="">Selecciona una ciudad</option>
                {ciudades.map((ciudad) => (
                  <option key={ciudad} value={ciudad}>
                    {ciudad}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="cp" className="block text-lg font-medium text-orange-900 mb-2">
                Código Postal
              </label>
              <input
                type="text"
                id="cp"
                name="cp"
                value={formData.cp}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-lg font-medium text-orange-900 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="biografia" className="block text-lg font-medium text-orange-900 mb-2">
              Biografía
            </label>
            <textarea
              id="biografia"
              name="biografia"
              value={formData.biografia}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Cuéntanos un poco sobre ti..."
            />
          </div>

          <div>
            <label htmlFor="intereses" className="block text-lg font-medium text-orange-900 mb-2">
              Intereses de lectura
            </label>
            <textarea
              id="intereses"
              name="intereses"
              value={formData.intereses}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="¿Qué géneros o temas te interesan?"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
              disabled={loading || geoLoading}
            >
              {loading ? "Guardando..." : "Guardar datos"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}