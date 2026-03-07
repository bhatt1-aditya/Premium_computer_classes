import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const CertificateSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificate" className="section-padding bg-background" ref={ref}>
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Award className="h-10 w-10 text-primary" />
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Certification
          </p>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-5xl">
            Get Your <span className="text-gradient">Certificate</span>
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
            Completed your course? Sign in to access and download your verified
            certificate. Showcase your achievement to the world.
          </p>
          <Link
            to="/signin"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg"
          >
            <LogIn className="h-5 w-5" />
            Sign In to Get Certificate
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificateSection;
