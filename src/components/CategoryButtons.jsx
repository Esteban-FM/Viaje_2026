import { Link } from 'react-router-dom'
import { categorias } from '../data/mockData'

export default function CategoryButtons() {
  return (
    <div className="grid grid-cols-3 gap-2 px-4">
      {categorias.filter((cat) => cat.id !== 'airbnb').map((cat) => (
        <Link
          key={cat.id}
          to={`/categoria/${cat.id}`}
          className="bg-white text-black text-sm font-semibold py-2 px-3 rounded-full text-center"
        >
          {cat.nombre}
        </Link>
      ))}
    </div>
  )
}
