import cespedcancha from "../assets/cespedcancha.webp";
import "../css/herofield.css";
import Counter from "./Counter";

const HeroField = () => {
  return (
    <section className="hero-field text-white position-relative">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${cespedcancha})` }}
      ></div>

      <div className="hero-overlay"></div>

      <div className="container  h-100 d-flex flex-column justify-content-between py-5 position-relative">
        <div className="row">
          <div className="col-12 col-lg-8">
            <h1 className="hero-title">
              Reservá online y asegurá tu horario con tus amigos.
            </h1>

            <p className="hero-description">
              Elegí cancha, fecha y horario en segundos. Mirá la disponibilidad
              en tiempo real y encontrá el lugar ideal para jugar sin vueltas.
            </p>
          </div>
        </div>

        <div className="row g-3 align-items-end">
          <div className="col-12">
            <div className="d-flex flex-wrap gap-2">
              <span className="hero-badge text-success border border-success px-3 py-2 rounded-pill">
                {" "}
                Abierto 19:00 a 00:00{" "}
              </span>{" "}
              <span className="hero-badge text-success border border-success px-3 py-2 rounded-pill">
                {" "}
                Estacionamiento - Parrilla - Vestuarios{" "}
              </span>
            </div>
          </div>

          <div className="col-12">
            <div className="row g-3">
              <div className="col-6 col-md-4 col-lg-3">
                <div className="stat-card h-100">
                  <h3>
                    {" "}
                    <Counter end={10} />
                  </h3>
                  <p>Canchas disponibles</p>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3">
                <div className="stat-card h-100">
                  <h3>
                    {" "}
                    +<Counter end={250} />
                  </h3>
                  <p>Partidos por semana</p>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-3 stat-last">
                <div className="stat-card h-100">
                  <h3>
                    <Counter end={4.9} decimals={1} />
                    /5
                  </h3>
                  <p>Calificación de jugadores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroField;
