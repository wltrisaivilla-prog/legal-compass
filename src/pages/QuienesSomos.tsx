import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import lawyerPortrait from "@/assets/licenciado.png";
import { Scale, Eye, Heart, Shield, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  { icon: Scale, title: "Justicia", desc: "Compromiso con la equidad y el estado de derecho." },
  { icon: Shield, title: "Integridad", desc: "Transparencia y ética en cada acción." },
  { icon: Users, title: "Compromiso", desc: "Dedicación total a nuestros clientes." },
  { icon: Heart, title: "Empatía", desc: "Entendemos la situación de cada cliente." },
  { icon: Award, title: "Excelencia", desc: "Búsqueda constante de los mejores resultados." },
  { icon: Eye, title: "Transparencia", desc: "Comunicación clara en cada etapa." },
];

const QuienesSomos = () => (
  <Layout>
    <section className="bg-primary py-16 text-center">
      <h1 className="font-heading text-4xl text-primary-foreground italic font-bold">Quiénes Somos</h1>
      <div className="gold-underline mt-2" />
      {/* Se añade referencia geográfica en el subtítulo principal */}
      <p className="text-primary-foreground/80 mt-4">Más de 25 años protegiendo sus derechos desde la Zona 4 de la Ciudad de Guatemala</p>
    </section>

    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <AnimatedSection>
            <h2 className="font-heading text-3xl text-foreground italic font-bold mb-2">Nuestra Historia</h2>
            <div className="w-16 h-1 bg-gold mb-8" />
            {/* Se optimiza el primer párrafo con palabras clave de ubicación */}
            <p className="text-foreground mb-4">
              Fundada en 1999, <strong>Litigios de Guatemala</strong> nació con la visión de transformar la manera en que los guatemaltecos acceden a servicios legales de calidad. Establecidos en el corazón de la <strong>Zona 4</strong>, lo que comenzó como un pequeño bufete especializado en litigio civil, hoy se ha convertido en una firma de referencia nacional con más de 25 años de trayectoria.
            </p>
            <p className="text-foreground mb-4">A lo largo de estos años, hemos evolucionado para ofrecer soluciones integrales que van desde la mediación y arbitraje hasta el litigio complejo, siempre manteniendo nuestro compromiso con la excelencia, la transparencia y los resultados concretos para nuestros clientes.</p>
            <p className="text-foreground mb-4">Hemos participado en más de <strong>1,000 casos resueltos exitosamente</strong>, construyendo una reputación sólida basada en la confianza y el profesionalismo.</p>
            {/* Se refuerza el concepto de "Abogados en Zona 4" */}
            <p className="text-foreground">Nuestro equipo está compuesto por <strong>abogados especializados en diferentes áreas del derecho en la Ciudad de Guatemala</strong>, lo que nos permite ofrecer un servicio integral y multidisciplinario desde nuestra oficina central.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="lg:sticky lg:top-24">
            <div className="relative">
              <div className="absolute -inset-3 bg-gold/20 rounded-lg -z-10" />
              <img src={lawyerPortrait} alt="Lic. Fundador de Litigios de Guatemala" className="rounded-lg shadow-xl w-full object-cover max-h-[600px]" loading="lazy" />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4 font-heading italic">Fundador — Litigios de Guatemala</p>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatedSection>
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="font-heading text-2xl font-bold text-gold mb-4">Misión</h3>
            <p className="text-foreground">Proveer servicios legales accesibles, eficientes y de la más alta calidad, garantizando que cada cliente reciba una representación justa y profesional que proteja sus derechos e intereses.</p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="font-heading text-2xl font-bold text-gold mb-4">Visión</h3>
            <p className="text-foreground">Ser la firma legal más confiable y reconocida de Guatemala, liderando la innovación en servicios jurídicos y estableciendo nuevos estándares de excelencia profesional.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-heading text-3xl text-foreground italic font-bold mb-2">Nuestros Valores</h2>
          <div className="gold-underline mb-10" />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-gold hover:shadow-lg transition-all group"
              >
                <v.icon className="mx-auto mb-3 text-gold group-hover:scale-110 transition-transform" size={36} />
                <h4 className="font-heading text-lg font-bold text-foreground mb-2">{v.title}</h4>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default QuienesSomos;
