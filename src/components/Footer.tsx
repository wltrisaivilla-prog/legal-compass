import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-gold font-heading text-lg font-bold mb-4">Litigios de Guatemala</h3>
          <p className="text-sm text-primary-foreground/80 mb-4">
            Especialistas en resolución efectiva de conflictos legales. 25 años de experiencia nos respaldan.
          </p>
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gold font-heading text-lg font-bold mb-4">Enlaces Rápidos</h3>
          <ul className="space-y-2 text-sm">
            {["Inicio", "Quiénes Somos", "Servicios", "Documentos", "Contacto"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Inicio" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-").replace("é", "e")}`}
                  className="hover:text-gold transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Documents */}
        <div>
          <h3 className="text-gold font-heading text-lg font-bold mb-4">Documentos Populares</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/documentos" className="hover:text-gold transition-colors">Contrato de Arrendamiento</Link></li>
            <li><Link to="/documentos" className="hover:text-gold transition-colors">Contrato de Compraventa</Link></li>
            <li><Link to="/documentos" className="hover:text-gold transition-colors">Poder General</Link></li>
            <li><Link to="/documentos" className="hover:text-gold transition-colors">Testamento</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-gold font-heading text-lg font-bold mb-4">Contacto</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
              <span>Ruta 6, 5-34 zona 4 Guatemala, Guatemala</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gold flex-shrink-0" />
              <a href="tel:+50258997508" className="hover:text-gold transition-colors">+502 5899 7508</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gold flex-shrink-0" />
              <a href="mailto:Consultoriojuridico79@gmail.com" className="hover:text-gold transition-colors">Consultoriojuridico79@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="text-gold flex-shrink-0" />
              <span>Lun-Vie: 8:00 - 18:00</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="text-gold flex-shrink-0" />
              <span>Sáb: 8:00 - 12:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-light">
        <div className="container mx-auto py-4 text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Litigios de Guatemala. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
