import { motion } from "framer-motion";
import licenciado from "@/assets/licenciado.png";


const WelcomeBanner = () => {
  return (
    <section className="bg-navy-dark text-primary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <div className="relative w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-lg overflow-hidden border-4 border-gold shadow-xl">
              <img
                src={licenciado}
                alt="Licenciado - Litigios de Guatemala"
                className="w-full h-full object-cover object-top"
                width={320}
                height={400}
              />

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="text-center md:text-left"
          >
            <p className="text-gold font-semibold tracking-wider uppercase text-sm mb-3">
              Litigios de Guatemala
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl italic font-bold text-primary-foreground leading-tight mb-4">
              Bienvenido a Litigios de Guatemala
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto md:mx-0 mb-5" />
            <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl">
              Asesoría Jurídica Profesional con el compromiso de brindarle soluciones legales claras, seguras y a la medida de sus necesidades.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
