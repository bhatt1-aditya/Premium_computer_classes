import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POPUP_IMAGE = "https://i.ibb.co/SDRkdzP0/pcc-popup-photo.jpg";

const DemoPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 13000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-card card-shadow"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-foreground/20 p-1.5 text-card backdrop-blur-sm hover:bg-foreground/40"
            >
              <X className="h-4 w-4" />
            </button>

            <img
              src={POPUP_IMAGE}
              alt="Demo Session"
              className="h-56 w-full object-cover"
            />

            <div className="p-6 text-center">
              <h3 className="mb-2 font-display text-xl font-bold text-foreground">
                Free Demo Session!
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Experience our world-class teaching firsthand. Join a free demo session and discover how we can shape your future in tech.
              </p>
              <a
                href="https://wa.me/message/FF4XXUKPDL72K1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:scale-105"
              >
                Book a Demo Session
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoPopup;
