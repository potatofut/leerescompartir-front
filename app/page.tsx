import Image from 'next/image'
import ThemeCarousel from './components/ThemeCarousel'

// Página principal de la aplicación que muestra la presentación y colección de libros
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Título principal de la aplicación */}
      <h1 className="text-5xl font-bold mb-12 text-center text-orange-800 text-shadow">Leer es compartir</h1>
      
      {/* Sección de presentación con imagen y texto descriptivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Imagen principal con efecto de sombra */}
        <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Persona leyendo un libro"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Texto descriptivo de la plataforma */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-orange-700">Comparte tus libros favoritos</h2>
          <p className="text-orange-900 mb-6 text-xl leading-relaxed">
            Únete a nuestra comunidad de lectores y comparte los libros que ya has leído. 
            Descubre nuevas historias y permite que otros disfruten de tus lecturas favoritas.
          </p>
        </div>
      </div>

      {/* Carrusel de temas disponibles */}
      <ThemeCarousel />

    </div>
  )
}
