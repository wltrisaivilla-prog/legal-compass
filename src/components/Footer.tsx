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
            <a href="https://www.facebook.com/share/14SHAyi5EGd/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="YouTube">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
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
