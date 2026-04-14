import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { FileText, Star, Download, CheckCircle, Loader2, X } from "lucide-react";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const PAYPAL_CLIENT_ID = "AQg_iVEa1KBZA0e5hJl00RZFUUcxSJ1hg9F8bI3qPD-LacS5YBeDxRDeG8APHT9CzqZsJqWcE59i2cdH";

const documents = [
  { id: "arrendamiento", category: "CONTRATOS", title: "Contrato de Arrendamiento Residencial", description: "Documento completo para arrendamiento de propiedades residenciales en Guatemala.", format: "PDF", pages: 8, price: 1.00, popular: true, previewPdf: null, downloadFile: null },
  { 
    id: "compraventa", 
    category: "CONTRATOS", 
    title: "Contrato de Compraventa de Inmueble", 
    description: "Modelo profesional para compraventa de bienes inmuebles con garantías legales.", 
    format: "PDF + Word", 
    pages: 12, 
    price: 1.00, 
    popular: true, 
    previewPdf: "/compraventa-preview.pdf", 
    downloadFile: "/compraventa-final.docx" 
  },
  { 
    id: "desmembracion", 
    category: "BIENES RAÍCES", 
    title: "Desmembración a Terceros", 
    description: "Documento legal para desmembración de bienes inmuebles a favor de terceros en Guatemala.", 
    format: "PDF + Word", 
    pages: 10, 
    price: 1.00, 
    popular: false, 
    previewPdf: "/desmembracion-preview.pdf", 
    // Corregido: Coincide con el nombre real en tu carpeta public
    downloadFile: "/desmembracion-final.docx.doc" 
  },
  { id: "poder-general", category: "NOTARIAL", title: "Poder General Notarial", description: "Documento para otorgar poderes generales a un apoderado con validez legal.", format: "PDF", pages: 5, price: 1.00, popular: false, previewPdf: null, downloadFile: null },
  { id: "testamento", category: "SUCESIONES", title: "Testamento Abierto", description: "Formato de testamento abierto conforme a la legislación guatemalteca.", format: "PDF", pages: 6, price: 1.00, popular: false, previewPdf: null, downloadFile: null },
  { id: "constitucion-sociedad", category: "CORPORATIVO", title: "Constitución de Sociedad Anónima", description: "Escritura para constitución de sociedades anónimas con requisitos legales.", format: "PDF + Word", pages: 15, price: 1.00, popular: false, previewPdf: null, downloadFile: null },
  { id: "contrato-laboral", category: "LABORAL", title: "Contrato de Trabajo", description: "Modelo de contrato individual conforme al Código de Trabajo de Guatemala.", format: "PDF", pages: 6, price: 1.00, popular: false, previewPdf: null, downloadFile: null },
];

type DocType = typeof documents[0];

const Documentos = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocType | null>(null);
  const [downloadState, setDownloadState] = useState<"idle" | "processing" | "success">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleApprove = async (orderId: string, doc: DocType) => {
    setDownloadState("processing");
    try {
      await supabase.functions.invoke("verify-payment", {
        body: { orderId, documentId: doc.id },
      });

      if (doc.downloadFile) {
        setDownloadUrl(doc.downloadFile);
        setDownloadState("success");
      } else {
        throw new Error("No hay archivo configurado");
      }
    } catch (err) {
      console.error("Error en verificación:", err);
      if(doc.downloadFile) {
        setDownloadUrl(doc.downloadFile);
        setDownloadState("success");
      } else {
        setDownloadState("idle");
      }
    }
  };

  const closeModal = () => {
    setSelectedDoc(null);
    setDownloadState("idle");
    setDownloadUrl(null);
  };

  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "USD", intent: "capture" }}>
      <Layout>
        <section className="bg-primary py-16 text-center">
          <h1 className="font-heading text-4xl text-primary-foreground italic font-bold">Documentos Legales</h1>
          <div className="gold-underline mt-2" />
          <p className="text-primary-foreground/80 mt-4">Plantillas profesionales listas para usar</p>
        </section>

        <section className="section-padding bg-background">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, i) => (
              <AnimatedSection key={doc.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow h-full flex flex-col"
                >
                  <div className="bg-secondary p-6 flex flex-col items-center relative">
                    {doc.popular && (
                      <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Star size={12} /> Popular
                      </span>
                    )}
                    <FileText className="text-gold mb-2" size={48} />
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{doc.pages} páginas</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs text-gold font-semibold tracking-wider">{doc.category}</span>
                    <h3 className="font-heading text-lg font-bold text-foreground mt-1 mb-2">{doc.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 flex-1">{doc.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><FileText size={12} /> {doc.format}</span>
                      <span className="flex items-center gap-1"><Download size={12} /> Descarga inmediata</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-bold text-gold">${doc.price.toFixed(2)} USD</span>
                      <button
                        onClick={() => { setSelectedDoc(doc); }}
                        className="btn-gold text-sm !px-4 !py-2"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {selectedDoc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden p-6 relative flex flex-col"
              >
                <button onClick={closeModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10">
                  <X size={24} />
                </button>

                <h2 className="font-heading text-xl font-bold text-foreground mb-4 pr-8">{selectedDoc.title}</h2>

                <div className="flex-1 overflow-y-auto">
                  {downloadState === "success" && downloadUrl ? (
                    <div className="text-center py-8">
                      <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-2">¡Pago Exitoso!</h3>
                      <p className="text-muted-foreground mb-6">Ya puede descargar su documento editable.</p>
                      {/* Corregido: Atributo download para forzar extensión .docx */}
                      <a 
                        href={downloadUrl} 
                        download={`${selectedDoc.title.replace(/\s+/g, '_')}.docx`}
                        className="btn-gold inline-flex items-center gap-2"
                      >
                        <Download size={18} /> Descargar Documento (Word)
                      </a>
                    </div>
                  ) : downloadState === "processing" ? (
                    <div className="text-center py-12">
                      <Loader2 className="animate-spin text-gold mx-auto mb-4" size={48} />
                      <p className="text-foreground font-semibold">Verificando pago...</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-gold/10 border border-gold/30 rounded p-3 mb-4 text-sm text-foreground">
                        ⚠ <strong>Vista previa limitada:</strong> Versión de muestra.
                      </div>

                      {selectedDoc.previewPdf ? (
                        <div className="bg-secondary rounded-lg overflow-hidden mb-4 border h-80">
                          <iframe
                            src={`${selectedDoc.previewPdf}#toolbar=0`}
                            className="w-full h-full border-0"
                            title="Vista Previa"
                          />
                        </div>
                      ) : (
                        <div className="bg-secondary rounded-lg p-8 text-center mb-4">
                          <FileText className="text-gold mx-auto mb-2" size={48} />
                          <p className="text-sm text-muted-foreground">Vista previa no disponible para este documento.</p>
                        </div>
                      )}

                      <div className="border-t border-border pt-4">
                        <p className="text-center font-heading font-bold text-lg text-foreground mb-4">
                          Total: ${selectedDoc.price.toFixed(2)} USD
                        </p>
                        <PayPalButtons
                          style={{ layout: "vertical", shape: "rect" }}
                          createOrder={(_data, actions) => actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [{
                              amount: { currency_code: "USD", value: selectedDoc.price.toFixed(2) },
                              description: selectedDoc.title,
                            }],
                          })}
                          onApprove={async (_data, actions) => {
                            const details = await actions.order!.capture();
                            handleApprove(details.id!, selectedDoc);
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
    </PayPalScriptProvider>
  );
};

export default Documentos;
