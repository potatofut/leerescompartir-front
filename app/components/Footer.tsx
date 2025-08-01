import Link from 'next/link'

/**
 * Componente Footer que muestra información de contacto, enlaces rápidos y legal
 * Incluye secciones para información de la empresa, navegación y datos de contacto
 */
export default function Footer() {
  return (
    <footer className="bg-orange-100 text-orange-900">
      <div className="container mx-auto px-4 py-8">
        {/* Grid de 3 columnas en desktop, 1 en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sección de información principal */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Leer es compartir</h3>
            <p className="mb-4">Únete a nuestra comunidad de lectores y comparte tus libros favoritos.</p>
          </div>

          {/* Sección de navegación rápida */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-orange-700 transition duration-300">Inicio</Link></li>
              <li><Link href="/buscar" className="hover:text-orange-700 transition duration-300">Buscar Libros</Link></li>
              <li><Link href="/login" className="hover:text-orange-700 transition duration-300">Iniciar Sesión</Link></li>
              <li><Link href="/registro" className="hover:text-orange-700 transition duration-300">Registrarse</Link></li>
            </ul>
          </div>

          {/* Sección legal y contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-orange-700 transition duration-300">Términos del Servicio</Link></li>
              <li><Link href="/privacidad" className="hover:text-orange-700 transition duration-300">Política de Privacidad</Link></li>
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2">Contacto</h4>
            <p>Email: info@leerescompartir.com</p>
            <p>Teléfono: (123) 456-7890</p>
          </div>
        </div>

        {/* Copyright y año actual */}
        <div className="mt-8 pt-8 border-t border-orange-200 text-center">
          <p>&copy; {new Date().getFullYear()} Leer es compartir. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}