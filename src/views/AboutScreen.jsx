
import facu from "../assets/facu.webp"
import ruben from "../assets/ruben.webp"
import michael from "../assets/michael.webp"
import cristian from "../assets/cristian.webp"
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
                            <img className="our-imgs" alt="Cristian Bustos" src={cristian} />
                        </div>
                        <h4>Cristian Bustos</h4>
                        <div className="ab-line"></div>
                        <div className="cont-icons">
                            <a target="_blank" href="https://www.linkedin.com/in/cristian-miguel-bustos-a8019426a"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                            <a target="_blank" href="https://github.com/Cristhianbsts"><i class="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div className="img_container">
                        <div>
                            <img className="our-imgs" alt="Rubén Lopez" src={ruben} />
                        </div>
                        <h4>Rubén Lopez</h4>
                        <div className="ab-line"></div>
                        <div className="cont-icons">
                            <a target="_blank" href="https://www.linkedin.com/in/ruben-lopez-a3006120a/"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                            <a target="_blank" href="https://github.com/rubendevlop"><i class="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div className="img_container">
                        <div>
                            <img className="our-imgs" alt="Facundo Vera" src={facu} />
                        </div>
                        <h4>Facundo Vera</h4>
                        <div className="ab-line"></div>
                        <div className="cont-icons">
                            <a target="_blank" href="https://www.linkedin.com/in/facundo-vera-175101378/"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                            <a target="_blank" href="https://github.com/Facundo-Vera"><i class="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div className="img_container">
                        <div>
                            <img className="our-imgs" alt="Michael Medina" src={michael} />
                        </div>
                        <h4>Michael Medina</h4>
                        <div className="ab-line"></div>
                        <div className="cont-icons">
                            <a target="_blank" href="https://www.linkedin.com/in/michael-rony-medina-velasco-832b42382"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                            <a target="_blank" href="https://github.com/Michael110908"><i class="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div className="img_container">
                        <div>
                            <img className="our-imgs" alt="Martín Mayol" src="https://s2.ppllstatics.com/mujerhoy/www/multimedia/202502/11/media/cortadas/zuckeberg1-k7bF-U230828106152o7E-1248x1248@MujerHoy.jpg" />
                        </div>
                        <h4>Martín Mayol</h4>
                        <div className="ab-line"></div>
                        <div className="cont-icons">
                            <a target="_blank" href=""><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                            <a target="_blank" href="https://github.com/Nitram135"><i class="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AboutScreen
