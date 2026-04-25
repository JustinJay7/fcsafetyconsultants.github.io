import Navbar from "@/components/Navbar";
import HeroSlideshow from "@/components/HeroSlideshow";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import ContactFooter from "@/components/ContactFooter";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSlideshow />
    <AboutSection />
    <WhyChooseUs />
    <ServicesSection />
    <ContactFooter />
    <WhatsAppFAB />
  </div>
);

export default Index;
