import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const AboutPage = () => {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default AboutPage;
