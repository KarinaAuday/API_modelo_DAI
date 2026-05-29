import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export default function CursosList() {
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    fetchCursos()
  }, [])

  const fetchCursos = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`${API_URL}/cursos`)
      setCursos(response.data.data)
    } catch (err) {
      setError('Error al cargar cursos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      await axios.post(`${API_URL}/cursos`, { nombre })
      setSuccess('Curso creado exitosamente')
      setNombre('')
      setShowForm(false)
      fetchCursos()
    } catch (err) {
      setError('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div className="container">
      <h2>Cursos</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Nuevo Curso'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div className="form-group">
            <label>Nombre del Curso</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: 5IA"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Crear Curso</button>
        </form>
      )}

      {loading ? (
        <div className="loading"><div className="spinner"></div></div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map(curso => (
              <tr key={curso.id}>
                <td>{curso.id}</td>
                <td>{curso.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
