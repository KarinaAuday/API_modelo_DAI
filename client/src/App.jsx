import { useState } from 'react'
import './App.css'
import ProvincesList from './pages/ProvincesList'
import CursosList from './pages/CursosList'
import AlumnosList from './pages/AlumnosList'

function App() {
  const [activeTab, setActiveTab] = useState('provinces')

  return (
    <div className="app">
      <header className="header">
        <h1>API Modelo DAI</h1>
        <p>Gestión de Provincias, Cursos y Alumnos</p>
      </header>

      <nav className="nav">
        <button 
          className={`nav-btn ${activeTab === 'provinces' ? 'active' : ''}`}
          onClick={() => setActiveTab('provinces')}
        >
          Provincias
        </button>
        <button 
          className={`nav-btn ${activeTab === 'cursos' ? 'active' : ''}`}
          onClick={() => setActiveTab('cursos')}
        >
          Cursos
        </button>
        <button 
          className={`nav-btn ${activeTab === 'alumnos' ? 'active' : ''}`}
          onClick={() => setActiveTab('alumnos')}
        >
          Alumnos
        </button>
      </nav>

      <main className="main">
        {activeTab === 'provinces' && <ProvincesList />}
        {activeTab === 'cursos' && <CursosList />}
        {activeTab === 'alumnos' && <AlumnosList />}
      </main>
    </div>
  )
}

export default App
