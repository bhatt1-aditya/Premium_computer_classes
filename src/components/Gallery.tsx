import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

import testimonial1 from "@/assets/testimonial-1.png";
import testimonial2 from "@/assets/testimonial-2.png";
import testimonial3 from "@/assets/testimonial-3.png";
import testimonial4 from "@/assets/testimonial-4.png";
import testimonial5 from "@/assets/testimonial-5.png";

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
}

interface Testimonial {
  id: string;
  image_url: string;
  description: string | null;
}

const fallbackTestimonials = [testimonial1, testimonial2, testimonial3, testimonial4, testimonial5];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [galleryRes, testimonialsRes] = await Promise.all([
        supabase.from("gallery").select("*").order("created_at", { ascending: false }),
        supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
      ]);
      if (galleryRes.data) setGalleryItems(galleryRes.data);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
    };
    fetchData();
  }, []);

  const galleryDoubled = galleryItems.length > 0 ? [...galleryItems, ...galleryItems] : [];
  const hasDbTestimonials = testimonials.length > 0;
  const testimonialImages = hasDbTestimonials
    ? [...testimonials, ...testimonials]
    : [...fallbackTestimonials, ...fallbackTestimonials].map((img, i) => ({ id: String(i), image_url: img, description: null }));

  return (
    <section id="gallery" className="section-padding gradient-navy" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-light-teal">
            Gallery
          </p>
          <h2 className="mb-6 font-display text-3xl font-bold text-cream-light md:text-5xl">
            Life at <span className="text-gradient">PCC</span>
          </h2>
        </motion.div>

        {/* Rolling Gallery */}
        {galleryItems.length > 0 && (
          <div className="mb-16 overflow-hidden">
            <div className="flex animate-scroll-x gap-4" style={{ width: "max-content" }}>
              {galleryDoubled.map((item, i) => (
                <div
                  key={`${item.id}-${i}`}
                  className="group relative w-72 flex-shrink-0 overflow-hidden rounded-2xl"
                >
                  <img
                    src={item.image_url}
                    alt={item.caption || "Gallery"}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {item.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-4">
                      <p className="text-sm font-medium text-cream-light">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rolling Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="mb-8 text-center font-display text-2xl font-bold text-cream-light md:text-3xl">
            Testimonials
          </h3>
          <div className="overflow-hidden">
            <div className="flex animate-scroll-x-slow gap-4" style={{ width: "max-content" }}>
              {testimonialImages.map((item, i) => (
                <div
                  key={`testimonial-${item.id}-${i}`}
                  className="group w-64 flex-shrink-0 overflow-hidden rounded-2xl"
                >
                  <img
                    src={typeof item === "string" ? item : item.image_url}
                    alt={`Testimonial ${i + 1}`}
                    className="h-64 w-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                  {item.description && (
                    <div className="bg-navy/60 p-3">
                      <p className="text-xs text-cream-light">{item.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
