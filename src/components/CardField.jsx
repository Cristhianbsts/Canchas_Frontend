import "../css/cardfield.css";

const CardField = ({ court, openModal }) => {
  return (
    <section className="col-12 col-md-6 col-lg-4 mb-4 ">
      <div className="card court-card shadow-sm">
        <div className="position-relative">
          <img src={court.image} className="card-img-top" alt={court.name} />

          <span className="badge-available text-success border border-success px-3 py-2 rounded-pill">
            Turnos disponibles
          </span>
        </div>

        <div className="card-body">
          <h5 className="court-title">Cancha 1 - Techada</h5>

          <div className="d-flex gap-2 flex-wrap mb-3">
            <span className=" badge-tag">Futbol 5</span>
            <span className=" badge-tag">Césped Sintético</span>
            <span className=" badge-tag">Techada</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="price">$22.000</h4>
              <small className="text-muted">por hora</small>
            </div>

            <button className="btn-reserve" onClick={openModal}>
              Reservar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardField;
