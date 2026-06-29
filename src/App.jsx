import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import VistosRecientesPage from './pages/VistosRecientesPage'
import LugarPage from './pages/LugarPage'
import CategoriaPage from './pages/CategoriaPage'
import EventoPage from './pages/EventoPage'
import Footer from './components/Footer'
import ColorText from './pages/ColorTest'

function App() {
  return (
    <BrowserRouter basename="/Viaje_2026">
      <div className="max-w-md mx-auto relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vistos-recientes" element={<VistosRecientesPage />} />
          <Route path="/lugar/:id" element={<LugarPage />} />
          <Route path="/categoria/:id" element={<CategoriaPage />} />
          <Route path="/evento/:id" element={<EventoPage />} />
          <Route path="/color-test" element={<ColorText />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
