import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-orange-100 text-orange-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Leer es compartir</h3>
            <p className="mb-4">Únete a nuestra comunidad de lectores y comparte tus libros favoritos.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-orange-700 transition duration-300">Inicio</Link></li>
              <li><Link href="/buscar" className="hover:text-orange-700 transition duration-300">Buscar Libros</Link></li>
              <li><Link href="/login" className="hover:text-orange-700 transition duration-300">Iniciar Sesión</Link></li>
              <li><Link href="/registro" className="hover:text-orange-700 transition duration-300">Registrarse</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <p>Email: info@leerescompartir.com</p>
            <p>Teléfono: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-orange-200 text-center">
          <p>&copy; 2023 Leer es compartir. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
