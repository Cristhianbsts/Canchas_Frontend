import "../css/contact.css"

const ContactScreen = () => {
    return (
        <main>
            <section className="container1">
                <h1>Contacto</h1>
                <p className="description">¿Tienes dudas, consultas o quieres comunicarte con nosotros? ¡Contáctanos!</p>
            </section>
            <section id="secform">
                <h2>Hablemos</h2>
                <div className="contact_info">
                    <p><strong>Teléfono:</strong> +54 3519999999</p>
                    <p><strong>Email:</strong> lospiratasdev@gmail.com</p>
                    <p><strong>Dirección:</strong> Gral. José María Paz 576</p>
                </div>
                <h3>Envíenos un Mensaje</h3>
                <form action="/enviar-contacto" method="POST">
                    <div>
                        <label for="nombre">Nombre *</label>
                        <input type="text" id="nombre" name="nombre" required />
                    </div>

                    <div>
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div>
                        <label for="telefono">Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" />
                    </div>

                    <div id="msg">
                        <label for="mensaje">Mensaje *</label>
                        <textarea id="mensaje" name="mensaje" required></textarea>
                    </div>

                    <button type="submit">Enviar mensaje</button>
                </form>

                <div className="map">
                    <h4>¡Encuéntanos en nuestras oficinas!</h4>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.105917472264!2d-65.20974192440858!3d-26.83658327669264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1773194088692!5m2!1ses-419!2sar" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>
        </main>
    )
}

export default ContactScreen
