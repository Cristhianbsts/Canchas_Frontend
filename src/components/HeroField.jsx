import cespedcancha from "../assets/cespedcancha.webp";
import "../css/herofield.css";

const HeroField = () => {
  return (
    <section
      className="hero-field  d-flex justify-content-center text-white position-relative"
      style={{ backgroundImage: `url(${cespedcancha})`, 
    zIndex:`-10`}}
    >
      <h1 className="hero-title text-center mt-3">Canchas Futbol - 5</h1>

      <div className="position-absolute bottom-0 start-0 px-3 py-5 d-flex flex-column gap-2">
        <span className="hero-badge rounded-pill px-3 align-self-start">
          Abierto 19:00 a 00:00
        </span>

        <span className="hero-badge rounded-pill px-3 align-self-start">
          Estacionamiento - Parrilla - Vestuarios
        </span>
      </div>
    </section>
  );
};

export default HeroField;

