import { useState } from 'react'
import { Link } from 'react-router-dom'
import { eventosPorDia } from '../data/mockData'

const dias = [
  { key: 'jueves', label: 'JUEVES' },
  { key: 'viernes', label: 'VIERNES' },
  { key: 'sabado', label: 'SÁBADO' },
  { key: 'domingo', label: 'DOMINGO' },
]

export default function EventsSection() {
  const [diaActivo, setDiaActivo] = useState('jueves')
  const eventos = eventosPorDia[diaActivo]

  return (
    <section className="mt-6 pb-24">
      <h2 className="text-white text-lg font-bold px-4 mb-3">
        Eventos del día
      </h2>

      <div className="flex gap-2 px-4 mb-4">
        {dias.map((dia) => (
          <button
            key={dia.key}
            onClick={() => setDiaActivo(dia.key)}
            className={`py-1.5 px-3 rounded-full text-xs font-bold transition-colors ${
              diaActivo === dia.key
                ? 'bg-[#f9f374] text-black'
                : 'bg-[#363636] text-white'
            }`}
          >
            {dia.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 px-4">
        {eventos.map((evento) => (
          <EventCard key={evento.id} evento={evento} />
        ))}
      </div>
    </section>
  )
}

function EventCard({ evento }) {
  return (
    <Link to={`/evento/${evento.id}`} className="block">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#2a2b24] flex items-center justify-center">
        {evento.imagen ? (
          <img
            src={evento.imagen}
            alt={evento.nombre}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2a2b24 0%, #1a1b15 100%)' }} />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, #11120d 100%)' }} />
      </div>
      <p className="text-white text-xs font-semibold mt-1 truncate">
        {evento.nombre}
      </p>
      <p className="text-gray-400 text-[10px] truncate">{evento.lugar}</p>
    </Link>
  )
}
