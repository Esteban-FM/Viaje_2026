import { useParams, useNavigate } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { eventosPorDia } from '../data/mockData'

const todosLosEventos = Object.values(eventosPorDia).flat()

export default function EventoPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pageRef = useRef(null)

  const evento = todosLosEventos.find((e) => e.id === Number(id))

  useEffect(() => {
    if (!evento || !pageRef.current) return
    const els = pageRef.current.querySelectorAll('.anim')
    gsap.fromTo(
      els,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', clearProps: 'all' }
    )
  }, [evento])

  if (!evento) {
    return (
      <div className="min-h-screen bg-[#11120d] flex items-center justify-center">
        <p className="text-white">Evento no encontrado</p>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-[#11120d] pb-24">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 text-white text-2xl"
      >
        ←
      </button>

      <header className="pt-12 px-4 pb-6 anim">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
          {evento.lugar}
        </p>
        <h1 className="text-white text-3xl font-black mt-1 leading-tight">
          {evento.nombre}
        </h1>

        <div className="mt-4 flex flex-col gap-1">
          {evento.horario && (
            <p className="text-gray-300 text-sm">{evento.horario}</p>
          )}
          <p className="text-gray-400 text-xs">{evento.direccion}</p>
        </div>
      </header>

      {/* Precio + tickets */}
      <section className="px-4 mb-6 anim">
        <div className="bg-[#1e1f19] rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Entrada</p>
            <p className="text-white font-bold text-base">{evento.precio}</p>
          </div>
          {evento.tickets && (
            <a
              href={evento.tickets}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f9f374] text-black text-xs font-bold py-2 px-5 rounded-lg flex-shrink-0"
            >
              TICKETS
            </a>
          )}
        </div>
      </section>

      {/* Mapa */}
      <section className="px-4 mb-6 anim">
        <h2 className="text-white text-base font-bold mb-3 text-center uppercase tracking-wide">
          Ubicación
        </h2>
        <div className="rounded-2xl overflow-hidden border border-gray-700 aspect-[4/3]">
          <iframe
            title="Mapa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={evento.mapEmbed}
          />
        </div>
      </section>

      {/* Poster */}
      {evento.imagen && <PosterSection src={evento.imagen} nombre={evento.nombre} />}
    </div>
  )
}

function PosterSection({ src, nombre }) {
  const [error, setError] = useState(false)
  if (error) return null
  return (
    <section className="px-4 mb-6 anim">
      <h2 className="text-white text-base font-bold mb-3 text-center uppercase tracking-wide">
        Poster
      </h2>
      <img
        src={src}
        alt={`Poster ${nombre}`}
        loading="lazy"
        onError={() => setError(true)}
        className="w-full rounded-2xl"
      />
    </section>
  )
}
