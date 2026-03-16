import { useState, useEffect } from 'react';

// Usamos la misma constante que en Canchas para mantener uniformidad
const IMAGE_DEFAULT = 'https://res.cloudinary.com/dp7qbi976/image/upload/v1733325605/v7fiv6xngp8o78v7a3sd.webp';

export const TiendaManager = () => {
  const [tabActiva, setTabActiva] = useState('productos');
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [mostrarModalProd, setMostrarModalProd] = useState(false);
  const [mostrarModalCat, setMostrarModalCat] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formProd, setFormProd] = useState({ 
    name: '', 
    price: '', 
    stock: '', 
    category: '', 
    description: '', 
    active: true, 
    imageFile: null 
  });
  const [formCat, setFormCat] = useState({ name: '' });

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [resProd, resCat] = await Promise.all([
        fetch('http://localhost:3002/api/products', { credentials: 'include' }),
        fetch('http://localhost:3002/api/categories', { credentials: 'include' })
      ]);
      const dataProd = await resProd.json();
      const dataCat = await resCat.json();
      if (dataProd.items) setProductos(dataProd.items);
      if (dataCat.ok) setCategorias(dataCat.categories);
    } catch (error) {
      console.error("Error cargando tienda:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormProd({ ...formProd, imageFile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formProd.name);
    data.append('price', formProd.price);
    data.append('stock', formProd.stock);
    data.append('category', formProd.category);
    data.append('description', formProd.description);
    data.append('active', formProd.active);
    
    // Si hay un archivo nuevo, se envía como 'archivo' 
    if (formProd.imageFile) {
      data.append('archivo', formProd.imageFile);
    }

    const url = editandoId ? `http://localhost:3002/api/products/${editandoId}` : 'http://localhost:3002/api/products';
    const method = editandoId ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, { method, body: data, credentials: 'include' });
      const res = await response.json();
      if (res.ok) { 
        setMostrarModalProd(false); 
        setEditandoId(null);
        setPreview(null); 
        cargarDatos(); 
      } else { 
        alert(res.message); 
      }
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();
    const url = editandoId ? `http://localhost:3002/api/categories/${editandoId}` : 'http://localhost:3002/api/categories';
    const method = editandoId ? 'PATCH' : 'POST';
    
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formCat),
        credentials: 'include'
      });
      const res = await response.json();
      if (res.ok) { 
        setMostrarModalCat(false); 
        setEditandoId(null); 
        cargarDatos(); 
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Error al guardar categoría:", error);
    }
  };

  const borrarItem = async (tipo, id, nombre) => {
    if (!window.confirm(`¿Seguro que deseas eliminar "${nombre}"?`)) return;
    const endpoint = tipo === 'prod' ? 'products' : 'categories';
    try {
      const res = await fetch(`http://localhost:3002/api/${endpoint}/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (data.ok) cargarDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="position-relative">
      {/* HEADER */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
        <div>
          <h2 className="m-0 fw-bold" style={{ color: 'var(--color-title)' }}>Tienda</h2>
          <p className="text-muted mb-0">Gestión de inventario y clasificación</p>
        </div>
        <button 
          onClick={() => {
            setEditandoId(null);
            if (tabActiva === 'productos') {
              setPreview(IMAGE_DEFAULT);
              setFormProd({ name: '', price: '', stock: '', category: '', description: '', active: true, imageFile: null });
              setMostrarModalProd(true);
            } else {
              setFormCat({ name: '' });
              setMostrarModalCat(true);
            }
          }}
          className="btn text-white shadow-sm d-flex align-items-center gap-2" 
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <i className="bi bi-plus-lg"></i> Nuevo {tabActiva === 'productos' ? 'Producto' : 'Categoría'}
        </button>
      </div>

      {/* TABS */}
      <ul className="nav nav-tabs mb-4 border-bottom">
        <li className="nav-item">
          <button className={`nav-link border-0 ${tabActiva === 'productos' ? 'active fw-bold' : 'text-muted'}`} 
            onClick={() => setTabActiva('productos')}
            style={tabActiva === 'productos' ? { borderBottom: '3px solid var(--color-primary)', color: 'var(--color-primary)', borderRadius: 0 } : {}}>
            Productos ({productos.length})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link border-0 ${tabActiva === 'categorias' ? 'active fw-bold' : 'text-muted'}`} 
            onClick={() => setTabActiva('categorias')}
            style={tabActiva === 'categorias' ? { borderBottom: '3px solid var(--color-primary)', color: 'var(--color-primary)', borderRadius: 0 } : {}}>
            Categorías ({categorias.length})
          </button>
        </li>
      </ul>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-success"></div></div>
      ) : tabActiva === 'productos' ? (
        /* VISTA PRODUCTOS (TARJETAS COMO CANCHAS) */
        <div className="row g-4">
          {productos.map(p => (
            <div className="col-12 col-md-6 col-lg-4" key={p._id}>
              <div className={`card h-100 shadow-sm border-0 ${!p.active ? 'opacity-75' : ''}`}>
                <div style={{ height: '200px', overflow: 'hidden' }} className="bg-light position-relative">
                  <img 
                    src={p.image || IMAGE_DEFAULT} 
                    className="w-100 h-100" 
                    style={{ objectFit: 'cover' }} 
                    alt={p.name} 
                  />
                  <span className="badge position-absolute top-0 end-0 m-2" style={{ backgroundColor: 'var(--color-navbar)', color: 'var(--color-primary)' }}>
                    {p.category?.name || 'S/C'}
                  </span>
                  {!p.active && <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">Inactivo</span>}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold text-uppercase mb-1" style={{ color: 'var(--color-title)' }}>{p.name}</h5>
                  <p className="text-muted small mb-3 text-truncate">{p.description || 'Sin descripción disponible'}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto p-2 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                    <span className="fs-5 fw-bold" style={{ color: 'var(--color-primary)' }}>${p.price}</span>
                    <span className={`badge ${p.stock < 5 ? 'bg-danger-subtle text-danger' : 'bg-light text-dark border'}`}>Stock: {p.stock}</span>
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button onClick={() => { setEditandoId(p._id); setPreview(p.image || IMAGE_DEFAULT); setFormProd({ ...p, category: p.category?._id || p.category, imageFile: null }); setMostrarModalProd(true); }} className="btn btn-outline-secondary flex-grow-1 btn-sm d-flex align-items-center justify-content-center gap-1 py-2"><i className="bi bi-pencil-square"></i> Editar</button>
                    <button onClick={() => borrarItem('prod', p._id, p.name)} className="btn btn-outline-danger flex-grow-1 btn-sm d-flex align-items-center justify-content-center gap-1 py-2"><i className="bi bi-trash3"></i> Borrar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* VISTA CATEGORÍAS (TABLA CON BOTONES DE TEXTO) */
        <div className="bg-white rounded shadow-sm border overflow-hidden">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3">Nombre de Categoría</th>
                <th className="text-end px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map(c => (
                <tr key={c._id} style={{ height: '70px' }}>
                  <td className="px-4 fw-bold text-capitalize" style={{ color: 'var(--color-title)' }}>{c.name}</td>
                  <td className="text-end px-4">
                    <div className="d-flex justify-content-end gap-2 flex-nowrap">
                      <button 
                        onClick={() => { setEditandoId(c._id); setFormCat({ name: c.name }); setMostrarModalCat(true); }}
                        className="btn btn-sm d-flex align-items-center gap-2 px-3 fw-medium"
                        style={{ backgroundColor: 'var(--color-navbar)', color: 'var(--color-primary)', border: 'none' }}
                      >
                        <i className="bi bi-pencil-square"></i> Editar
                      </button>
                      <button 
                        onClick={() => borrarItem('cat', c._id, c.name)}
                        className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2 px-3 fw-medium"
                      >
                        <i className="bi bi-trash3"></i> Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL PRODUCTO (ESTILO CANCHAS) */}
      {mostrarModalProd && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070 }}>
          <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: '500px', maxHeight: '95vh', overflowY: 'auto' }}>
            <h5 className="fw-bold mb-4">{editandoId ? 'Actualizar Producto' : 'Crear Nuevo Producto'}</h5>
            <form onSubmit={guardarProducto} className="row g-3">
              {/* Preview de imagen idéntico a canchas */}
              <div className="col-12 text-center mb-2">
                <div className="border rounded p-2 bg-light mx-auto" style={{ width: '100%', height: '180px' }}>
                  <img src={preview || IMAGE_DEFAULT} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Preview" />
                </div>
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-muted">Imagen del Producto</label>
                <input type="file" className="form-control form-control-sm" accept="image/*" onChange={handleFileChange} />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-muted">Nombre</label>
                <input type="text" className="form-control text-uppercase fw-bold" value={formProd.name} onChange={e => setFormProd({...formProd, name: e.target.value})} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Precio ($)</label>
                <input type="number" className="form-control fw-bold" value={formProd.price} onChange={e => setFormProd({...formProd, price: e.target.value})} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Stock Inicial</label>
                <input type="number" className="form-control fw-bold" value={formProd.stock} onChange={e => setFormProd({...formProd, stock: e.target.value})} required />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-muted">Categoría</label>
                <select className="form-select" value={formProd.category} onChange={e => setFormProd({...formProd, category: e.target.value})} required>
                  <option value="">Seleccione una categoría...</option>
                  {categorias.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-muted">Descripción Corta</label>
                <textarea className="form-control" rows="2" value={formProd.description} onChange={e => setFormProd({...formProd, description: e.target.value})} placeholder="Ej: Bebida isotónica 500ml"></textarea>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                <button type="button" className="btn btn-light px-4" onClick={() => setMostrarModalProd(false)}>Cancelar</button>
                <button type="submit" className="btn text-white px-4 fw-bold" style={{ backgroundColor: 'var(--color-primary)' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CATEGORÍA */}
      {mostrarModalCat && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070 }}>
          <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: '400px' }}>
            <h5 className="fw-bold mb-4">{editandoId ? 'Editar Categoría' : 'Nueva Categoría'}</h5>
            <form onSubmit={guardarCategoria}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Nombre de la Categoría</label>
                <input type="text" className="form-control fw-bold text-uppercase" value={formCat.name} onChange={e => setFormCat({name: e.target.value})} required placeholder="Ej: BEBIDAS" />
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                <button type="button" className="btn btn-light px-4" onClick={() => setMostrarModalCat(false)}>Cancelar</button>
                <button type="submit" className="btn text-white px-4 fw-bold" style={{ backgroundColor: 'var(--color-primary)' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};