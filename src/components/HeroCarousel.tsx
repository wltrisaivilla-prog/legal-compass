import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroJustice from "@/assets/hero-justice.jpg";
import heroOffice from "@/assets/hero-office.jpg";

const slides = [
  {
    image: heroJustice,
    title: "Asesoría Legal Especializada",
    subtitle: "Más de 80 servicios legales para personas y empresas en Guatemala",
  },
  {
    image: heroOffice,
    title: "Documentos Legales Profesionales",
    subtitle: "Plantillas listas para usar con vista previa incluida",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <img src={s.image} alt={s.title} className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground italic font-bold mb-4 max-w-4xl">
              {slide.title}
            </h1>
            <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl">{slide.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-primary-foreground/80 hover:text-primary-foreground" aria-label="Previous">
        <ChevronLeft size={40} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-primary-foreground/80 hover:text-primary-foreground" aria-label="Next">
        <ChevronRight size={40} />
      </button>
    </section>
  );
};

export default HeroCarousel;
