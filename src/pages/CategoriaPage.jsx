import { Link, useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { categorias, lugares } from '../data/mockData'

function PlaceCard({ lugar }) {
  return (
    <Link to={`/lugar/${lugar.id}`} className="card block rounded-2xl overflow-hidden bg-[#464646]">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={lugar.imagen}
          alt={lugar.nombre}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="text-white text-sm font-semibold leading-tight">{lugar.nombre}</h3>
        <p className="text-gray-400 text-xs mt-0.5">{lugar.ubicacion}</p>
      </div>
    </Link>
  )
}

export default function CategoriaPage() {
  const { id } = useParams()
  const gridRef = useRef(null)
  const categoria = categorias.find((c) => c.id === id)
  const lugaresEnCategoria = lugares.filter((l) => l.categoria === id)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out', clearProps: 'all' }
    )
  }, [id])

  if (!categoria) {
    return (
      <div className="min-h-screen bg-[#11120d] flex items-center justify-center">
        <p className="text-white">Categoría no encontrada</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#11120d] pb-24">
      <header className="sticky top-0 bg-[#11120d]/90 backdrop-blur-sm z-10 px-4 py-4 flex items-center gap-3 border-b border-gray-800">
        <Link to="/" className="text-white text-xl">←</Link>
        <div>
          <h1 className="text-white text-lg font-bold leading-tight">
            {categoria.nombreCompleto || categoria.nombre}
          </h1>
          <p className="text-gray-400 text-xs">{lugaresEnCategoria.length} lugares</p>
        </div>
      </header>

      <div ref={gridRef} className="px-4 pt-4 grid grid-cols-2 gap-3">
        {lugaresEnCategoria.map((lugar) => (
          <PlaceCard key={lugar.id} lugar={lugar} />
        ))}
      </div>
    </div>
  )
}
