"use client"

import Image from "next/image"
import { useUser } from "../../context/UserContext"

export default function MisPrestamos() {
  const { user, prestamos, devolverLibro, isLoggedIn } = useUser()

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Mis Préstamos</h1>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200 text-center">
          <p className="text-xl text-orange-900">Por favor inicia sesión para ver tus préstamos</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Mis Préstamos</h1>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-2xl font-semibold mb-6 text-orange-700">Libros prestados</h2>

        {prestamos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-orange-900 mb-4">No hay libros prestados</p>
            <p className="text-orange-700">
              Explora nuestra colección y encuentra tu próxima lectura en la sección de búsqueda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prestamos.map((prestamo) => (
              <div key={`${prestamo.titulo}-${prestamo.fechaPrestamo || prestamo.fechaReserva}`} className="bg-orange-50 p-6 rounded-lg shadow-md border border-orange-200">
                <div className="relative h-48 mb-4 rounded overflow-hidden">
                  <Image
                    src={prestamo.portada || "/placeholder.svg"}
                    alt={prestamo.titulo}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-800">{prestamo.titulo}</h3>
                <p className="text-orange-900 mb-2">Autor: {prestamo.autor}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-orange-900">
                    <span className="font-medium">
                      {prestamo.fechaPrestamo ? 'Fecha de préstamo:' : 'Fecha de reserva:'}
                    </span>{" "}
                    {new Date(prestamo.fechaPrestamo || prestamo.fechaReserva).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </p>
                  {prestamo.fechaPrestamo && (
                    <p className="text-sm text-orange-900">
                      <span className="font-medium">Fecha de devolución:</span> {prestamo.fechaDevolucion.toLocaleString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => devolverLibro({
                    titulo: prestamo.titulo,
                    emailUsuario: prestamo.emailUsuario
                  })}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
                >
                  {prestamo.fechaPrestamo ? 'Devolver libro' : 'Cancelar reserva'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}