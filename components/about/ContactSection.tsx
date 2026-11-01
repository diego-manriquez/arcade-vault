import { Reveal } from "@/components/home/Reveal";
import { ContactForm } from "./ContactForm";

const TIPS = [
  { text: "RESPUESTA EN 24-48H", led: "" },
  { text: "SUGERENCIAS BIENVENIDAS", led: " y" },
  { text: "SIN SPAM, JAMÁS", led: " m" },
];

export function ContactSection() {
  return (
    <Reveal className="about-contact">
      <div className="contact-grid">
        <div className="contact-intro">
          <div className="kicker pixel neon-cyan">▸ CONTACTO</div>
          <h2 className="contact-title">CONTÁCTANOS</h2>
          <p className="contact-sub">
            ¿Tienes alguna sugerencia, quieres proponer un juego, o simplemente quieres saludar?
            Escríbenos.
          </p>
          <div className="contact-tips">
            {TIPS.map((t) => (
              <div key={t.text} className="tip">
                <span className={"tip-led" + t.led} aria-hidden="true" />
                {t.text}
              </div>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </Reveal>
  );
}
