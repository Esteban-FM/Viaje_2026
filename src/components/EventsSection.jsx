import { useState, useRef } from 'react'
import { eventosPorDia } from '../data/mockData'

const dias = [
  { key: 'jueves', label: 'JUEVES' },
  { key: 'viernes', label: 'VIERNES' },
  { key: 'sabado', label: 'SÁBADO' },
  { key: 'domingo', label: 'DOMINGO' },
]

export default function EventsSection() {
  const [diaActivo, setDiaActivo] = useState('jueves')
  const scrollRef = useRef(null)
  const eventos = eventosPorDia[diaActivo]

  const fila1 = eventos.slice(0, 3)
  const fila2 = eventos.slice(3, 6)

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
                ? 'bg-white text-black'
                : 'bg-gray-800 text-white border border-gray-600'
            }`}
          >
            {dia.label}
          </button>
        ))}
      </div>

      <div ref={scrollRef} className="overflow-x-auto px-4 scrollbar-hide">
        <div className="flex flex-col gap-3 min-w-max">
          <div className="flex gap-3">
            {fila1.map((evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))}
          </div>
          <div className="flex gap-3">
            {fila2.map((evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EventCard({ evento }) {
  return (
    <div className="w-28 flex-shrink-0">
      <div className="w-28 h-28 rounded-xl overflow-hidden border-2 border-gray-700 bg-gray-800">
        <img
          src={evento.imagen}
          alt={evento.nombre}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-white text-xs font-semibold mt-1 truncate">
        {evento.nombre}
      </p>
      <p className="text-gray-400 text-[10px] truncate">{evento.horario}</p>
    </div>
  )
}
