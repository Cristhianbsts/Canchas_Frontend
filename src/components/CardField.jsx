import "../css/cardfield.css";

const CardField = ({ court, openModal }) => {
  if (!court) return null;

  const {
    name = "Cancha",
    pricePerHour = 0,
    image,
    active = false,
  } = court;

  const imageDefault =
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200";

  const buildImage = (img) => {
    if (!img || img.trim() === "") return imageDefault;

    if (img.startsWith("http://") || img.startsWith("https://")) {
      return img;
    }

    return `http://localhost:3002${img.startsWith("/") ? img : `/${img}`}`;
  };

  const imageSrc = buildImage(image);

  return (
    <section className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card court-card shadow-sm h-100">
        <div className="position-relative">
          <img src={imageSrc} className="card-img-top" alt={name} />

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
            <span className="badge-tag">Fútbol 5</span>
            <span className="badge-tag">Césped sintético</span>
            <span className="badge-tag">Al aire libre</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="price">${Number(pricePerHour).toLocaleString("es-AR")}</h4>
              <small className="text-muted">por hora</small>
            </div>

            <button
              className="btn-reserve"
              onClick={openModal}
              disabled={!active}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardField;