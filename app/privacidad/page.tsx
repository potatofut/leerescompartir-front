import Link from 'next/link'

/**
 * Página de Política de Privacidad
 * Muestra la información detallada sobre cómo se manejan los datos de los usuarios
 * Incluye secciones sobre recopilación, uso y protección de información personal
 */
export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Política de Privacidad</h1>
      
      {/* Contenedor principal de la política */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <div className="prose max-w-4xl mx-auto text-orange-900">
          {/* Introducción */}
          <p className="mb-6">
            En "Leer es compartir", valoramos y respetamos su privacidad. Esta política explica cómo recopilamos, usamos y protegemos su información personal.
          </p>

          {/* Sección 1: Información recopilada */}
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">1. Información que Recopilamos</h2>
          <p className="mb-6">
            Podemos recopilar la siguiente información cuando utiliza nuestro servicio:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Información de registro (nombre, email, ciudad, provincia, país)</li>
            <li>Datos de interacción con la plataforma (libros compartidos, reservas, préstamos)</li>
            <li>Información técnica (dirección IP, tipo de navegador, dispositivo)</li>
          </ul>

          {/* Sección 2: Uso de la información */}
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">2. Uso de la Información</h2>
          <p className="mb-6">
            Utilizamos su información para:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Proveer y mejorar nuestros servicios</li>
            <li>Facilitar el préstamo de libros entre usuarios</li>
            <li>Personalizar su experiencia</li>
            <li>Comunicarnos con usted</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>

          {/* Sección 3: Compartir información */}
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">3. Compartir Información</h2>
          <p className="mb-6">
            No vendemos ni alquilamos su información personal a terceros. Podemos compartir información limitada (como ciudad) para facilitar el préstamo de libros entre usuarios, pero nunca compartiremos información de contacto directa sin su consentimiento.
          </p>

          {/* Sección 4: Seguridad */}
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">4. Seguridad</h2>
          <p className="mb-6">
            Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal. Sin embargo, ningún sistema es completamente seguro y no podemos garantizar la seguridad absoluta.
          </p>

          {/* Sección 5: Cookies */}
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">5. Cookies y Tecnologías Similares</h2>
          <p className="mb-6">
            Utilizamos cookies y tecnologías similares para mejorar su experiencia y analizar el uso de nuestro servicio. Puede configurar su navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio.
          </p>

          {/* Sección 6: Derechos del usuario */}
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">6. Sus Derechos</h2>
          <p className="mb-6">
            Usted tiene derecho a:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Acceder a su información personal</li>
            <li>Solicitar la corrección de datos inexactos</li>
            <li>Solicitar la eliminación de sus datos</li>
            <li>Oponerse al procesamiento de sus datos</li>
          </ul>

          {/* Sección 7: Cambios en la política */}
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">7. Cambios a esta Política</h2>
          <p className="mb-6">
            Podemos actualizar esta política ocasionalmente. Le notificaremos sobre cambios significativos mediante un aviso en nuestro sitio web o por email.
          </p>

          {/* Información de contacto */}
          <p className="mt-8">
            Para ejercer sus derechos o hacer preguntas sobre esta política, contáctenos en <Link href="mailto:info@leerescompartir.com" className="text-orange-600 hover:underline">info@leerescompartir.com</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}