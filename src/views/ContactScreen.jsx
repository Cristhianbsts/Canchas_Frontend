import "../css/contact.css";
import "font-awesome/css/font-awesome.min.css";

const ContactScreen = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const URL_API = API_URL ? `${API_URL}/contact` : "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!API_URL) {
            alert("La URL de la API no está configurada.");
            console.error("VITE_API_URL es undefined");
            return;
        }

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(URL_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const text = await response.text();
            const result = text ? JSON.parse(text) : {};

            if (!response.ok) {
                console.log("Error del backend:", result);
                alert(result.message || "Ocurrió un error al enviar el mensaje.");
                return;
            }

            alert("¡Mensaje enviado con éxito!");
            e.target.reset();
        } catch (error) {
            console.error("Error de red:", error);
            alert("No se pudo conectar con el servidor.");
        }
    };

    return (
        <main className="contact-main">
            <section className="container1">
                <h1>Contacto</h1>
                <p className="description">
                    ¿Tienes dudas, consultas o quieres comunicarte con nosotros? ¡Contáctanos!
                </p>
            </section>

            <section id="secform">
                <h2 className="talk">Hablemos</h2>

                <div className="contact_info">
                    <p><strong>Teléfono:</strong> +54 3519999999</p>
                    <p><strong>Email:</strong> futbolreservas5@gmail.com</p>
                    <p><strong>Dirección:</strong> Gral. José María Paz 576</p>
                </div>

                <h3 className="send-msg">Envíenos un Mensaje</h3>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-div">
                        <label className="label" htmlFor="nombre">Nombre *</label>
                        <input
                            className="cont-input"
                            placeholder="Nombre Completo"
                            type="text"
                            id="nombre"
                            name="nombre"
                            required
                        />
                    </div>

                    <div className="form-div">
                        <label className="label" htmlFor="email">Email *</label>
                        <input
                            className="cont-input"
                            placeholder="example@gmail.com"
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>

                    <div className="form-div">
                        <label className="label" htmlFor="telefono">Teléfono</label>
                        <input
                            className="cont-input"
                            placeholder="+54 9 3519999999"
                            type="tel"
                            id="telefono"
                            name="telefono"
                        />
                    </div>

                    <div className="form-div" id="msg">
                        <label className="label" htmlFor="mensaje">Mensaje *</label>
                        <textarea
                            className="cont-textarea"
                            placeholder="¡Buenas! Quería saber más sobre..."
                            id="mensaje"
                            name="mensaje"
                            required
                        ></textarea>
                    </div>

                    <button className="smt" type="submit">
                        Enviar mensaje <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    </button>
                </form>
            </section>
        </main>
    );
};

export default ContactScreen;