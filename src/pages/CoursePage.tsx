import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Courses from "@/components/Courses";

const CoursePage = () => {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-20">
        <Courses />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default CoursePage;
