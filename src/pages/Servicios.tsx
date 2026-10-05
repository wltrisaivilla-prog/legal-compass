import { Link } from "react-router-dom";
import { categorias } from "@/data/services";
import { legalAreas } from "@/data/legal-areas";
import NoScriptContent from "@/components/NoScriptContent";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import {
  ChevronDown, MessageCircle, Search, X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "50258997508";

const buildWhatsAppUrl = (servicio: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, me interesa obtener información sobre el servicio: "${servicio}". ¿Podrían darme más detalles?`
  )}`;

const Servicios = () => {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const normalize = (value: string) =>
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  const totalServicios = useMemo(
    () => categorias.reduce((acc, cat) => acc + cat.servicios.length, 0),
    []
  );

  const resultados = useMemo(() => {
    const q = normalize(query);
    if (!q) return categorias;
    return categorias
      .map((cat) => {
        const matchCategoria = normalize(cat.title).includes(q);
        const servicios = matchCategoria
          ? cat.servicios
          : cat.servicios.filter((s) => normalize(s).includes(q));
        return { ...cat, servicios };
      })
      .filter((cat) => cat.servicios.length > 0);
  }, [query]);

  const isSearching = normalize(query).length > 0;

  return (
    <Layout>
      <section className="relative bg-primary py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--gold)/0.18),transparent_60%)]" />
        <div className="container mx-auto relative text-center max-w-3xl">
          <span className="inline-block text-xs tracking-[0.25em] uppercase text-gold mb-4">
            Litigios de Guatemala
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-primary-foreground italic font-bold">
            Catálogo de Servicios
          </h1>
          <div className="gold-underline mt-2" />
          <p className="text-primary-foreground/80 mt-5">
            {totalServicios} servicios legales especializados en {categorias.length} áreas de práctica
          </p>

          <div className="relative mt-8">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/50"
              size={18}
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar un servicio o categoría..."
              aria-label="Buscar servicios"
              className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 py-3.5 pl-11 pr-11 text-sm text-primary-foreground placeholder:text-primary-foreground/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-gold"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-gold transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-6xl">
          {resultados.length === 0 && (
            <p className="text-center text-muted-foreground py-10">
              No encontramos servicios para “{query}”. Intente con otra palabra.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
            {resultados.map((cat, i) => {
              const isOpen = isSearching || expandedCat === cat.title;
              const panelId = `servicios-panel-${i}`;
              return (
                <AnimatedSection key={cat.title} delay={i * 0.05}>
                  <div className="group h-full rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:border-gold/50 transition-all duration-300 overflow-hidden">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpandedCat(expandedCat === cat.title ? null : cat.title)}
                      className="w-full text-left p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-primary transition-colors">
                          <cat.icon size={24} />
                        </span>
                        <ChevronDown
                          className={`text-gold mt-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          size={20}
                        />
                      </div>
                      <h2 className="font-heading text-lg font-bold text-foreground mt-4">
                        {cat.title}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cat.servicios.length} servicio{cat.servicios.length === 1 ? "" : "s"} disponibles
                      </p>
                    </button>

                    {legalAreas.find(area => area.category === cat.title) && (
                      <Link className="block px-6 pb-5 text-sm font-semibold text-gold hover:underline" to={legalAreas.find(area => area.category === cat.title)!.path}>Ver información del área<span className="sr-only">: {cat.title}</span></Link>
                    )}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border px-6 py-4">
                            <ul className="space-y-3">
                              {cat.servicios.map((s) => (
                                <li key={s} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 min-w-0">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                                    <span className="text-sm text-foreground leading-snug">{s}</span>
                                  </div>
                                  <a
                                    data-event="whatsapp_click"
                                    data-intent="service_inquiry"
                                    data-service={s}
                                    href={buildWhatsAppUrl(s)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Consultar por WhatsApp sobre ${s}`}
                                    className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-whatsapp-foreground bg-whatsapp hover:bg-whatsapp-dark px-3 py-1.5 rounded-full transition-colors"
                                  >
                                    <MessageCircle size={14} aria-hidden="true" />
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
        </div>
      </section>
      <NoScriptContent sections={categorias.map(cat => ({ title: cat.title, paragraphs: cat.servicios }))} />
  </Layout>
  );
};


export default Servicios;
