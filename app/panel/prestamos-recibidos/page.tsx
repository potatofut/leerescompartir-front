"use client"

import Image from "next/image"
import { useUser } from "../../context/UserContext"

export default function PrestamosRecibidos() {
  const { user, devolverPrestamoRecibido } = useUser()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Mis Préstamos Recibidos</h1>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-2xl font-semibold mb-6 text-orange-700">Libros que me han prestado</h2>

        {user.prestamosRecibidos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-orange-900 mb-4">No tienes libros prestados actualmente</p>
            <p className="text-orange-700">Explora nuestra colección y solicita préstamos en la sección de libros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.prestamosRecibidos.map((prestamo) => (
              <div key={prestamo.id} className="bg-orange-50 p-6 rounded-lg shadow-md border border-orange-200">
                <div className="relative h-48 mb-4 rounded overflow-hidden">
                  <Image
                    src={prestamo.libro.portada || "/placeholder.svg"}
                    alt={prestamo.libro.titulo}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-800">{prestamo.libro.titulo}</h3>
                <p className="text-orange-900 mb-2">Autor: {prestamo.libro.autor}</p>
                <p className="text-orange-900 mb-2">Prestado por: {prestamo.libro.propietario}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-orange-900">
                    <span className="font-medium">Fecha de préstamo:</span> {prestamo.fechaPrestamo}
                  </p>
                  <p className="text-sm text-orange-900">
                    <span className="font-medium">Fecha de devolución:</span> {prestamo.fechaDevolucion}
                  </p>
                </div>
                <button
                  onClick={() => devolverPrestamoRecibido(prestamo.id)}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
                >
                  Devolver libro
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
