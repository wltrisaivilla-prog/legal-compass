import Layout from "@/components/Layout";
import aboutLawyer from "@/assets/about-lawyer.jpg";

const QuienesSomos = () => {
  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl text-foreground italic font-bold mb-2">
                Nuestra Historia
              </h1>
              <div className="w-16 h-1 bg-gold mb-8" />

              <p className="text-foreground mb-4">
                Fundada en 1999, <strong>Litigios de Guatemala</strong> nació con la visión de transformar la manera en que los guatemaltecos acceden a servicios legales de calidad. Lo que comenzó como un pequeño bufete especializado en litigio civil, hoy se ha convertido en una firma de referencia nacional con más de 25 años de trayectoria.
              </p>
              <p className="text-foreground mb-4">
                A lo largo de estos años, hemos evolucionado para ofrecer soluciones integrales que van desde la mediación y arbitraje hasta el litigio complejo, siempre manteniendo nuestro compromiso con la excelencia, la transparencia y los resultados concretos para nuestros clientes.
              </p>
              <p className="text-foreground mb-4">
                Hemos participado en más de <strong>1,000 casos resueltos exitosamente</strong>, construyendo una reputación sólida basada en la confianza y el profesionalismo.
              </p>
              <p className="text-foreground">
                Nuestro equipo está compuesto por abogados especializados en diferentes áreas del derecho, lo que nos permite ofrecer un servicio integral y multidisciplinario. Cada caso es tratado con la máxima dedicación y atención al detalle, garantizando siempre la mejor estrategia legal para nuestros clientes.
              </p>
            </div>

            <div className="lg:sticky lg:top-24">
              <img
                src={aboutLawyer}
                alt="Nuestro equipo legal"
                className="rounded-lg shadow-xl w-full object-cover"
                loading="lazy"
                width={800}
                height={1000}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QuienesSomos;
