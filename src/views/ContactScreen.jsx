import "../css/contact.css"
import 'font-awesome/css/font-awesome.min.css';

const ContactScreen = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!response.ok) {
                console.log("Errores de validación:", result.errores);
                alert(result.errores.map(err => err.msg).join("\n"));
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
                <p className="description">¿Tienes dudas, consultas o quieres comunicarte con nosotros? ¡Contáctanos!</p>
            </section>
            <section id="secform">
                <h2 className="talk">Hablemos</h2>
                <div className="contact_info">
                    <p><strong>Teléfono:</strong> +54 3519999999</p>
                    <p><strong>Email:</strong> futbolreservas5@gmail.com</p>
                    <p><strong>Dirección:</strong> Gral. José María Paz 576</p>
                </div>
                <h3 className="send-msg">Envíenos un Mensaje</h3>
                <form className="contact-form" onSubmit={handleSubmit} action={`${import.meta.env.VITE_API_URL}/contact`} method="POST">
                    <div className="form-div">
                        <label className="label" for="nombre">Nombre *</label>
                        <input className="cont-input" placeholder="Nombre Completo" type="text" id="nombre" name="nombre" required />
                    </div>

                    <div className="form-div">
                        <label className="label" for="email">Email *</label>
                        <input className="cont-input" placeholder="example@gmail.com" type="email" id="email" name="email" required />
                    </div>

                    <div className="form-div">
                        <label className="label" for="telefono">Teléfono</label>
                        <input className="cont-input" placeholder="+54 9 3519999999" type="tel" id="telefono" name="telefono" />
                    </div>

                    <div className="form-div" id="msg">
                        <label className="label" for="mensaje">Mensaje *</label>
                        <textarea className="cont-textarea" placeholder="¡Buenas! Quería saber más sobre..." id="mensaje" name="mensaje" required></textarea>
                    </div>

                    <button className="smt" type="submit">Enviar mensaje <i class="fa fa-envelope-o" aria-hidden="true"></i></button>
                </form>

                <div className="map">
                    <h4>¡Ven a las mejores canchas del país!</h4>
                    <iframe className="iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.105917472264!2d-65.20974192440858!3d-26.83658327669264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1773194088692!5m2!1ses-419!2sar" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>
        </main>
    )
}

export default ContactScreen