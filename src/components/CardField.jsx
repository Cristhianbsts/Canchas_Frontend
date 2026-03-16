import "../css/cardfield.css";

const CardField = ({ court, openModal }) => {
  const {name,pricePerHour,image ,active,id} =court
  return (
    <section className="col-12 col-md-6 col-lg-4 mb-4 ">
      <div className="card court-card shadow-sm">
        <div className="position-relative">
          <img src={image} className="card-img-top" alt={name} />

           {active ? (
            <span className="badge-available text-success border border-success px-3 py-2 rounded-pill">
               Disponible
            </span>
          ) : (
            <span className="badge-available text-danger border border-danger px-3 py-2 rounded-pill">
              No disponible
            </span>
          )}
        </div>

        <div className="card-body">
          <h5 className="court-title">{name}</h5>

          <div className="d-flex gap-2 flex-wrap mb-3">
            <span className=" badge-tag">Futbol 5</span>
            <span className=" badge-tag">Césped Sintético</span>
            <span className=" badge-tag">Al arie libre</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="price">${pricePerHour}</h4>
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
