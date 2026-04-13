import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Building2, FileText, Home, Shield, Gavel, Users,
  Briefcase, Car, ChevronDown, MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "50258997508";

const categorias = [
  {
    icon: Building2,
    title: "Materia Mercantil",
    servicios: [
      "Constitución de sociedades",
      "Modificaciones y ampliaciones",
      "Empresas mercantiles",
      "Celebración de Asambleas Ordinarias",
      "Celebración de Asambleas Extraordinarias",
      "Punto resolutivo (Punto de actas)",
      "Títulos de acciones",
      "Actas Notariales de nombramiento (Auxiliares de comercio)",
      "Certificaciones",
      "Cambio de dirección",
    ],
  },
  {
    icon: Gavel,
    title: "Actos Notariales",
    servicios: [
      "Actas notariales de requerimiento",
      "Actas notariales de legalización de firmas",
      "Actas notariales de legalización de documentos",
      "Liquidación total o parcial de patrimonio conyugal",
      "Celebraciones de matrimonios nacionales",
      "Celebraciones de matrimonios (Extranjeros) Mixtos",
      "Rescisiones",
      "Ampliaciones",
      "Carta poder",
      "Finiquitos",
      "Mandatos generales, especiales, judiciales",
      "Contratos de arrendamiento",
    ],
  },
  {
    icon: Home,
    title: "Bienes Raíces",
    servicios: [
      "Contratos de compraventa",
      "Contratos de compraventa de propiedad de inmuebles",
      "Contratos de partición",
      "División de la cosa común",
      "Unificación de propiedades",
      "Constitución de Usufructo",
      "Carta Total de Pago",
      "Concesión de Minas",
      "Declaración Jurada de cambio de ubicación inmuebles",
      "Declaración jurada de derechos posesorios",
      "Cesión de derechos posesorios",
      "Mutuo con garantía hipotecaria",
      "Cancelación de hipotecas por prescripción",
      "Inmovilización de propiedades",
      "Permutas",
      "Contrato de comodato",
    ],
  },
  {
    icon: Shield,
    title: "Materia Penal",
    servicios: [
      "Asistencia en hechos de tránsito",
      "Conciliaciones ante el Ministerio Público",
      "Procesos Penales",
      "Violencia contra la mujer",
      "Negación de asistencia económica",
    ],
  },
  {
    icon: FileText,
    title: "Documentos Provenientes del Extranjero",
    servicios: [
      "Apostillas",
      "Mandatos generales, especiales, judiciales ETC",
      "Nacionalización de hijos de guatemaltecos nacidos en el extranjero",
      "Protocolización de documentos",
      "Traducciones juradas inglés español y viceversa",
    ],
  },
  {
    icon: Gavel,
    title: "Jurisdicción Voluntaria",
    servicios: [
      "Rectificación de partida",
      "Cambio de nombre",
      "Proceso sucesorio intestado o testamentario",
      "Cancelación de partidas",
      "Inscripción extemporánea",
      "Avalúos de bienes inmuebles, vehículos, armas de fuego",
    ],
  },
  {
    icon: Users,
    title: "Materia Familiar",
    servicios: [
      "Pensiones alimenticias",
      "Obligación de hacer",
      "Juicios de ejecución",
    ],
  },
  {
    icon: Briefcase,
    title: "Materia Laboral",
    servicios: [
      "Despidos injustificados",
      "Reinstalaciones",
      "Indemnización post mortem",
      "Procesos contra el Estado",
    ],
  },
  {
    icon: Car,
    title: "Vehículos",
    servicios: [
      "Traspasos electrónicos",
      "Traspasos presenciales",
      "Cambio de uso",
      "Cambio de placas",
      "Reposición de placas",
      "Reposición de tarjeta, título y placas",
      "Primeras placas de vehículos usados importados",
      "Inactivaciones",
      "Activaciones",
    ],
  },
];

const buildWhatsAppUrl = (servicio: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, me interesa obtener información sobre el servicio: "${servicio}". ¿Podrían darme más detalles?`
  )}`;

const Servicios = () => {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  return (
    <Layout>
      <section className="bg-primary py-16 text-center">
        <h1 className="font-heading text-4xl text-primary-foreground italic font-bold">
          Catálogo de Servicios
        </h1>
        <div className="gold-underline mt-2" />
        <p className="text-primary-foreground/80 mt-4">
          Más de 80 servicios legales especializados para toda Guatemala
        </p>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl space-y-4">
          {categorias.map((cat, i) => {
            const isOpen = expandedCat === cat.title;
            return (
              <AnimatedSection key={cat.title} delay={i * 0.05}>
                <div className="border border-border rounded-lg overflow-hidden bg-card">
                  <button
                    onClick={() => setExpandedCat(isOpen ? null : cat.title)}
                    className="w-full flex items-center justify-between p-5 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon className="text-gold flex-shrink-0" size={28} />
                      <h2 className="font-heading text-lg font-bold text-foreground text-left">
                        {cat.title}
                      </h2>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {cat.servicios.length}
                      </span>
                    </div>
                    <ChevronDown
                      className={`text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      size={22}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border px-5 pb-5">
                          <ul className="divide-y divide-border">
                            {cat.servicios.map((s) => (
                              <li
                                key={s}
                                className="flex items-center justify-between py-3 gap-3"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                                  <span className="text-sm text-foreground">{s}</span>
                                </div>
                                <a
                                  href={buildWhatsAppUrl(s)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1da851] px-3 py-1.5 rounded-full transition-colors"
                                >
                                  <MessageCircle size={14} />
                                  Consultar
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Servicios;