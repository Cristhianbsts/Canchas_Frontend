import { useState, useEffect } from 'react';

export const CanchasManager = () => {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', pricePerHour: '', active: true });
  const [editandoId, setEditandoId] = useState(null);

  const obtenerCanchas = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/fields');
      const data = await response.json();
      if (data.ok) setCanchas(data.fields);
    } catch (error) {
      console.error("Error de conexión:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCanchas();
  }, []);

  const abrirModalCrear = () => {
    setEditandoId(null);
    setFormData({ name: '', pricePerHour: '', active: true }); 
    setMostrarModal(true);
  };

  const abrirModalEditar = (cancha) => {
    setEditandoId(cancha._id);
    setFormData({ name: cancha.name, pricePerHour: cancha.pricePerHour, active: cancha.active !== false });
    setMostrarModal(true);
  };

  const guardarCancha = async (e) => {
    e.preventDefault();
    const url = editandoId ? `http://localhost:3002/api/fields/${editandoId}` : 'http://localhost:3002/api/fields';
    const method = editandoId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.ok) {
        setMostrarModal(false);
        obtenerCanchas(); 
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const borrarCancha = async (id, nombre) => {
    const confirmar = window.confirm(`¿Estás seguro que deseas dar de baja la cancha "${nombre}"?`);
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:3002/api/fields/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.ok) obtenerCanchas();
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  return (
    <div className="position-relative">
      
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
        <div>
          <h2 style={{ color: 'var(--color-title)', fontWeight: 'var(--font-weight-title)' }}>
            Gestión de canchas
          </h2>
          <p className="mb-0" style={{ color: 'var(--color-text-secondary)' }}>
            Administra los espacios, precios y disponibilidad de tu complejo.
          </p>
        </div>
        <button onClick={abrirModalCrear} className="btn text-white shadow-sm d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--color-primary)' }}>
          <i className="bi bi-plus-lg"></i> Nueva Cancha
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-success" role="status"></div></div>
      ) : canchas.length === 0 ? (
        <div className="text-center py-5 bg-white rounded border shadow-sm">
          <i className="bi bi-inbox fs-1 text-muted"></i>
          <p className="mt-3 text-muted">No hay canchas activas en el complejo todavía.</p>
        </div>
      ) : (
        <div className="row g-4">
          {canchas.map((cancha) => (
            <div className="col-12 col-md-6 col-lg-4" key={cancha._id}>
              <div className={`card h-100 shadow-sm border-0 ${cancha.active === false ? 'opacity-75' : ''}`} style={{ backgroundColor: 'var(--color-card)' }}>
                <div className="bg-light d-flex align-items-center justify-content-center border-bottom position-relative" style={{ height: '160px', color: 'var(--color-text-secondary)' }}>
                  <i className="bi bi-image fs-1 opacity-50"></i>
                
                  {cancha.active === false && (
                    <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">Inactiva</span>
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-truncate" style={{ color: 'var(--color-title)' }} title={cancha.name}>
                    {cancha.name}
                  </h5>
                  <p className="card-text fs-5 mb-4" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
                    ${cancha.pricePerHour} <span className="fs-6 text-muted fw-normal">/ hora</span>
                  </p>
                  
                  <div className="mt-auto d-flex gap-2">
                    <button onClick={() => abrirModalEditar(cancha)} className="btn btn-outline-secondary flex-grow-1 d-flex justify-content-center align-items-center gap-2">
                      <i className="bi bi-pencil-square"></i> Editar
                    </button>
                    <button onClick={() => borrarCancha(cancha._id, cancha.name)} className="btn btn-outline-danger flex-grow-1 d-flex justify-content-center align-items-center gap-2">
                      <i className="bi bi-trash3"></i> Borrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {mostrarModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: '500px' }}>
            
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="m-0 fw-bold" style={{ color: 'var(--color-title)' }}>
                {editandoId ? 'Editar Cancha' : 'Crear Nueva Cancha'}
              </h5>
              <button type="button" className="btn-close" onClick={() => setMostrarModal(false)}></button>
            </div>

            <form onSubmit={guardarCancha}>
              <div className="mb-3">
                <label className="form-label" style={{ color: 'var(--color-text-secondary)' }}>Nombre de la cancha</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label" style={{ color: 'var(--color-text-secondary)' }}>Precio por Hora ($)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData({...formData, pricePerHour: e.target.value})}
                  required 
                  min="0"
                />
              </div>

             
              {editandoId && (
                <div className="form-check form-switch mb-4 p-3 rounded" style={{ backgroundColor: '#f8f9fa', border: '1px solid var(--color-border)' }}>
                  <input 
                    className="form-check-input ms-0 me-3" 
                    type="checkbox" 
                    role="switch" 
                    id="switchEstado" 
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    style={{ cursor: 'pointer' }}
                  />
                  <label className="form-check-label fw-medium" htmlFor="switchEstado" style={{ cursor: 'pointer', color: formData.active ? 'var(--color-primary)' : '#dc3545' }}>
                    {formData.active ? 'Cancha Activa' : 'Cancha Inactiva'}
                  </label>
                </div>
              )}

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light border" onClick={() => setMostrarModal(false)}>Cancelar</button>
                <button type="submit" className="btn text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                  {editandoId ? 'Actualizar Cambios' : 'Guardar Cancha'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};