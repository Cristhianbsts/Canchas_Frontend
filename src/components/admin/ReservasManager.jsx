export const ReservasManager = () => {
  return (
    <div>
      <h2 style={{ color: 'var(--color-title)', fontWeight: 'var(--font-weight-title)' }}>
        Gestión de las reservas
      </h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>Administra los horarios y disponibilidad.</p>
      
      <div className="p-5 text-center bg-light rounded border">
        <h4>Aquí irán las tarjetas del CRUD de las reservas</h4>
      </div>
    </div>
  );
};