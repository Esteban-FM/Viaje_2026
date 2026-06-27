import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import VistosRecientesPage from './pages/VistosRecientesPage'
import LugarPage from './pages/LugarPage'
import CategoriaPage from './pages/CategoriaPage'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vistos-recientes" element={<VistosRecientesPage />} />
          <Route path="/lugar/:id" element={<LugarPage />} />
          <Route path="/categoria/:id" element={<CategoriaPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
