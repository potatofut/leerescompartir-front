'use client'

import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { LibroService } from '../../lib/libros'
import { TematicaDTO } from '../../lib/types'

export default function ThemeCarousel() {
  const [tematicas, setTematicas] = useState<TematicaDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTematicas = async () => {
      try {
        const data = await LibroService.tematicas()
        setTematicas(data)
      } catch (err) {
        setError('Error al cargar las temáticas')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTematicas()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  if (loading) {
    return <div className="text-center py-8">Cargando temáticas...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  if (tematicas.length === 0) {
    return <div className="text-center py-8">No hay temáticas disponibles</div>
  }

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-semibold mb-8 text-orange-700 text-center">Explora por Temática</h2>
      <Slider {...settings}>
        {tematicas.map((tematica) => (
          <div key={tematica.id} className="px-2">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={tematica.imagen}
                alt={tematica.nombre}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{tematica.nombre}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}