"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "../../context/UserContext"

export default function DatosUsuario() {
  const { user } = useUser()
  const [formData, setFormData] = useState({
    continente: "",
    pais: "",
    ciudad: "",
    direccion: "",
    codigoPostal: "",
    telefono: "",
    biografia: "",
    intereses: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar los datos del usuario
    alert("Datos guardados correctamente")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Datos de Usuario</h1>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-2xl font-semibold mb-6 text-orange-700">Información adicional</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="continente" className="block text-lg font-medium text-orange-900 mb-2">
                Continente
              </label>
              <select
                id="continente"
                name="continente"
                value={formData.continente}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Selecciona un continente</option>
                <option value="africa">África</option>
                <option value="america">América</option>
                <option value="asia">Asia</option>
                <option value="europa">Europa</option>
                <option value="oceania">Oceanía</option>
              </select>
            </div>

            <div>
              <label htmlFor="pais" className="block text-lg font-medium text-orange-900 mb-2">
                País
              </label>
              <input
                type="text"
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="ciudad" className="block text-lg font-medium text-orange-900 mb-2">
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="direccion" className="block text-lg font-medium text-orange-900 mb-2">
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="codigoPostal" className="block text-lg font-medium text-orange-900 mb-2">
                Código Postal
              </label>
              <input
                type="text"
                id="codigoPostal"
                name="codigoPostal"
                value={formData.codigoPostal}
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
            >
              Guardar datos
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
