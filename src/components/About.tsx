import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, TrendingUp, Heart } from "lucide-react";
import OurTeam from "./OurTeam";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To bridge the digital divide by providing world-class computer education accessible to everyone, enabling students to thrive in the modern workforce.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly update our curriculum to stay ahead of industry trends, ensuring our students learn the most relevant and in-demand skills.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Our courses are designed with employment in mind. We don't just teach — we prepare you for a successful career in technology.",
  },
  {
    icon: Heart,
    title: "Student First",
    description:
      "Every decision we make centers around our students' success. Personalized attention and mentorship are at the core of our teaching philosophy.",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            About Us
          </p>
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-5xl">
            Empowering Futures Since{" "}
            <span className="text-gradient">2021</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Established in 2021, Premium Computer Classes has been a beacon of
            quality computer education. We believe that technology skills are the
            key to unlocking limitless opportunities in today's digital world.
            Our institute is committed to nurturing talent, fostering creativity,
            and building a strong foundation for students to excel in their
            professional lives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="hover-lift group rounded-2xl bg-card p-8 card-shadow"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <OurTeam />
      </div>
    </section>
  );
};

export default About;
