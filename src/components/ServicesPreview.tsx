import { Handshake, Building2, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const services = [
  { icon: Handshake, title: "Resolución de Conflictos", description: "Mediación, arbitraje y litigio estratégico para resolver disputas de manera efectiva.", link: "/servicios" },
  { icon: Building2, title: "Derecho Corporativo", description: "Asesoría legal integral para empresas de todos los tamaños y sectores.", link: "/servicios" },
  { icon: FileText, title: "Documentos Legales", description: "Plantillas profesionales listas para usar con vista previa incluida.", link: "/documentos" },
];

const ServicesPreview = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto text-center">
      <AnimatedSection>
        <h2 className="font-heading text-3xl md:text-4xl text-foreground italic font-bold">Servicios Destacados</h2>
        <div className="gold-underline mb-2" />
        <p className="text-muted-foreground mt-4 mb-12">Soluciones legales especializadas para sus necesidades</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <AnimatedSection key={service.title} delay={i * 0.15}>
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-card border-t-4 border-gold rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow"
            >
              <service.icon className="mx-auto mb-4 text-gold" size={48} />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-6">{service.description}</p>
              <Link to={service.link} className="btn-gold text-sm">Saber Más</Link>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesPreview;
