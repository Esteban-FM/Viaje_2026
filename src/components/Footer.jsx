import { Link, useLocation } from 'react-router-dom'

const homeFooter = [
  { label: 'INICIO', to: '/', type: 'link' },
  { label: 'AIRBNB', to: '/lugar/59', type: 'link' },
  { label: 'GRUPO W', to: 'whatsapp://', type: 'external' },
]

const lugarFooter = [
  { label: 'AIRBNB', to: '/lugar/59', type: 'link' },
  { label: 'INICIO', to: '/', type: 'link' },
  { label: 'GRUPO W', to: 'whatsapp://', type: 'external' },
]

export default function Footer() {
  const location = useLocation()
  const isLugar = location.pathname.startsWith('/lugar/')
  const buttons = isLugar ? lugarFooter : homeFooter

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-3">
        {buttons.map((btn, i) => {
          const separator = i < buttons.length - 1 && (
            <span className="text-gray-500">/</span>
          )

          if (btn.type === 'external') {
            return (
              <div key={btn.label} className="flex items-center gap-3">
                <a
                  href={btn.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm font-bold tracking-wide"
                >
                  {btn.label}
                </a>
                {separator}
              </div>
            )
          }

          return (
            <div key={btn.label} className="flex items-center gap-3">
              <Link
                to={btn.to}
                className="text-white text-sm font-bold tracking-wide"
              >
                {btn.label}
              </Link>
              {separator}
            </div>
          )
        })}
      </div>
    </footer>
  )
}
