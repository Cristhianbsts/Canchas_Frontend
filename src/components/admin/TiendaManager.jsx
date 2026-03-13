export const TiendaManager = () => {
  return (
    <div>
      <h2 style={{ color: 'var(--color-title)', fontWeight: 'var(--font-weight-title)' }}>
        Gestión de los productos
      </h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>Administra los productos, precios y disponibilidad.</p>
      
      <div className="p-5 text-center bg-light rounded border">
        <h4>Aquí irán las tarjetas del CRUD de la tienda</h4>
      </div>
    </div>
  );
};