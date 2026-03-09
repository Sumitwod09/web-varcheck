import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesSection from "@/components/home/ServicesSection";
import Differentiators from "@/components/home/Differentiators";
import ProcessSection from "@/components/home/ProcessSection";
import PortfolioTeaser from "@/components/home/PortfolioTeaser";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCTA from "@/components/home/FinalCTA";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <ServicesSection />
        <Differentiators />
        <ProcessSection />
        <PortfolioTeaser />
        <TestimonialsSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

export default Index;
