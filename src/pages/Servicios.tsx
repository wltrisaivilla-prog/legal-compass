import Layout from "@/components/Layout";
import {
  Handshake, Building2, FileText, Scale, Users, Shield,
  Briefcase, Home, Gavel, FileCheck, BookOpen, Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const servicios = [
  { icon: Handshake, title: "Resolución de Conflictos", desc: "Mediación, arbitraje y litigio estratégico." },
  { icon: Building2, title: "Derecho Corporativo", desc: "Constitución de sociedades, fusiones y adquisiciones." },
  { icon: FileText, title: "Contratos", desc: "Redacción, revisión y negociación de contratos." },
  { icon: Scale, title: "Litigio Civil", desc: "Representación en procesos civiles y mercantiles." },
  { icon: Users, title: "Derecho Laboral", desc: "Asesoría en relaciones laborales y despidos." },
  { icon: Shield, title: "Derecho Penal", desc: "Defensa penal y querella criminal." },
  { icon: Briefcase, title: "Propiedad Intelectual", desc: "Registro de marcas, patentes y derechos de autor." },
  { icon: Home, title: "Derecho Inmobiliario", desc: "Compraventa, arrendamiento y regularización." },
  { icon: Gavel, title: "Derecho Notarial", desc: "Escrituras públicas, poderes y actas notariales." },
  { icon: FileCheck, title: "Derecho Administrativo", desc: "Trámites y recursos ante entidades gubernamentales." },
  { icon: BookOpen, title: "Sucesiones", desc: "Testamentos, herencias y particiones." },
  { icon: Globe, title: "Derecho Migratorio", desc: "Trámites migratorios y permisos de residencia." },
];

const Servicios = () => {
  return (
    <Layout>
      <section className="bg-primary py-16 text-center">
        <h1 className="font-heading text-4xl text-primary-foreground italic font-bold">
          Nuestros Servicios
        </h1>
        <div className="gold-underline mt-2" />
        <p className="text-primary-foreground/80 mt-4">
          Más de 80 servicios legales especializados
        </p>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((s) => (
            <div
              key={s.title}
              className="bg-card border border-border rounded-lg p-6 hover:border-gold hover:shadow-lg transition-all group"
            >
              <s.icon className="text-gold mb-4 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/contacto" className="btn-gold">
            Solicitar Consulta
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Servicios;
