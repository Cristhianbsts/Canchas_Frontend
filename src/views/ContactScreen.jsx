import { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../css/contact.css";
import { sendContactMessage } from "../helpers/contact";

const ContactScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    setIsSubmitting(true);

    try {
      const response = await sendContactMessage(data);

      if (!response.success) {
        const errorMessage = response.errors?.length
          ? response.errors.map((err) => err.msg).join("\n")
          : response.message || "Error al enviar el mensaje";

        alert(errorMessage);
        return;
      }

      alert(response.message || "Mensaje enviado con exito");
      form.reset();
    } catch (error) {
      alert(error.message || "No se pudo enviar el mensaje");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-main">
      <section className="container1">
        <h1>Contacto</h1>
        <p className="description">
          Tienes dudas, consultas o quieres comunicarte con nosotros? Contactanos.
        </p>
      </section>

      <section id="secform">
        <h2 className="talk">Hablemos</h2>

        <div className="contact_info">
          <p><strong>Telefono:</strong> +54 3519999999</p>
          <p><strong>Email:</strong> futbolreservas5@gmail.com</p>
          <p><strong>Direccion:</strong> Gral. Jose Maria Paz 576</p>
        </div>

        <h3 className="send-msg">Envienos un mensaje</h3>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-div">
            <label className="label" htmlFor="nombre">Nombre *</label>
            <input
              className="cont-input"
              placeholder="Nombre completo"
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
            <label className="label" htmlFor="telefono">Telefono</label>
            <input
              className="cont-input"
              placeholder="5493519999999"
              type="tel"
              id="telefono"
              name="telefono"
            />
          </div>

          <div className="form-div" id="msg">
            <label className="label" htmlFor="mensaje">Mensaje *</label>
            <textarea
              className="cont-textarea"
              placeholder="Buenas! Queria saber mas sobre..."
              id="mensaje"
              name="mensaje"
              required
            ></textarea>
          </div>

          <button className="smt" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}{" "}
            <i className="fa fa-envelope-o" aria-hidden="true"></i>
          </button>
        </form>

        <div className="map">
          <h4>Veni a las mejores canchas del pais!</h4>
          <iframe
            className="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.105917472264!2d-65.20974192440858!3d-26.83658327669264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1773194088692!5m2!1ses-419!2sar"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default ContactScreen;
