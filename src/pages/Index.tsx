import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Courses from "@/components/Courses";
import CertificateSection from "@/components/CertificateSection";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import WhatsAppButton from "@/components/WhatsAppButton";
import DemoPopup from "@/components/DemoPopup";

const Index = () => {
  return (
    <main className="relative">
      <CursorFollower />
      <Navbar />
      <Hero />
      <About />
      <Courses />
      <CertificateSection />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <DemoPopup />
    </main>
  );
};

export default Index;
