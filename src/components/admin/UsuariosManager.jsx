export const UsuariosManager = () => {
  return (
    <div>
      <h2 style={{ color: 'var(--color-title)', fontWeight: 'var(--font-weight-title)' }}>
        Gestión de canchas
      </h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>Administra los espacios, precios y disponibilidad.</p>
      
      {/* Acá luego pondremos el fetch al backend y la tabla/tarjetas */}
      <div className="p-5 text-center bg-light rounded border">
        <h4>Aquí irán las tarjetas del CRUD de los Usuarios</h4>
      </div>
    </div>
  );
};