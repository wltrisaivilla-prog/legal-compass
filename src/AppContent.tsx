import { HydrationProvider } from "@/components/HydrationProvider";
import RouteSeo from "@/seo/RouteSeo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import QuienesSomos from "./pages/QuienesSomos";
import Servicios from "./pages/Servicios";
import Documentos from "./pages/Documentos";
import Contacto from "./pages/Contacto";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = ({ buildYear }: { buildYear?: number }) => (
  <HydrationProvider buildYear={buildYear}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <RouteSeo />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </TooltipProvider>
    </QueryClientProvider>
  </HydrationProvider>
);

export default AppContent;
