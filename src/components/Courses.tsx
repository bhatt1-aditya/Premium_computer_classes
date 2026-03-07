import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

import coursePgdca from "@/assets/course-pgdca.jpg";
import courseDca from "@/assets/course-dca.jpg";
import coursePython from "@/assets/course-python.jpg";
import courseExcel from "@/assets/course-excel.jpg";
import courseGraphic from "@/assets/course-graphic.jpg";
import courseGenai from "@/assets/course-genai.jpg";

const courses = [
  {
    image: coursePgdca,
    title: "PGDCA",
    subtitle: "Post Graduate Diploma in Computer Application",
    description:
      "A comprehensive program covering advanced computing concepts, database management, programming languages, and IT project management for career-ready professionals.",
    duration: "1 Year",
  },
  {
    image: courseDca,
    title: "DCA",
    subtitle: "Diploma in Computer Application",
    description:
      "Master the essentials of computer applications including operating systems, office tools, internet technologies, and fundamental programming skills.",
    duration: "6 Months",
  },
  {
    image: coursePython,
    title: "Python",
    subtitle: "Python Programming",
    description:
      "Learn one of the world's most popular programming languages. From basics to advanced concepts like data structures, OOP, and automation scripting.",
    duration: "3 Months",
  },
  {
    image: courseExcel,
    title: "Advance EXCEL & MS Office",
    subtitle: "Microsoft Office Suite Mastery",
    description:
      "Master Excel formulas, macros, pivot tables, VBA, along with Word, PowerPoint, and Access for complete office productivity.",
    duration: "2 Months",
  },
  {
    image: courseGraphic,
    title: "Graphic Designs",
    subtitle: "Visual Design & Creativity",
    description:
      "Unleash your creativity with Photoshop, Illustrator, CorelDRAW, and Canva. Learn branding, UI design, and print media production.",
    duration: "3 Months",
  },
  {
    image: courseGenai,
    title: "GEN AI",
    subtitle: "Generative Artificial Intelligence",
    description:
      "Explore the cutting-edge world of AI. Learn prompt engineering, AI tools for productivity, image generation, and how to leverage AI in your career.",
    duration: "2 Months",
  },
];

const Courses = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    if (id.startsWith("/")) {
      navigate(id);
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="courses" className="section-padding gradient-navy" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-light-teal">
            Our Courses
          </p>
          <h2 className="mb-6 font-display text-3xl font-bold text-cream-light md:text-5xl">
            Programs That Shape{" "}
            <span className="text-gradient">Your Future</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-cream-light/60">
            Choose from our diverse range of industry-aligned courses designed to
            give you a competitive edge in the job market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="hover-lift group relative overflow-hidden rounded-2xl"
            >
              <img
                src={course.image}
                alt={course.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/85" />
              <div className="relative p-8">
                <div className="absolute right-4 top-4 rounded-full bg-light-teal/10 px-3 py-1 text-xs font-medium text-light-teal">
                  {course.duration}
                </div>
                <h3 className="mb-1 font-display text-2xl font-bold text-cream-light">
                  {course.title}
                </h3>
                <p className="mb-3 text-xs font-medium text-light-teal">
                  {course.subtitle}
                </p>
                <p className="mb-6 text-sm leading-relaxed text-cream-light/60">
                  {course.description}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => scrollTo("/contact")}
                    className="flex items-center gap-1 rounded-full bg-light-teal px-5 py-2 text-sm font-semibold text-navy transition-all hover:scale-105"
                  >
                    Enroll Now
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => scrollTo("#certificate")}
                    className="flex items-center gap-1 rounded-full border border-cream-light/20 px-5 py-2 text-sm font-medium text-cream-light transition-all hover:bg-cream-light/10"
                  >
                    <Award className="h-3.5 w-3.5" />
                    Certificate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
