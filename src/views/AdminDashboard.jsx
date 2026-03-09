import { useState } from 'react';
import { CanchasManager } from '../components/admin/CanchasManager';
import { UsuariosManager } from '../components/admin/UsuariosManager';
import { ReservasManager } from '../components/admin/ReservasManager';
import { TiendaManager } from '../components/admin/TiendaManager';

export const AdminDashboard = () => {
  const [vistaActiva, setVistaActiva] = useState('canchas');

  const renderizarVista = () => {
    switch (vistaActiva) {
      case 'canchas': return <CanchasManager />;
      case 'usuarios': return <UsuariosManager />;
      case 'reservas': return <ReservasManager />;
      case 'tienda': return <TiendaManager />;
      default: return <CanchasManager />;
    }
  };

  const obtenerEstiloBoton = (vista) => {
    if (vistaActiva === vista) {
      return { backgroundColor: 'var(--color-primary)', color: 'var(--color-card)', border: 'none' };
    }
    return { backgroundColor: 'transparent', color: 'var(--color-text-secondary)', border: 'none' };
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      
      {/* ================= HEADER / NAVBAR RESPONSIVE ================= */}
      <header 
        className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3 shadow-sm gap-3" 
        style={{ backgroundColor: 'var(--color-card)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="d-flex align-items-center justify-content-between w-100" style={{ maxWidth: '100%' }}>
          {/* Logo y Nombre */}
          <div className="d-flex align-items-center gap-3">
            <div 
              className="rounded-circle" 
              style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-primary)', minWidth: '40px' }}
            ></div>
            <span className="fs-5 text-truncate" style={{ color: 'var(--color-title)', fontWeight: 'var(--font-weight-title)', maxWidth: '200px' }}>
              Nombre complejo
            </span>
          </div>

          {/* Botón Volver (En celu es solo el ícono) */}
          <a href="/" className="text-decoration-none d-md-none d-flex align-items-center" style={{ color: 'var(--color-text-secondary)' }}>
            <i className="bi bi-box-arrow-up-left fs-4"></i>
          </a>
          
          {/* Botón Volver (En PC se ve normal con texto) */}
          <a href="/" className="text-decoration-none d-none d-md-flex align-items-center gap-1 me-4" style={{ color: 'var(--color-text-secondary)' }}>
            <i className="bi bi-box-arrow-up-left"></i> Volver a la web
          </a>
        </div>
        
        {/* Buscador (Ahora ocupa todo el ancho disponible limpio) */}
        <div className="input-group w-100" style={{ maxWidth: '350px' }}>
          <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: 'var(--color-border)' }}>
            <i className="bi bi-search" style={{ color: 'var(--color-text-secondary)' }}></i>
          </span>
          <input 
            type="text" 
            className="form-control border-start-0 ps-0 shadow-none" 
            placeholder="Buscar reservas, usuarios..." 
            style={{ borderColor: 'var(--color-border)' }} 
          />
        </div>
      </header>

      {/* ================= CONTENEDOR INFERIOR ================= */}
      <div className="d-flex flex-column flex-md-row flex-grow-1 overflow-hidden">
        
        {/* ================= SIDEBAR ================= */}
        <aside 
          className="sidebar-admin d-flex flex-row flex-md-column p-2 p-md-3 overflow-x-auto" 
          style={{ backgroundColor: 'var(--color-navbar)' }}
        >
          <ul className="nav nav-pills flex-row flex-md-column mb-0 mb-md-auto gap-2 flex-nowrap w-100">
            
            <li className="nav-item flex-shrink-0">
              <button 
                onClick={() => setVistaActiva('canchas')}
                className={`nav-link w-100 text-start d-flex align-items-center gap-2 ${vistaActiva === 'canchas' ? 'shadow-sm active' : ''}`} 
                style={obtenerEstiloBoton('canchas')}
              >
                <i className="bi bi-grid-fill"></i> <span className="d-none d-sm-inline">Gestion de canchas</span><span className="d-inline d-sm-none">Canchas</span>
              </button>
            </li>

            <li className="nav-item flex-shrink-0">
              <button 
                onClick={() => setVistaActiva('reservas')}
                className={`nav-link w-100 text-start d-flex align-items-center gap-2 ${vistaActiva === 'reservas' ? 'shadow-sm active' : ''}`} 
                style={obtenerEstiloBoton('reservas')}
              >
                <i className="bi bi-calendar"></i> Reservas
              </button>
            </li>

            <li className="nav-item flex-shrink-0">
              <button 
                onClick={() => setVistaActiva('usuarios')}
                className={`nav-link w-100 text-start d-flex align-items-center gap-2 ${vistaActiva === 'usuarios' ? 'shadow-sm active' : ''}`} 
                style={obtenerEstiloBoton('usuarios')}
              >
                <i className="bi bi-person"></i> Usuarios
              </button>
            </li>

            <li className="nav-item flex-shrink-0 pe-3">
              <button 
                onClick={() => setVistaActiva('tienda')}
                className={`nav-link w-100 text-start d-flex align-items-center gap-2 ${vistaActiva === 'tienda' ? 'shadow-sm active' : ''}`} 
                style={obtenerEstiloBoton('tienda')}
              >
                <i className="bi bi-shop"></i> Tienda
              </button>
            </li>

          </ul>
          
          {/* Cerrar sesión en PC se ve abajo del todo del menú lateral */}
          <div className="mt-auto border-top pt-3 d-none d-md-block" style={{ borderColor: 'var(--color-border)' }}>
            <button className="nav-link w-100 text-start text-danger d-flex align-items-center gap-2 fw-medium" style={{ backgroundColor: 'transparent', border: 'none' }}>
              <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* ================= CONTENIDO PRINCIPAL ================= */}
        <main className="p-3 p-md-5 flex-grow-1 overflow-auto" style={{ backgroundColor: 'var(--color-card)' }}>
          {renderizarVista()}
        </main>
        
      </div>

      {/* ================= FOOTER MÓVIL (Botón de Cerrar Sesión) ================= */}
      {/* Esto solo aparece en pantallas chicas (celulares) y se queda pegado abajo */}
      <div className="d-md-none p-3 border-top mt-auto shadow-sm" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 fw-medium">
          <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
        </button>
      </div>

    </div>
  );
};