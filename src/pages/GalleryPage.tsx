import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const GalleryPage = () => {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-20">
        <Gallery />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default GalleryPage;
