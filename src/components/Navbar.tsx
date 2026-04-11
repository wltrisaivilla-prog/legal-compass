import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoScales from "@/assets/logo-scales.png";

const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Quiénes Somos", path: "/quienes-somos" },
  { label: "Servicios", path: "/servicios" },
  { label: "Documentos", path: "/documentos" },
  { label: "Contacto", path: "/contacto" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoScales} alt="Litigios de Guatemala" className="h-10 w-10" />
          <span className="text-xl font-heading">
            <span className="text-gold">Litigios</span>{" "}
            <span className="text-primary-foreground">de </span>
            <span className="text-gold">Guatemala</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                location.pathname === item.path
                  ? "text-gold underline underline-offset-8"
                  : "text-primary-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-navy-light pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors hover:text-gold ${
                location.pathname === item.path ? "text-gold" : "text-primary-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
