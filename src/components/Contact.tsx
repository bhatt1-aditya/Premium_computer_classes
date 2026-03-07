import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const courseOptions = [
  "PGDCA",
  "DCA",
  "Python",
  "Advance EXCEL & MS Office",
  "Graphic Designs",
  "GEN AI",
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact_no: "",
    interested_courses: [] as string[],
  });

  const toggleCourse = (course: string) => {
    setForm((prev) => ({
      ...prev,
      interested_courses: prev.interested_courses.includes(course)
        ? prev.interested_courses.filter((c) => c !== course)
        : [...prev.interested_courses, course],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.contact_no.trim() || form.interested_courses.length === 0) {
      toast.error("Please fill all fields and select at least one course");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert([form]);
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      toast.success("Thank you! We'll get back to you soon.");
      setForm({ name: "", email: "", contact_no: "", interested_courses: [] });
    }
  };

  return (
    <section id="contact" className="section-padding bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Contact Us
          </p>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-5xl">
            Get In <span className="text-gradient">Touch</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl bg-card p-8 card-shadow"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Your email"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Contact No</label>
              <input
                type="tel"
                maxLength={15}
                value={form.contact_no}
                onChange={(e) => setForm({ ...form, contact_no: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Interested Courses
              </label>
              <div className="flex flex-wrap gap-2">
                {courseOptions.map((course) => (
                  <button
                    key={course}
                    type="button"
                    onClick={() => toggleCourse(course)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                      form.interested_courses.includes(course)
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {course}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <a href="tel:+919583778772" className="text-muted-foreground hover:text-primary">
                    +91 9583778772
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <a href="mailto:premiumcomputerclasses@gmail.com" className="text-muted-foreground hover:text-primary">
                    premiumcomputerclasses@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Location</p>
                  <p className="text-muted-foreground">Premium Computer Classes, Bhubaneswar</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/od1fcL2pmYREo5vk7"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-72 overflow-hidden rounded-2xl card-shadow cursor-pointer"
            >
              <iframe
                title="Premium Computer Classes Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=85.847%2C20.257%2C85.855%2C20.263&layer=mapnik&marker=20.2600603%2C85.8509783"
                className="h-full w-full border-0 pointer-events-none"
                loading="lazy"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
