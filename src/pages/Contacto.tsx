import { signalConversion } from "@/lib/measurement";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2 } from "lucide-react"; // Corregido de 'lucide-center'
import { useToast } from "@/hooks/use-toast";

const Contacto = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estadoHorario, setEstadoHorario] = useState({ texto: "Cargando...", color: "gray" });

  const whatsappUrl = `https://wa.me/50258997508?text=${encodeURIComponent("Hola, me gustaría obtener información sobre sus servicios legales.")}`;

  useEffect(() => {
    const actualizarEstado = () => {
      const ahora = new Date();
      // Configuración para la zona horaria de Guatemala
      const opciones: Intl.DateTimeFormatOptions = { timeZone: "America/Guatemala", hour12: false, hour: "2-digit" };
      const horaGuate = parseInt(new Intl.DateTimeFormat("en-US", opciones).format(ahora));
      const diaGuate = ahora.getDay(); 

      let estado = "Cerrado";
      let color = "#f87171"; // Rojo

      // Lunes (1) a Viernes (5) de 8:00 a 18:00
      if (diaGuate >= 1 && diaGuate <= 5) {
        if (horaGuate >= 8 && horaGuate < 18) {
          estado = "Abierto";
          color = "#4ade80"; // Verde
        }
      } 
      // Sábados (6) de 8:00 a 12:00
      else if (diaGuate === 6) {
        if (horaGuate >= 8 && horaGuate < 12) {
          estado = "Abierto";
          color = "#4ade80";
        }
      }

      setEstadoHorario({ texto: estado, color: color });
    };

    actualizarEstado();
    const interval = setInterval(actualizarEstado, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Error", description: "Por favor complete todos los campos requeridos.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xkokkjak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
      });

      if (!res.ok) throw new Error("Formspree error");

      toast({ title: "Mensaje enviado", description: "Su mensaje ha sido recibido. Nos pondremos en contacto pronto." });
      signalConversion("contact_submit_success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast({ title: "Error", description: "No se pudo enviar el mensaje. Intente de nuevo o contáctenos por WhatsApp.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="bg-primary py-16 text-center">
        <h1 className="font-heading text-4xl text-primary-foreground italic font-bold">Contacto</h1>
        <div className="gold-underline mt-2" />
        <p className="text-primary-foreground/80 mt-4">Estamos aquí para ayudarle</p>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Envíenos un Mensaje</h2>
            <form data-event="contact_submit" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nombre *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-input rounded-md px-4 py-2.5 bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none" maxLength={100} disabled={isSubmitting} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-input rounded-md px-4 py-2.5 bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none" maxLength={255} disabled={isSubmitting} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Asunto</label>
                <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full border border-input rounded-md px-4 py-2.5 bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none" maxLength={200} disabled={isSubmitting} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Mensaje *</label>
                <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-input rounded-md px-4 py-2.5 bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none resize-none" maxLength={1000} disabled={isSubmitting} required />
              </div>
              <button type="submit" className="btn-gold flex items-center gap-2" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>

            <div className="mt-8">
              <a data-event="whatsapp_click" href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#20BD5B] transition-colors">
                <MessageCircle size={20} /> Chat en WhatsApp
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Información de Contacto</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="text-gold mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Dirección</p>
                  <p className="text-muted-foreground text-sm">Ruta 6, 5-34 zona 4 Ciudad de Guatemala</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-gold mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Teléfono</p>
                  <a data-event="phone_click" href="tel:+50258997508" className="text-muted-foreground text-sm hover:text-gold transition-colors">+502 5899 7508</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-gold mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <a href="mailto:Consultoriojuridico79@gmail.com" className="text-muted-foreground text-sm hover:text-gold transition-colors">Consultoriojuridico79@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-6 mb-8">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="text-gold" size={20} /> Horario de Atención: 
                <span style={{ color: estadoHorario.color, marginLeft: '8px' }}>
                  {estadoHorario.texto}
                </span>
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-foreground">Lunes a Viernes</span><span className="text-muted-foreground">8:00 - 18:00</span></div>
                <div className="flex justify-between"><span className="text-foreground">Sábado</span><span className="text-muted-foreground">8:00 - 12:00</span></div>
                <div className="flex justify-between"><span className="text-foreground">Domingo</span><span className="text-destructive font-bold">Cerrado</span></div>
              </div>
            </div>

            {/* Mapa corregido: Se utiliza una URL de inserción válida para la dirección en Zona 4 */}
            <div className="rounded-lg overflow-hidden shadow-md border border-gold/20">
              <iframe
                title="Ubicación de Litigios de Guatemala"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.972322588339!2d-90.5173715!3d14.6133189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a3ca49234f9d%3A0x67341851221f7a0e!2sRuta%206%205-34%2C%20Guatemala!5e0!3m2!1ses!2sgt!4v1713180000000!5m2!1ses!2sgt"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
