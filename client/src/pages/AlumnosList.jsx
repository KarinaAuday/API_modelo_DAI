import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export default function AlumnosList() {
  const [alumnos, setAlumnos] = useState([])
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    id_curso: '',
    fecha_nacimiento: '',
    hace_deportes: false
  })

  useEffect(() => {
    fetchAlumnos()
    fetchCursos()
  }, [])

  const fetchAlumnos = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`${API_URL}/alumnos`)
      setAlumnos(response.data.data)
    } catch (err) {
      setError('Error al cargar alumnos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCursos = async () => {
    try {
      const response = await axios.get(`${API_URL}/cursos`)
      setCursos(response.data.data)
    } catch (err) {
      console.error('Error al cargar cursos:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      await axios.post(`${API_URL}/alumnos`, {
        nombre: formData.nombre,
        apellido: formData.apellido,
        id_curso: parseInt(formData.id_curso),
        fecha_nacimiento: formData.fecha_nacimiento || null,
        hace_deportes: formData.hace_deportes
      })
      setSuccess('Alumno creado exitosamente')
      setFormData({ nombre: '', apellido: '', id_curso: '', fecha_nacimiento: '', hace_deportes: false })
      setShowForm(false)
      fetchAlumnos()
    } catch (err) {
      setError('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div className="container">
      <h2>Alumnos</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Nuevo Alumno'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input
              type="text"
              value={formData.apellido}
              onChange={(e) => setFormData({...formData, apellido: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Curso</label>
            <select
              value={formData.id_curso}
              onChange={(e) => setFormData({...formData, id_curso: e.target.value})}
              required
            >
              <option value="">Seleccionar curso</option>
              {cursos.map(curso => (
                <option key={curso.id} value={curso.id}>{curso.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              value={formData.fecha_nacimiento}
              onChange={(e) => setFormData({...formData, fecha_nacimiento: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.hace_deportes}
                onChange={(e) => setFormData({...formData, hace_deportes: e.target.checked})}
              />
              Hace deportes
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Crear Alumno</button>
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
              <th>Apellido</th>
              <th>Curso ID</th>
              <th>Fecha Nacimiento</th>
              <th>Deportes</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map(alumno => (
              <tr key={alumno.id}>
                <td>{alumno.id}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.id_curso}</td>
                <td>{alumno.fecha_nacimiento || '-'}</td>
                <td>{alumno.hace_deportes ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
