import Layout from "@/components/Layout";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contacto = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Error", description: "Por favor complete todos los campos requeridos.", variant: "destructive" });
      return;
    }
    toast({ title: "Mensaje enviado", description: "Nos pondremos en contacto pronto." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const whatsappUrl = `https://wa.me/50258997508?text=${encodeURIComponent("Hola, me gustaría obtener información sobre sus servicios legales.")}`;

  return (
    <Layout>
      <section className="bg-primary py-16 text-center">
        <h1 className="font-heading text-4xl text-primary-foreground italic font-bold">Contacto</h1>
        <div className="gold-underline mt-2" />
        <p className="text-primary-foreground/80 mt-4">Estamos aquí para ayudarle</p>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Envíenos un Mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nombre *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-input rounded-md px-4 py-2.5 bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-input rounded-md px-4 py-2.5 bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                  maxLength={255}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Asunto</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-input rounded-md px-4 py-2.5 bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                  maxLength={200}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Mensaje *</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-input rounded-md px-4 py-2.5 bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none resize-none"
                  maxLength={1000}
                />
              </div>
              <button type="submit" className="btn-gold flex items-center gap-2">
                <Send size={16} /> Enviar Mensaje
              </button>
            </form>

            <div className="mt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-[#fff] font-semibold px-6 py-3 rounded-md hover:bg-[#20BD5B] transition-colors"
              >
                <MessageCircle size={20} />
                Chat en WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Info + Map */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Información de Contacto</h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="text-gold mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Dirección</p>
                  <p className="text-muted-foreground text-sm">Ruta 6, 5-34 zona 4 Guatemala, Guatemala</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-gold mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Teléfono</p>
                  <a href="tel:+50258997508" className="text-muted-foreground text-sm hover:text-gold transition-colors">+502 5899 7508</a>
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

            {/* Hours */}
            <div className="bg-secondary rounded-lg p-6 mb-8">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="text-gold" size={20} /> Horario de Atención
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground">Lunes a Viernes</span>
                  <span className="text-muted-foreground">8:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Sábado</span>
                  <span className="text-muted-foreground">8:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Domingo</span>
                  <span className="text-destructive">Cerrado</span>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe
                title="Ubicación de Litigios de Guatemala"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.9!2d-90.515!3d14.625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM3JzMwLjAiTiA5MMKwMzAnNTQuMCJX!5e0!3m2!1ses!2sgt!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
