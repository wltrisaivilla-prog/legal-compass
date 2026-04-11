import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import ServicesPreview from "@/components/ServicesPreview";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />
      <ServicesPreview />
      <StatsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
