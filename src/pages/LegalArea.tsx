import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { legalAreas } from "@/data/legal-areas";
import { categorias } from "@/data/services";
import NotFound from "./NotFound";

export default function LegalArea() {
  const { pathname } = useLocation();
  const area = legalAreas.find(item => item.path === pathname.replace(/\/+$/, ""));
  if (!area) return <NotFound />;
  const category = categorias.find(item => item.title === area.category)!;
  const whatsapp = `https://wa.me/50258997508?text=${encodeURIComponent(`Hola, me gustaría consultar sobre ${area.name}.`)}`;
  const actions = <div className="flex flex-wrap gap-4 mt-6">
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" data-event="whatsapp_click" data-intent="service_inquiry" data-service={area.name} className="inline-flex rounded-full bg-whatsapp text-whatsapp-foreground px-6 py-3 font-semibold hover:bg-whatsapp-dark">Consultar {area.name} por WhatsApp</a>
    <Link to="/contacto" className="inline-flex rounded-full bg-gold text-primary px-6 py-3 font-semibold hover:bg-gold/90">Contactar a la firma</Link>
  </div>;
  return <Layout>
    <section className="bg-primary py-16 md:py-20">
      <div className="container mx-auto max-w-4xl">
        <Link to="/servicios" className="text-gold hover:underline">Volver al catálogo general de servicios</Link>
        <h1 className="font-heading text-4xl md:text-5xl text-primary-foreground italic font-bold mt-6">{area.name} en Guatemala</h1>
        <p className="text-primary-foreground/80 mt-5">Litigios de Guatemala · Ciudad de Guatemala, zona 4</p>
        {actions}
      </div>
    </section>
    <div className="container mx-auto max-w-4xl section-padding space-y-12">
      <AnimatedSection><section aria-label={`Introducción a ${area.name}`} className="space-y-4 text-muted-foreground leading-relaxed">{area.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section></AnimatedSection>
      <AnimatedSection><section>
        <h2 className="font-heading text-3xl font-bold mb-6">Servicios que atendemos</h2>
        <ul className="grid sm:grid-cols-2 gap-3">{category.servicios.map(service => <li key={service} className="rounded-lg border border-border bg-card p-4">{service}</li>)}</ul>
      </section></AnimatedSection>
      <AnimatedSection><section><h2 className="font-heading text-3xl font-bold mb-4">Cómo puede apoyar la firma</h2><p className="text-muted-foreground leading-relaxed">{area.support}</p></section></AnimatedSection>
      <AnimatedSection><section><h2 className="font-heading text-3xl font-bold mb-4">¿Cuándo consultar a un abogado?</h2><p className="text-muted-foreground leading-relaxed">{area.consult}</p></section></AnimatedSection>
      <AnimatedSection><section><h2 className="font-heading text-3xl font-bold mb-6">Preguntas frecuentes sobre {area.name}</h2><div className="space-y-4">{area.faqs.map(faq => <div key={faq.q} className="rounded-lg border border-border bg-card p-6"><h3 className="font-heading text-lg font-bold mb-3">{faq.q}</h3><p className="text-muted-foreground leading-relaxed">{faq.a}</p></div>)}</div></section></AnimatedSection>
      {area.related.length > 0 && <section><h2 className="font-heading text-2xl font-bold mb-4">Consultas relacionadas</h2><div className="flex flex-wrap gap-4">{area.related.map(path => <Link key={path} className="text-gold font-semibold hover:underline" to={path}>{legalAreas.find(item => item.path === path)!.name}</Link>)}</div></section>}
      <section className="rounded-2xl bg-muted p-6"><h2 className="font-heading text-2xl font-bold">Conversemos sobre su consulta</h2>{actions}<p className="text-sm text-muted-foreground mt-6">La información es general y no sustituye asesoría jurídica individual. La atención y sus condiciones se valoran según los antecedentes de cada consulta.</p><Link className="inline-block text-gold hover:underline mt-4" to="/servicios">Consultar el catálogo completo de servicios</Link></section>
    </div>
  </Layout>;
}
