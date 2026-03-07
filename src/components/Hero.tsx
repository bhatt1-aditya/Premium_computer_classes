import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { icon: BookOpen, label: "Courses Offered", value: "6+" },
  { icon: Users, label: "Students Trained", value: "500+" },
  { icon: Award, label: "Years of Excellence", value: "4+" },
];

const Hero = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Computer Training"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 lg:px-8">
        <div className="max-w-3xl pt-20">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full border border-light-teal/30 bg-light-teal/10 px-4 py-1.5 text-sm font-medium tracking-wider text-light-teal"
          >
            // WELCOME TO PCC
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 font-display text-4xl font-bold leading-tight text-cream-light md:text-5xl lg:text-7xl"
          >
            Master{" "}
            <span className="text-gradient">Computer Skills</span>
            <br />
            with Confidence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 max-w-xl text-lg text-cream-light/70"
          >
            Transform your career with industry-leading computer courses. From
            programming to design, we empower you with skills that matter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="group flex items-center gap-2 rounded-full bg-light-teal px-8 py-3.5 font-semibold text-navy transition-all hover:scale-105 hover:shadow-xl"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("#courses")}
              className="flex items-center gap-2 rounded-full border-2 border-cream-light/30 px-8 py-3.5 font-semibold text-cream-light transition-all hover:border-cream-light/60 hover:bg-cream-light/10"
            >
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 gap-6 border-t border-cream-light/10 pt-8 sm:grid-cols-3"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-4"
            >
              <stat.icon className="h-8 w-8 text-light-teal" />
              <div>
                <p className="text-2xl font-bold text-cream-light">
                  {stat.value}
                </p>
                <p className="text-sm text-cream-light/60">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
