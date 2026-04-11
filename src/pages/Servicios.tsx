import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Handshake, Building2, FileText, Scale, Users, Shield,
  Briefcase, Home, Gavel, FileCheck, BookOpen, Globe,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const servicios = [
  { icon: Handshake, title: "Resolución de Conflictos", desc: "Mediación, arbitraje y litigio estratégico.", details: ["Mediación y conciliación", "Arbitraje comercial", "Litigio estratégico", "Negociación de acuerdos"] },
  { icon: Building2, title: "Derecho Corporativo", desc: "Constitución de sociedades, fusiones y adquisiciones.", details: ["Constitución de sociedades", "Fusiones y adquisiciones", "Asesoría fiscal corporativa", "Gobierno corporativo"] },
  { icon: FileText, title: "Contratos", desc: "Redacción, revisión y negociación de contratos.", details: ["Contratos comerciales", "Contratos de arrendamiento", "Contratos laborales", "Contratos internacionales"] },
  { icon: Scale, title: "Litigio Civil", desc: "Representación en procesos civiles y mercantiles.", details: ["Demandas civiles", "Cobros judiciales", "Procesos mercantiles", "Recursos de apelación"] },
  { icon: Users, title: "Derecho Laboral", desc: "Asesoría en relaciones laborales y despidos.", details: ["Despidos y liquidaciones", "Contratos de trabajo", "Prestaciones laborales", "Conflictos colectivos"] },
  { icon: Shield, title: "Derecho Penal", desc: "Defensa penal y querella criminal.", details: ["Defensa penal", "Querella criminal", "Medidas cautelares", "Recursos de amparo"] },
  { icon: Briefcase, title: "Propiedad Intelectual", desc: "Registro de marcas, patentes y derechos de autor.", details: ["Registro de marcas", "Patentes de invención", "Derechos de autor", "Protección de diseños"] },
  { icon: Home, title: "Derecho Inmobiliario", desc: "Compraventa, arrendamiento y regularización.", details: ["Compraventa de inmuebles", "Regularización de tierras", "Servidumbres y usufructos", "Desalojos"] },
  { icon: Gavel, title: "Derecho Notarial", desc: "Escrituras públicas, poderes y actas notariales.", details: ["Escrituras públicas", "Poderes notariales", "Actas de protocolización", "Testamentos notariales"] },
  { icon: FileCheck, title: "Derecho Administrativo", desc: "Trámites y recursos ante entidades gubernamentales.", details: ["Recursos administrativos", "Licitaciones públicas", "Permisos y licencias", "Impugnaciones"] },
  { icon: BookOpen, title: "Sucesiones", desc: "Testamentos, herencias y particiones.", details: ["Testamentos abiertos", "Declaratoria de herederos", "Partición de bienes", "Sucesiones intestadas"] },
  { icon: Globe, title: "Derecho Migratorio", desc: "Trámites migratorios y permisos de residencia.", details: ["Residencia temporal/permanente", "Permisos de trabajo", "Nacionalidad guatemalteca", "Recursos migratorios"] },
];

const Servicios = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Layout>
      <section className="bg-primary py-16 text-center">
        <h1 className="font-heading text-4xl text-primary-foreground italic font-bold">Nuestros Servicios</h1>
        <div className="gold-underline mt-2" />
        <p className="text-primary-foreground/80 mt-4">Más de 80 servicios legales especializados</p>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((s, i) => {
            const isExpanded = expanded === s.title;
            return (
              <AnimatedSection key={s.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ scale: isExpanded ? 1 : 1.03, y: isExpanded ? 0 : -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`bg-card border rounded-lg p-6 transition-all duration-300 cursor-pointer group ${
                    isExpanded ? "border-gold shadow-lg shadow-gold/10" : "border-border hover:border-gold hover:shadow-lg"
                  }`}
                  onClick={() => setExpanded(isExpanded ? null : s.title)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <s.icon className="text-gold group-hover:scale-110 transition-transform duration-300" size={40} />
                    <ChevronRight className={`text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-90 text-gold" : ""}`} size={20} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{s.desc}</p>
                  <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                    <ul className="space-y-1.5 pt-3 border-t border-border">
                      {s.details.map((d) => (
                        <li key={d} className="text-sm text-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link to="/contacto" className="btn-gold">Solicitar Consulta</Link>
        </AnimatedSection>
      </section>
    </Layout>
  );
};

export default Servicios;
