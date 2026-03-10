import logo from "../../assets/cancha.webp"
import 'font-awesome/css/font-awesome.min.css';
import "../../css/footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-item">
                <h4>Redes Sociales</h4>
                <ul className="footer-social-list">
                    <li><a target="_blank" href="https://www.instagram.com"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                    <li><a target="_blank" href="https://www.facebook.com"><i class="fa fa-facebook-official" aria-hidden="true"></i></a></li>
                    <li><a target="_blank" href=""><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                </ul>
            </div>
            <div className="footer-item">
                <div className="footer-img-cont">
                    <img src={logo} alt="Logo del complejo" />
                </div>
            </div>
            <div className="footer-item">
                <h4>Otras secciones</h4>
                <nav className="footer-nav">
                    <ul>
                        <li>Sobre Nosotros</li>
                        <li>Contacto</li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
