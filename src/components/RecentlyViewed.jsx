import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { lugares } from '../data/mockData'

const STORAGE_KEY = 'viaje_vistos'

function getLugaresVistos() {
  const ids = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  if (ids.length === 0) return lugares.slice(0, 6)
  return ids.map((id) => lugares.find((l) => l.id === id)).filter(Boolean)
}

export default function RecentlyViewed() {
  const location = useLocation()
  const [vistos, setVistos] = useState(getLugaresVistos)

  useEffect(() => {
    setVistos(getLugaresVistos())
  }, [location])

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-white text-lg font-bold">Vistos recientemente</h2>
        <Link
          to="/vistos-recientes"
          className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold"
        >
          ➜
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {vistos.map((lugar) => (
          <Link key={lugar.id} to={`/lugar/${lugar.id}`} className="flex-shrink-0 w-28">
            <div className="w-28 h-28 rounded-xl overflow-hidden border-2 border-gray-700 bg-gray-800">
              <img
                src={lugar.imagen}
                alt={lugar.nombre}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white text-xs font-semibold mt-1 truncate">
              {lugar.nombre}
            </p>
            <p className="text-gray-400 text-[10px] truncate">{lugar.tipo}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
