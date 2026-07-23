import { motion, useInView } from "framer-motion";
import founder from "../assets/founder.png"
import { useRef } from "react";
import {
  Target,
  Lightbulb,
  TrendingUp,
  Heart,
} from "lucide-react";
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

const courses = [
  "Python Programming",
  "PGDCA",
  "Tally with GST",
  "MS Office Package",
  "Advanced Microsoft Excel",
  "Advanced Microsoft Word",
  "OS-CIT",
  "OS-CIT A",
  "OS-CIT A+",
  "Internet & Digital Skills",
  "Basic Computer Applications",
  "Advanced Computer Applications",
];

const Founder = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="about"
      className="py-6 bg-background"
      ref={ref}
    >
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            About Us
          </p>

          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Premium Computer Classes
          </h2>

          <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-600">
            Premium Computer Classes is a leading computer training institute
            committed to providing quality, practical, and career-oriented
            computer education. We believe that technology empowers people,
            and our mission is to equip students with the skills required
            to excel in academics, competitive examinations, and professional careers.
          </p>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">

            {/* Founder Image */}
            <div className="flex justify-center">
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <img
                  src={founder}
                  alt="Founder"
                  className="h-[500px] w-full object-cover"
                />
              </div>
            </div>

            {/* Founder Content */}
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                Founder
              </p>

              <h3 className="mb-4 text-4xl font-bold">
                Prof. Er. Swayam Swagatam Swain
              </h3>

              <p className="mb-4 leading-relaxed text-gray-600">
                An initiative by Prof. Er. Swayam Swagatam Swain,
                Premium Computer Classes combines experienced teaching,
                practical learning, and industry-relevant training to help
                every student build confidence and technical expertise.
              </p>

              <p className="mb-6 leading-relaxed text-gray-600">
                Our focus is on hands-on learning, individual attention,
                affordable education, and placement-oriented training.
                Whether you are a school student, college student,
                job seeker, working professional, or business owner,
                we have the right course to help you achieve your goals.
              </p>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-primary/10 p-5">
                  <h4 className="text-3xl font-bold text-primary">
                    2021
                  </h4>
                  <p className="text-gray-600">
                    Established
                  </p>
                </div>

                <div className="rounded-xl bg-primary/10 p-5">
                  <h4 className="text-3xl font-bold text-primary">
                    1000+
                  </h4>
                  <p className="text-gray-600">
                    Students Trained
                  </p>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

     

      </div>
    </section>
  );
};

export default Founder;