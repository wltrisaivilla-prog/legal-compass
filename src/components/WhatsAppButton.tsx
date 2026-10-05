import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const url = `https://wa.me/50258997508?text=${encodeURIComponent("Hola, me gustaría obtener información sobre sus servicios legales.")}`;

  return (
    <a
      data-event="whatsapp_click" href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat en WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
