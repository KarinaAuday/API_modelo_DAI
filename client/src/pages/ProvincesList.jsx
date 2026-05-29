import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export default function ProvincesList() {
  const [provinces, setProvinces] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    full_name: '',
    latitude: '',
    longitude: '',
    display_order: ''
  })

  useEffect(() => {
    fetchProvinces()
  }, [])

  const fetchProvinces = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`${API_URL}/province`)
      setProvinces(response.data.data)
    } catch (err) {
      setError('Error al cargar provincias: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const response = await axios.post(`${API_URL}/province`, {
        name: formData.name,
        full_name: formData.full_name,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        display_order: parseInt(formData.display_order)
      })
      setSuccess('Provincia creada exitosamente')
      setFormData({ name: '', full_name: '', latitude: '', longitude: '', display_order: '' })
      setShowForm(false)
      fetchProvinces()
    } catch (err) {
      setError('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta provincia?')) {
      try {
        await axios.delete(`${API_URL}/province/${id}`)
        setSuccess('Provincia eliminada')
        fetchProvinces()
      } catch (err) {
        setError('Error al eliminar: ' + err.message)
      }
    }
  }

  return (
    <div className="container">
      <h2>Provincias</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Nueva Provincia'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Latitud</label>
            <input
              type="number"
              step="0.00000001"
              value={formData.latitude}
              onChange={(e) => setFormData({...formData, latitude: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Longitud</label>
            <input
              type="number"
              step="0.00000001"
              value={formData.longitude}
              onChange={(e) => setFormData({...formData, longitude: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Orden de Visualización</label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({...formData, display_order: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Crear Provincia</button>
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
              <th>Nombre Completo</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Orden</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {provinces.map(province => (
              <tr key={province.id}>
                <td>{province.id}</td>
                <td>{province.name}</td>
                <td>{province.full_name}</td>
                <td>{province.latitude}</td>
                <td>{province.longitude}</td>
                <td>{province.display_order}</td>
                <td>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(province.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
