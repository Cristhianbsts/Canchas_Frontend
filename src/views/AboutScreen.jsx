import cancha from "../assets/cancha.webp"
import 'font-awesome/css/font-awesome.min.css';
import "../css/about.css"

const AboutScreen = () => {
    return (
        <main>
            <section className="desc">
                <h1>El mejor complejo deportivo en Argentina</h1>
                <h3>Conócenos</h3>
                <p>Somos un equipo de cinco desarrolladores apasionados por la tecnología y el deporte, y creamos este sitio con un objetivo claro: facilitar la forma en que jugadores y equipos encuentran, reservan y disfrutan las canchas de fútbol de nuestro complejo. Creemos que el fútbol se vive mejor cuando todo es simple: elegir horario, organizar el partido y salir a jugar. Por eso diseñamos una plataforma moderna, rápida y fácil de usar, pensada tanto para quienes organizan partidos todas las semanas como para quienes solo quieren juntarse a jugar con amigos. Nuestro trabajo combina desarrollo, diseño y experiencia de usuario para ofrecer una herramienta práctica que acompañe la pasión por el fútbol.</p>
            </section>
            <section className="cont">
                <h2 className="etitle">Nuestro Equipo</h2>
                <div className="container">
                    <div className="img_container">
                        <div>
                            <img alt="Cristian Bustos" src={cancha} />
                        </div>
                        <h4>Cristian Bustos</h4>
                        <div className="ab-line"></div>
                        <div className="cont-icons">
                            <a href=""><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                            <a href=""><i class="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div className="img_container">
                        <div>
                            <img alt="Rubén Lopez" src={cancha} />
                        </div>
                        <h4>Rubén Lopez</h4>
                        <div className="ab-line"></div>
                        <div className="cont-icons">
                            <a href=""><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                            <a href=""><i class="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div className="img_container">
                        <div>
                            <img alt="Facundo Vera" src={cancha} />
                        </div>
                        <h4>Facundo Vera</h4>
                        <div className="ab-line"></div>
                        <div className="cont-icons">
                            <a href=""><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                            <a href=""><i class="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div className="img_container">
                        <div>
                            <img alt="Michael Medina" src={cancha} />
                        </div>
                        <h4>Michael Medina</h4>
                        <div className="ab-line"></div>
                        <div className="cont-icons">
                            <a href=""><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                            <a href=""><i class="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div className="img_container">
                        <div>
                            <img alt="Martín Mayol" src={cancha} />
                        </div>
                        <h4>Martín Mayol</h4>
                        <div className="ab-line"></div>
                        <div className="cont-icons">
                            <a href=""><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                            <a href=""><i class="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AboutScreen
