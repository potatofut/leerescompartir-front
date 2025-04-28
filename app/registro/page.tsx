"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "../context/UserContext"
import { AuthService } from "../../lib/auth"
import { RegionService } from "../../lib/regions"
import { toast } from "react-hot-toast"

export default function Registro() {    
    
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        ciudad: "",
        provincia: "",
        pais: "",
        continente: ""
    })

    // State for geographical data (now as string arrays)
    const [continentes, setContinentes] = useState<string[]>([])
    const [paises, setPaises] = useState<string[]>([])
    const [provincias, setProvincias] = useState<string[]>([])
    const [ciudades, setCiudades] = useState<string[]>([])
    
    const [loading, setLoading] = useState(false)
    const [fetchingData, setFetchingData] = useState(false)
    const router = useRouter()
    const { login } = useUser()

    // Fetch continents on component mount
    useEffect(() => {
        const fetchContinentes = async () => {
            try {
                setFetchingData(true)
                const data = await RegionService.getContinentes()
                setContinentes(data)
            } catch (error) {
                console.error("Error fetching continentes:", error)
                toast.error("Error al cargar los continentes")
            } finally {
                setFetchingData(false)
            }
        }
        
        fetchContinentes()
    }, [])

    // Fetch countries when continent changes
    useEffect(() => {
        const fetchPaises = async () => {
            if (!formData.continente) {
                setPaises([])
                return
            }
            
            try {
                setFetchingData(true)
                const data = await RegionService.getPaisesPorContinente(formData.continente)
                setPaises(data)
                // Reset dependent fields
                setFormData(prev => ({
                    ...prev,
                    pais: "",
                    provincia: "",
                    ciudad: ""
                }))
            } catch (error) {
                console.error("Error fetching paises:", error)
                toast.error("Error al cargar los países")
            } finally {
                setFetchingData(false)
            }
        }
        
        fetchPaises()
    }, [formData.continente])

    // Fetch provinces when country changes
    useEffect(() => {
        const fetchProvincias = async () => {
            if (!formData.continente || !formData.pais) {
                setProvincias([])
                return
            }
            
            try {
                setFetchingData(true)
                const data = await RegionService.getProvinciasPorPais(formData.continente, formData.pais)
                setProvincias(data)
                // Reset dependent fields
                setFormData(prev => ({
                    ...prev,
                    provincia: "",
                    ciudad: ""
                }))
            } catch (error) {
                console.error("Error fetching provincias:", error)
                toast.error("Error al cargar las provincias")
            } finally {
                setFetchingData(false)
            }
        }
        
        fetchProvincias()
    }, [formData.continente, formData.pais])

    // Fetch cities when province changes
    useEffect(() => {
        const fetchCiudades = async () => {
            if (!formData.continente || !formData.pais || !formData.provincia) {
                setCiudades([])
                return
            }
            
            try {
                setFetchingData(true)
                const data = await RegionService.getCiudadesPorProvincia(
                    formData.continente,
                    formData.pais,
                    formData.provincia
                )
                setCiudades(data)
                // Reset dependent field
                setFormData(prev => ({
                    ...prev,
                    ciudad: ""
                }))
            } catch (error) {
                console.error("Error fetching ciudades:", error)
                toast.error("Error al cargar las ciudades")
            } finally {
                setFetchingData(false)
            }
        }
        
        fetchCiudades()
    }, [formData.continente, formData.pais, formData.provincia])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
          setLoading(true)
          console.log("Payload enviado:", JSON.stringify(formData, null, 2))
          const userData = await AuthService.register(formData)
          
          // After successful registration, log the user in
          const loginResponse = await AuthService.login({
            email: formData.email,
            password: formData.password
          })
          
          // Store the user data and token
          localStorage.setItem('auth_token', loginResponse.id)
          login(loginResponse)
          
          toast.success("Registro completado con éxito")
          router.push("/panel")
        } catch (error) {
          console.error("Registration error:", error)
          toast.error("Error al registrarse. Por favor, inténtalo de nuevo.")
        } finally {
          setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-orange-200">
            <h2 className="text-3xl font-semibold mb-6 text-orange-700 text-center">Registro</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-lg font-medium text-orange-900 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-lg font-medium text-orange-900 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  minLength={6}
                />
              </div>
              
              {/* Dropdown for Continente */}
              <div>
                <label htmlFor="continente" className="block text-lg font-medium text-orange-900 mb-2">
                  Continente
                </label>
                <select
                  id="continente"
                  value={formData.continente}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona un continente</option>
                  {continentes.map((continente) => (
                    <option key={continente} value={continente}>
                      {continente}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Dropdown for País */}
              <div>
                <label htmlFor="pais" className="block text-lg font-medium text-orange-900 mb-2">
                  País
                </label>
                <select
                  id="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={!formData.continente || fetchingData}
                >
                  <option value="">Selecciona un país</option>
                  {paises.map((pais) => (
                    <option key={pais} value={pais}>
                      {pais}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Dropdown for Provincia */}
              <div>
                <label htmlFor="provincia" className="block text-lg font-medium text-orange-900 mb-2">
                  Provincia
                </label>
                <select
                  id="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={!formData.pais || fetchingData}
                >
                  <option value="">Selecciona una provincia</option>
                  {provincias.map((provincia) => (
                    <option key={provincia} value={provincia}>
                      {provincia}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Dropdown for Ciudad */}
              <div>
                <label htmlFor="ciudad" className="block text-lg font-medium text-orange-900 mb-2">
                  Ciudad
                </label>
                <select
                  id="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={!formData.provincia || fetchingData}
                >
                  <option value="">Selecciona una ciudad</option>
                  {ciudades.map((ciudad) => (
                    <option key={ciudad} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
                disabled={loading || fetchingData}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </form>
          </div>
        </div>
    );
}