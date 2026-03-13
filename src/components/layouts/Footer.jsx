import mercadoPago from "../../assets/mercado-pago.webp"
import 'font-awesome/css/font-awesome.min.css';
import "../../css/footer.css"
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-cont">
                <div className="footer-item">
                    <h4 className="footer-h4 comp-name">Nombre del Complejo</h4>
                    <p className="footer-desc">Tu lugar ideal para jugar, entrenar y equparte con lo mejor. Todo lo que necesitan para tu pasión por el fútbol.</p>
                </div>
                <div className="footer-item">
                    <h4 className="footer-h4">Navegación</h4>
                    <nav className="footer-nav">
                        <ul className="footer-list">
                            <li className="footer-nav-item"><Link className="navigation" to="/">Inicio</Link></li>
                            <li className="footer-nav-item"><Link className="navigation" to="/books">Reservar Cancha</Link></li>
                            <li className="footer-nav-item"><Link className="navigation" to="/products">Tienda Online</Link></li>
                            <li className="footer-nav-item"><Link className="navigation" to="/about">Sobre Nosotros</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="footer-item">
                    <h4 className="footer-h4">Soporte</h4>
                    <nav className="footer-nav">
                        <ul className="footer-list">
                            <li><Link className="navigation" to="/error">Términos y condiciones</Link></li>
                            <li><Link className="navigation" to="/contact">Contácto</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="footer-item">
                    <h4 className="footer-h4">Redes Sociales</h4>
                    <ul className="footer-list">
                        <li><a className="navigation" target="_blank" href="https://www.instagram.com/">Instagram</a></li>
                        <li><a className="navigation" target="_blank" href="https://www.facebook.com/">Facebook</a></li>
                        <li><a className="navigation" target="_blank" href="https://x.com/">Twitter</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-end">
                <div><p className="copyright">© 2026 Nombre del Complejo. Todos los derechos reservados.</p></div>
                <div>
                    <img className="mp-logo" src={mercadoPago} alt="Logo de Mercado Pago"/>
                </div>
            </div>
        </footer>
    )
}

export default Footer
