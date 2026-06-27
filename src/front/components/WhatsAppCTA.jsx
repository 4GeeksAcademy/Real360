const telefono = "51999999999";
const mensaje = encodeURIComponent(
  "Hola, deseo obtener información sobre REAL 360."
);

export const WhatsAppCTA = () => {
  return (
    <section className="container my-5">
      <div className="whatsapp-cta">
        <div className="cta-info">
          <div className="cta-icon">
            <i className="fa-brands fa-whatsapp"></i>
          </div>

          <div>
            <h5>Escríbenos por WhatsApp</h5>
            <h2>+51 999 999 999</h2>
          </div>
        </div>

        <a
          href={`https://wa.me/${telefono}?text=${mensaje}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg"
        >
          <i className="fa-brands fa-whatsapp me-2"></i>
          Chatear por WhatsApp
        </a>

      </div>
    </section>
  );
};