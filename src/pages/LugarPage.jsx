import { useParams, Link, useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { lugares } from '../data/mockData'

const STORAGE_KEY = 'viaje_vistos'
const MAX_VISTOS = 6

function guardarVisto(id) {
  const previos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  const actualizados = [id, ...previos.filter((v) => v !== id)].slice(0, MAX_VISTOS)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados))
}

export default function LugarPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const carouselRef = useRef(null)

  const lugar = lugares.find((l) => l.id === Number(id))
  const pageRef = useRef(null)

  useEffect(() => {
    if (lugar) guardarVisto(lugar.id)
  }, [lugar])

  useEffect(() => {
    if (!lugar || !pageRef.current) return
    const els = pageRef.current.querySelectorAll('.anim')
    gsap.fromTo(
      els,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', clearProps: 'all' }
    )
  }, [lugar])

  if (!lugar) {
    return (
      <div className="min-h-screen bg-[#11120d] flex items-center justify-center">
        <p className="text-white">Lugar no encontrado</p>
      </div>
    )
  }

  const tieneReservacion = !!lugar.reservacion

  return (
    <div ref={pageRef} className="min-h-screen bg-[#11120d] pb-24">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 text-white text-2xl"
      >
        ←
      </button>

      {/* Header info */}
      <header className="pt-12 px-4 pb-6 anim">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
          {lugar.tipo}
        </p>
        <h1 className="text-white text-3xl font-black mt-1 leading-tight">
          {lugar.nombre}
        </h1>

        {tieneReservacion ? (
          <div className="flex items-start justify-between mt-3 gap-3">
            <div>
              {lugar.horario && (
                <p className="text-gray-300 text-sm">{lugar.horario}</p>
              )}
              <p className="text-gray-400 text-xs mt-0.5">{lugar.direccion}</p>
            </div>
            <a
              href={lugar.reservacion}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f9f374] text-black text-xs font-bold py-2 px-4 rounded-lg flex-shrink-0"
            >
              RESERVACIÓN
            </a>
          </div>
        ) : (
          <div className="text-center mt-4">
            {lugar.horario && (
              <p className="text-gray-300 text-sm">{lugar.horario}</p>
            )}
            <p className="text-gray-400 text-xs mt-0.5">{lugar.direccion}</p>
          </div>
        )}
      </header>

      {/* Map */}
      <section className="px-4 mb-6 anim">
        <h2 className="text-white text-base font-bold mb-3 text-center uppercase tracking-wide">
          Ubicación
        </h2>
        <div className="rounded-2xl overflow-hidden border border-gray-700 aspect-[4/3] relative">
          <iframe
            title="Mapa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={lugar.mapEmbed}
          />
        </div>
      </section>

      {/* Gallery */}
      <section className="mb-6 anim">
        <h2 className="text-white text-base font-bold mb-3 px-4 text-center uppercase tracking-wide">
          Galería
        </h2>
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide snap-x snap-mandatory"
        >
          {lugar.galeria.map((foto, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 aspect-[3/2] rounded-2xl overflow-hidden border border-gray-700 snap-center"
            >
              <img
                src={foto}
                alt={`${lugar.nombre} foto ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Instagram */}
      {lugar.instagram && (
        <section className="px-4 mb-8 flex justify-center anim">
          <a
            href={`https://instagram.com/${lugar.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#464646] border border-gray-700 rounded-full py-2.5 px-5"
          >
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span className="text-white text-sm font-semibold">
              @{lugar.instagram}
            </span>
          </a>
        </section>
      )}
    </div>
  )
}
