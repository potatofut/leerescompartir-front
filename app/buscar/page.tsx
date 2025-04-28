"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface Libro {
  id: number
  titulo: string
  autor: string
  disponible: boolean
  portada: string
}

export default function Buscar() {
  const [busqueda, setBusqueda] = useState("")
  const [resultados, setResultados] = useState<Libro[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para buscar libros
    // Por ahora, usaremos datos de ejemplo
    const librosEjemplo: Libro[] = [
      {
        id: 1,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        disponible: true,
        portada:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        titulo: "El señor de los anillos",
        autor: "J.R.R. Tolkien",
        disponible: false,
        portada:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 3,
        titulo: "Harry Potter y la piedra filosofal",
        autor: "J.K. Rowling",
        disponible: true,
        portada:
          "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      },
    ]
    setResultados(librosEjemplo)
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
            className="bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
          >
            Buscar
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-2xl font-semibold mb-6 text-orange-700">Resultados de la búsqueda</h2>

        {resultados.length === 0 ? (
          <p className="text-center text-orange-900">Realiza una búsqueda para ver resultados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resultados.map((libro) => (
              <div key={libro.id} className="bg-orange-50 p-6 rounded-lg shadow-md border border-orange-200">
                <div className="relative h-48 mb-4 rounded overflow-hidden">
                  <Image src={libro.portada || "/placeholder.svg"} alt={libro.titulo} layout="fill" objectFit="cover" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-800">{libro.titulo}</h3>
                <p className="text-orange-900 mb-2">Autor: {libro.autor}</p>
                <p className="text-orange-900">
                  Estado:
                  <span className={libro.disponible ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {libro.disponible ? " Disponible" : " No disponible"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
