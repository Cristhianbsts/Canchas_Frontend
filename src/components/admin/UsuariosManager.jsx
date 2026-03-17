import { useState, useEffect } from 'react';

export const UsuariosManager = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const obtenerUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/users', { 
        credentials: 'include' 
      });
      
      const data = await response.json();
      
      if (data.ok) {
        setUsuarios(data.users);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);


  const cambiarEstado = async (id, isActive, username) => {
    const accion = isActive ? 'suspender' : 'activar';
    const confirmar = window.confirm(`¿Estás seguro que deseas ${accion} al usuario ${username}?`);
    
    if (!confirmar) return;

    const endpoint = isActive ? 'suspend' : 'activate';
    const url = `http://localhost:3002/api/users/${id}/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.ok) {
        obtenerUsuarios(); 
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(`Error al ${accion}:`, error);
    }
  };

  return (
    <div>
      
      <div className="mb-4">
        <h2 style={{ color: 'var(--color-title)', fontWeight: 'var(--font-weight-title)' }}>
          Gestión de Usuarios
        </h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Administra los clientes registrados en la plataforma, sus estados y accesos.
        </p>
      </div>
      
    
      {loading ? (
        <div className="text-center py-5 bg-white rounded shadow-sm border" style={{ borderColor: 'var(--color-border)' }}>
          <div className="spinner-border text-success" role="status"></div>
          <p className="mt-3 text-muted">Cargando usuarios...</p>
        </div>
      ) : usuarios.length === 0 ? (
        <div className="text-center py-5 bg-white rounded shadow-sm border" style={{ borderColor: 'var(--color-border)' }}>
          <i className="bi bi-people fs-1 text-muted"></i>
          <p className="mt-3 text-muted">No hay usuarios registrados todavía.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {usuarios.map((usuario) => (
            <div 
              key={usuario._id} 
              className="bg-white p-3 rounded shadow-sm d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3"
              style={{ border: '1px solid var(--color-border)' }}
            >
              
             
              <div className="d-flex align-items-center gap-3 w-100" style={{ maxWidth: '300px' }}>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 shadow-sm" 
                  style={{ width: '45px', height: '45px', backgroundColor: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}
                >
                  {usuario.username ? usuario.username.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="overflow-hidden">
                  <h6 className="mb-0 fw-bold text-truncate" style={{ color: 'var(--color-title)' }}>
                    {usuario.username || 'Sin nombre'}
                  </h6>
                  <small className="text-uppercase mt-1 d-block" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    {usuario.role === 'admin' || usuario.role === 'superadmin' ? (
                      <span className="text-dark fw-bold"><i className="bi bi-shield-lock text-warning"></i> ADMIN</span>
                    ) : (
                      <span className="text-muted">USUARIO</span>
                    )}
                  </small>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between w-100 mt-2 mt-md-0 gap-3" style={{ flex: 1 }}>
                
                <div>
                  {usuario.active !== false ? (
                    <span className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-2 rounded-pill">
                      Activo
                    </span>
                  ) : (
                    <span className="badge bg-danger bg-opacity-10 text-danger border border-danger px-3 py-2 rounded-pill">
                      Suspendido
                    </span>
                  )}
                </div>

               
                <div className="d-flex justify-content-end">
                  {usuario.active !== false ? (
                    <button 
                      onClick={() => cambiarEstado(usuario._id, true, usuario.username)}
                      className="btn btn-sm btn-outline-danger fw-medium px-3 d-flex align-items-center gap-2"
                    >
                      <i className="bi bi-person-x"></i> Suspender
                    </button>
                  ) : (
                    <button 
                      onClick={() => cambiarEstado(usuario._id, false, usuario.username)}
                      className="btn btn-sm btn-outline-success fw-medium px-3 d-flex align-items-center gap-2"
                    >
                      <i className="bi bi-person-check"></i> Activar
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};