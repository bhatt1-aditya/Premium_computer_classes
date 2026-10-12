import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import founder from "../assets/founder.png";
import director from "../assets/director.png";
import trainer1 from "../assets/trainer.png";
import trainer2 from "../assets/trainer2.png";

const About = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="about"
      className="py-10 bg-background"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Founder & Lead Trainer Section */}
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
                Founder & Lead Trainer
              </p>

              <h3 className="mb-4 text-4xl font-bold">
                Prof. Er. Swayam Swagatam Swain
              </h3>

              <p className="mb-4 leading-relaxed text-gray-600">
                An initiative by Prof. Er. Swayam Swagatam Swain, Premium
                Computer Classes combines experienced teaching, practical
                learning, and industry-relevant training to help every student
                build confidence and technical expertise.
              </p>

              <p className="mb-6 leading-relaxed text-gray-600">
                Our focus is on hands-on learning, individual attention,
                affordable education, and placement-oriented training. Whether
                you are a school student, college student, job seeker, working
                professional, or business owner, we have the right course to
                help you achieve your goals.
              </p>

              <div className="rounded-2xl border-l-4 border-primary bg-primary/5 p-6">
                <p className="text-lg italic leading-relaxed text-gray-700">
                  "Every student has the potential to achieve greatness. My
                  mission is to transform that potential into skills,
                  confidence, and success through quality computer education."
                </p>

                <p className="mt-4 font-semibold text-primary">
                  — Er. Swayam Swagatam Swain
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Director's Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Director's Message
              </h2>

              <h3 className="text-2xl font-semibold mb-4">
                Er. Gyanaranjan Pradhan
              </h3>

              <p className="text-gray-600 leading-relaxed mb-4">
                It gives me immense pleasure to welcome you to Premium Computer
                Classes (PCC).
              </p>

              <p className="text-gray-600 leading-relaxed mb-4">
                In today's rapidly evolving digital world, computer education
                has become an essential foundation for academic excellence,
                professional success, and personal growth.
              </p>

              <p className="text-gray-600 leading-relaxed mb-4">
                Our mission is to empower students with the knowledge, skills,
                and confidence needed to excel in this technology-driven era.
              </p>

              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-xl">
                <p className="italic text-lg text-gray-700">
                  "Education is the key to opportunity, and technology is the
                  gateway to the future. Together, let's learn, grow, and
                  succeed."
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src={director}
                alt="Director"
                className="rounded-3xl shadow-xl h-[500px] w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Faculty Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Our Faculty
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Meet Our Expert Trainers
          </h2>
        </motion.div>

        {/* Trainers */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <img
              src={trainer1}
              alt="Trainer"
              className="w-40 h-40 object-cover rounded-full mx-auto mb-5"
            />

            <h3 className="text-2xl font-bold text-center">
              Prof. Paban Kumar Swain
            </h3>

            <p className="text-center text-primary mb-4">
              B.Tech, MBA, Ph.D. (Cont.)
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our mission is to provide practical, industry-oriented, and
              high-quality computer education that helps every student build
              confidence and achieve success in their academic and professional
              careers.
            </p>

            <p className="italic text-primary mt-4 text-center">
              "Knowledge grows when it is shared, and success comes to those
              who never stop learning."
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <img
              src={trainer2}
              alt="Trainer"
              className="w-40 h-40 object-cover rounded-full mx-auto mb-5"
            />

            <h3 className="text-2xl font-bold text-center">
              Ms. Swarnalata Jena
            </h3>

            <p className="text-center text-primary mb-4">
              Trainer
            </p>

            <p className="text-gray-600 leading-relaxed">
              Learning is a journey that opens the door to new opportunities and
              a brighter future. My aim is to create a supportive and engaging
              learning environment where every student can develop practical
              computer skills with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;