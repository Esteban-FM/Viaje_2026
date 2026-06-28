import { Link } from 'react-router-dom'
import { categorias, lugares } from '../data/mockData'

const STORAGE_KEY = 'viaje_vistos'

function getLugaresVistos() {
  const ids = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  return ids.map((id) => lugares.find((l) => l.id === id)).filter(Boolean)
}

function PlaceCard({ lugar }) {
  return (
    <Link to={`/lugar/${lugar.id}`} className="block">
      <div className="rounded-2xl overflow-hidden bg-[#464646]">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={lugar.imagen}
            alt={lugar.nombre}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3">
          <div>
            <h3 className="text-white text-sm font-semibold truncate">
              {lugar.nombre}
            </h3>
          </div>
          <p className="text-gray-400 text-xs mt-0.5">{lugar.ubicacion}</p>
        </div>
      </div>
    </Link>
  )
}

export default function VistosRecientesPage() {
  const vistos = getLugaresVistos()

  const lugaresPorTipo = categorias
    .filter((cat) => cat.id !== 'airbnb')
    .map((cat) => ({
      ...cat,
      lugares: vistos.filter((l) => l.categoria === cat.id),
    }))
    .filter((cat) => cat.lugares.length > 0)

  return (
    <div className="min-h-screen bg-[#11120d] pb-24">
      <header className="sticky top-0 bg-[#11120d]/90 backdrop-blur-sm z-10 px-4 py-4 flex items-center gap-3 border-b border-gray-800">
        <Link
          to="/"
          className="text-white text-xl"
        >
          ←
        </Link>
        <h1 className="text-white text-lg font-bold">Vistos recientemente</h1>
      </header>

      <div className="px-4 pt-4">
        {lugaresPorTipo.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-12">
            Aún no has visto ningún lugar.{'\n'}Explora las categorías para empezar.
          </p>
        )}
        {lugaresPorTipo.map((cat, index) => (
          <section key={cat.id}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white text-base font-bold">{cat.nombre}</h2>
              <Link
                to={`/categoria/${cat.id}`}
                className="text-gray-400 text-xs"
              >
                Ver todos →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-2">
              {cat.lugares.slice(0, 2).map((lugar) => (
                <PlaceCard key={lugar.id} lugar={lugar} />
              ))}
            </div>

            {cat.lugares[2] && (
              <div className="w-full mb-2">
                <PlaceCard lugar={cat.lugares[2]} />
              </div>
            )}

            {index < lugaresPorTipo.length - 1 && (
              <div className="border-t border-gray-800 my-5" />
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
