import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const CTASection = () => (
  <section className="section-padding bg-secondary">
    <div className="container mx-auto text-center">
      <AnimatedSection>
        <h2 className="font-heading text-3xl md:text-4xl text-foreground italic font-bold mb-4">
          ¿Necesita Asesoría Legal?
        </h2>
        <p className="text-muted-foreground mb-8">Contáctenos para una consulta inicial</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contacto" className="btn-gold">Consulta</Link>
          <a data-event="phone_click" href="tel:+50258997508" className="btn-outline-gold flex items-center justify-center gap-2">
            <Phone size={18} /> +502 5899 7508
          </a>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default CTASection;
