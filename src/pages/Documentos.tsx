import Layout from "@/components/Layout";
import { FileText, Star, Download, Clock } from "lucide-react";
import { useState } from "react";

const documents = [
  {
    id: "arrendamiento",
    category: "CONTRATOS",
    title: "Contrato de Arrendamiento Residencial",
    description: "Documento completo para arrendamiento de propiedades residenciales en Guatemala. Incluye cláusulas estándar y personalizables.",
    format: "PDF",
    pages: 8,
    price: 150,
    popular: true,
  },
  {
    id: "compraventa",
    category: "CONTRATOS",
    title: "Contrato de Compraventa de Inmueble",
    description: "Modelo profesional para compraventa de bienes inmuebles con todas las garantías legales.",
    format: "PDF + Word",
    pages: 12,
    price: 225,
    popular: true,
  },
  {
    id: "poder-general",
    category: "NOTARIAL",
    title: "Poder General Notarial",
    description: "Documento para otorgar poderes generales a un apoderado con validez legal ante notario.",
    format: "PDF",
    pages: 5,
    price: 120,
    popular: false,
  },
  {
    id: "testamento",
    category: "SUCESIONES",
    title: "Testamento Abierto",
    description: "Formato de testamento abierto para la disposición de bienes conforme a la legislación guatemalteca.",
    format: "PDF",
    pages: 6,
    price: 175,
    popular: false,
  },
  {
    id: "constitucion-sociedad",
    category: "CORPORATIVO",
    title: "Constitución de Sociedad Anónima",
    description: "Escritura para la constitución de sociedades anónimas con todos los requisitos legales.",
    format: "PDF + Word",
    pages: 15,
    price: 350,
    popular: false,
  },
  {
    id: "contrato-laboral",
    category: "LABORAL",
    title: "Contrato de Trabajo",
    description: "Modelo de contrato individual de trabajo conforme al Código de Trabajo de Guatemala.",
    format: "PDF",
    pages: 6,
    price: 100,
    popular: false,
  },
];

const Documentos = () => {
  const [selectedDoc, setSelectedDoc] = useState<typeof documents[0] | null>(null);

  return (
    <Layout>
      <section className="bg-primary py-16 text-center">
        <h1 className="font-heading text-4xl text-primary-foreground italic font-bold">
          Documentos Legales
        </h1>
        <div className="gold-underline mt-2" />
        <p className="text-primary-foreground/80 mt-4">
          Plantillas profesionales listas para usar con vista previa incluida
        </p>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Card header */}
              <div className="bg-secondary p-6 flex flex-col items-center relative">
                {doc.popular && (
                  <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} /> Popular
                  </span>
                )}
                <FileText className="text-destructive mb-2" size={48} />
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {doc.pages} páginas
                </span>
              </div>

              {/* Card body */}
              <div className="p-5">
                <span className="text-xs text-gold font-semibold tracking-wider">{doc.category}</span>
                <h3 className="font-heading text-lg font-bold text-foreground mt-1 mb-2">{doc.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{doc.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><FileText size={12} /> {doc.format}</span>
                  <span className="flex items-center gap-1"><Download size={12} /> Descarga inmediata</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gold">Q{doc.price.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground block">IVA incluido</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="text-sm border border-border rounded px-3 py-2 hover:border-gold transition-colors text-foreground"
                    >
                      Vista Previa
                    </button>
                    <button className="btn-gold text-sm !px-3 !py-2">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="bg-card rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-heading text-xl font-bold text-foreground">{selectedDoc.title}</h2>
              <button onClick={() => setSelectedDoc(null)} className="text-muted-foreground hover:text-foreground text-xl">×</button>
            </div>

            <div className="bg-gold/10 border border-gold/30 rounded p-3 mb-4 text-sm text-foreground">
              ⚠ <strong>Vista previa limitada:</strong> Esta es una versión de muestra con las primeras páginas.
            </div>

            <p className="text-muted-foreground text-sm mb-4">{selectedDoc.description}</p>

            <div className="bg-secondary rounded-lg p-8 text-center mb-4">
              <FileText className="text-destructive mx-auto mb-2" size={48} />
              <p className="font-semibold text-foreground">Vista Previa del Documento</p>
              <p className="text-sm text-muted-foreground">Las primeras 2 páginas se muestran como vista previa</p>
              <div className="mt-4 text-xs text-muted-foreground italic">
                <p>Página 1 – Encabezado y Cláusulas Iniciales</p>
                <p className="mt-2 opacity-50">Contenido completo disponible después de la compra</p>
              </div>
            </div>

            <button className="btn-gold w-full text-center">
              Comprar Documento Completo – Q{selectedDoc.price.toFixed(2)}
            </button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Incluye: Documento completo + Actualizaciones + Soporte
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Documentos;
