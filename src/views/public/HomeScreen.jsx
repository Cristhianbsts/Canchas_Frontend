import "../../css/home.css"
import 'font-awesome/css/font-awesome.min.css';
import estadioImg from "../../assets/estadio.webp"
import principalImg from "../../assets/principal-img.webp"
import ducha from "../../assets/ducha.webp"
import refresco from "../../assets/refresco.webp"

const HomeScreen = () => {
    return (
        <main>
            <section className="card-futbol">
                <div className="zoom-container">
                    <img src={principalImg} alt="Canchas de Futbol 5" className="zoom-image"/>
                    <h1 className="image-title">Canchas Futbol - 5</h1>
                </div>
                <div className="info-content">
                    <div className="tag"><i className="fa fa-calendar-o" aria-hidden="true"></i> Reserva en segundos</div>
                    <h2 className="main-title">Tu proximo partido ya tiene cancha.</h2>
                    <p className="slogan">El complejo elegido por los verdaderos jugadores.</p>
                    <div className="imgs-cont">
                        <div className="personal-cont large">
                            <img className="images" src={principalImg} alt="Imágenes del complejo"/>
                        </div>
                        <div className="personal-cont small">
                            <img className="images" src={principalImg} alt="Imágenes del complejo"/>
                        </div>
                        <div className="personal-cont samll">
                            <img className="images" src={principalImg} alt="Imágenes del complejo"/>
                        </div>
                    </div>
                    <button className="availability-btn">
                        Ver disponibilidad <i className="fa fa-calendar-o" aria-hidden="true"></i>
                    </button>
                </div>
            </section>
            <section className="about-complex">
                <div>
                    <h3>Sobre el complejo</h3>
                    <p>Todo lo que necesitas saber para jugar cómodo y seguro</p>
                    <div className="features-list">
                        <div className="feature-item">
                            <div className="icon-circle">
                                <img src={estadioImg} alt="Icono"/>
                            </div>
                            <div className="text-content">
                                <h3>Césped de última generación</h3>
                                <p>Canchas con drenaje y mantenimiento diario.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="icon-circle">
                                <img src={ducha} alt="Icono"/>
                            </div>
                            <div className="text-content">
                                <h3>Vestuarios equipados</h3>
                                <p>Duchas calientes y lockers.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="icon-circle">
                                <img src={refresco} alt="Icono"/>
                            </div>
                            <div className="text-content">
                                <h3>Bar y sector social</h3>
                                <p>Snacks, bebidas y pantallas para ver partidos.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map-cont">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.105917472264!2d-65.20974192440858!3d-26.83658327669264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1772907113097!5m2!1ses-419!2sar" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>
            <section className="market">
                <h2>Productos Sugeridos</h2>
                <p>Equipate antes de entrar a la cancha</p>
                <button className="availability-btn">
                        Ver más productos <i className="fa fa-calendar-o" aria-hidden="true"></i>
                    </button>
            </section>
        </main>
    )
}

export default HomeScreen
