import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-800">Términos del Servicio</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <div className="prose max-w-4xl mx-auto text-orange-900">
          <h2 className="text-2xl font-semibold mb-4 text-orange-700">1. Aceptación de los Términos</h2>
          <p className="mb-6">
            Al acceder y utilizar el servicio "Leer es compartir", usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguno de estos términos, no podrá utilizar nuestros servicios.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-orange-700">2. Descripción del Servicio</h2>
          <p className="mb-6">
            "Leer es compartir" es una plataforma que permite a los usuarios compartir libros que ya han leído con otros miembros de la comunidad. Los usuarios pueden buscar, reservar y prestar libros, así como gestionar su propia colección.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-orange-700">3. Registro y Cuenta</h2>
          <p className="mb-6">
            Para acceder a ciertas funcionalidades, deberá registrarse proporcionando información veraz y actualizada. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, así como de todas las actividades que ocurran bajo su cuenta.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-orange-700">4. Uso Aceptable</h2>
          <p className="mb-6">
            Usted se compromete a utilizar el servicio de manera legal y ética. No podrá utilizar la plataforma para:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Compartir contenido ilegal o inapropiado</li>
            <li>Dañar o interferir con el servicio</li>
            <li>Suplantar la identidad de otros usuarios</li>
            <li>Realizar actividades comerciales no autorizadas</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-orange-700">5. Responsabilidad por los Libros</h2>
          <p className="mb-6">
            Los usuarios son responsables de los libros que comparten a través de la plataforma. "Leer es compartir" no se hace responsable por daños, pérdidas o disputas relacionadas con los libros prestados.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-orange-700">6. Modificaciones</h2>
          <p className="mb-6">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la plataforma.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-orange-700">7. Terminación</h2>
          <p className="mb-6">
            Podemos suspender o terminar su acceso al servicio en cualquier momento, sin previo aviso, si consideramos que ha violado estos términos.
          </p>

          <p className="mt-8">
            Si tiene alguna pregunta sobre estos términos, por favor contáctenos en <Link href="mailto:info@leerescompartir.com" className="text-orange-600 hover:underline">info@leerescompartir.com</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}