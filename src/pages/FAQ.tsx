import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Cuánto cuesta una consulta inicial?",
    a: "La primera consulta es gratuita y sin compromiso. Evaluamos su caso y le proporcionamos una orientación legal clara antes de proceder con cualquier servicio.",
  },
  {
    q: "¿Qué tipo de casos manejan?",
    a: "Manejamos más de 80 tipos de servicios legales, incluyendo litigio civil y mercantil, derecho corporativo, laboral, penal, migratorio, notarial, sucesiones, propiedad intelectual, entre otros.",
  },
  {
    q: "¿Cómo puedo agendar una cita?",
    a: "Puede agendar una cita llamándonos al +502 5899 7508, enviándonos un mensaje por WhatsApp, o llenando el formulario en nuestra sección de Contacto.",
  },
  {
    q: "¿Ofrecen servicios a nivel nacional?",
    a: "Sí, brindamos servicios legales en todo el territorio de Guatemala. Contamos con la capacidad de representar clientes en cualquier jurisdicción del país.",
  },
  {
    q: "¿Cuánto tiempo tarda un proceso legal?",
    a: "El tiempo varía según la complejidad del caso. En la consulta inicial le proporcionaremos un estimado realista de los plazos involucrados.",
  },
  {
    q: "¿Qué documentos necesito para mi primera consulta?",
    a: "Depende del tipo de caso. En general, le recomendamos traer cualquier documento relevante como contratos, notificaciones, identificación personal y cualquier correspondencia relacionada.",
  },
  {
    q: "¿Los documentos legales que venden son válidos en Guatemala?",
    a: "Sí, todas nuestras plantillas están redactadas conforme a la legislación guatemalteca vigente y son revisadas periódicamente por nuestro equipo legal.",
  },
  {
    q: "¿Puedo pagar los documentos con tarjeta de crédito?",
    a: "Sí, aceptamos pagos con tarjeta de crédito/débito a través de PayPal. No necesita tener una cuenta PayPal para realizar su compra.",
  },
];

const FAQ = () => {
  return (
    <Layout>
      <section className="bg-primary py-16 text-center">
        <h1 className="font-heading text-4xl text-primary-foreground italic font-bold">
          Preguntas Frecuentes
        </h1>
        <div className="gold-underline mt-2" />
        <p className="text-primary-foreground/80 mt-4">
          Respuestas a las consultas más comunes
        </p>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-lg px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-heading font-bold text-foreground hover:text-gold transition-colors py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
