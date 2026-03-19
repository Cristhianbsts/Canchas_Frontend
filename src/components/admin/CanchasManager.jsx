import { useState, useEffect } from 'react';
import { getField, saveField, deleteField } from '../../helpers/field';

export const CanchasManager = () => {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({ name: '', pricePerHour: '', active: true, imageFile: null });

  const obtenerCanchas = async () => {
    try {
      const fields = await getField();
      if (fields) setCanchas(fields);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { obtenerCanchas(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const abrirModalCrear = () => {
    setEditandoId(null);
    setPreview(null);
    setFormData({ name: '', pricePerHour: '', active: true, imageFile: null });
    setMostrarModal(true);
  };

  const abrirModalEditar = (cancha) => {
    setEditandoId(cancha._id);
    setPreview(cancha.image);
    setFormData({ name: cancha.name, pricePerHour: cancha.pricePerHour, active: cancha.active !== false, imageFile: null });
    setMostrarModal(true);
  };

  const guardarCancha = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('pricePerHour', formData.pricePerHour);
    data.append('active', formData.active);
    if (formData.imageFile) data.append('archivo', formData.imageFile);

    try {
      const resData = await saveField(editandoId, data);
      if (resData.ok) {
        setMostrarModal(false);
        obtenerCanchas();
      } else {
        alert(resData.message);
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error de conexión con el servidor (posiblemente CORS o servidor caído). Revisá la consola.");
    }
  };

  const borrarCancha = async (id, nombre) => {
    if (!window.confirm(`¿Baja para "${nombre}"?`)) return;
    try {
      const data = await deleteField(id);
      if (data.ok) obtenerCanchas();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (

    <div className="position-relative">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
        <div>
          <h2 className="m-0" style={{ color: 'var(--color-title)', fontWeight: 'var(--font-weight-title)' }}>
            Gestión de canchas
          </h2>
          <p className="mb-0 text-muted">
            Administra espacios, precios y fotos de tu complejo.
          </p>
        </div>
        <button onClick={abrirModalCrear} className="btn text-white shadow-sm d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--color-primary)' }}>
          <i className="bi bi-plus-lg"></i> Nueva Cancha
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-success"></div></div>
      ) : (
        <div className="row g-4">
          {canchas.map((cancha) => (
            <div className="col-12 col-md-6 col-lg-4" key={cancha._id}>
              <div className={`card h-100 shadow-sm border-0 ${!cancha.active ? 'opacity-75' : ''}`}>
                <div style={{ height: '180px', overflow: 'hidden' }} className="bg-light position-relative">
                  {cancha.image ? (
                    <img src={cancha.image} alt={cancha.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                  ) : (
                    <div className="h-100 d-flex align-items-center justify-content-center"><i className="bi bi-image fs-1 opacity-25"></i></div>
                  )}
                  {!cancha.active && <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">Inactiva</span>}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{cancha.name}</h5>
                  <p className="fs-5 mb-4" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
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

      {/* MODAL */}
      {mostrarModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: '500px' }}>
            <h5 className="fw-bold mb-4">{editandoId ? 'Editar Cancha' : 'Nueva Cancha'}</h5>
            <form onSubmit={guardarCancha}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input type="number" className="form-control" value={formData.pricePerHour} onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Foto</label>
                <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
                {preview && <div className="mt-2 border rounded p-1 text-center" style={{ height: '100px' }}><img src={preview} alt="prev" className="h-100" style={{ objectFit: 'contain' }} /></div>}
              </div>
              {editandoId && (
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} id="sw" />
                  <label className="form-check-label" htmlFor="sw">Cancha Activa</label>
                </div>
              )}
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light" onClick={() => setMostrarModal(false)}>Cancelar</button>
                <button type="submit" className="btn text-white" style={{ backgroundColor: 'var(--color-primary)' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};