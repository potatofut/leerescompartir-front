import Image from 'next/image'
import ThemeCarousel from './components/ThemeCarousel'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-12 text-center text-orange-800 text-shadow">Leer es compartir</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Persona leyendo un libro"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-orange-700">Comparte tus libros favoritos</h2>
          <p className="text-orange-900 mb-6 text-xl leading-relaxed">
            Únete a nuestra comunidad de lectores y comparte los libros que ya has leído. 
            Descubre nuevas historias y permite que otros disfruten de tus lecturas favoritas.
          </p>
        </div>
      </div>

      <ThemeCarousel />

      <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-3xl font-semibold mb-8 text-orange-700 text-center">Nuestra Colección</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          ].map((src, i) => (
            <div key={i} className="relative h-64 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out hover:shadow-xl">
              <Image
                src={src}
                alt={`Portada de libro ${i + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
