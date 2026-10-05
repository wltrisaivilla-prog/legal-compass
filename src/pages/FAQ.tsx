import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs } from "@/seo/faqs";


const FAQ = () => (
  <Layout>
    <section className="bg-primary py-16 text-center">
      <h1 className="font-heading text-4xl text-primary-foreground italic font-bold">Preguntas Frecuentes</h1>
      <div className="gold-underline mt-2" />
      <p className="text-primary-foreground/80 mt-4">Respuestas a las consultas más comunes</p>
    </section>

    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-6 overflow-hidden">
                <AccordionTrigger className="text-left font-heading font-bold text-foreground hover:text-gold transition-colors py-5">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default FAQ;
