import Layout from "@/components/Layout";
import WelcomeBanner from "@/components/WelcomeBanner";
import HeroCarousel from "@/components/HeroCarousel";
import ServicesPreview from "@/components/ServicesPreview";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <WelcomeBanner />
      <HeroCarousel />
      <ServicesPreview />
      <StatsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;

