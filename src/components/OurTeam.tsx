import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TeamMember {
  id: string;
  name: string;
  subject: string;
  photo_url: string;
}

const OurTeam = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("team_members").select("*").order("created_at", { ascending: true });
      if (data) setMembers(data);
    };
    fetch();
  }, []);

  if (members.length === 0) return null;

  return (
    <div ref={ref} className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Our Team
        </p>
        <h3 className="font-display text-2xl font-bold text-foreground md:text-4xl">
          Meet Our <span className="text-gradient">Faculty</span>
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            className="hover-lift group rounded-2xl bg-card p-6 text-center card-shadow"
          >
            <img
              src={member.photo_url}
              alt={member.name}
              className="mx-auto mb-4 h-28 w-28 rounded-full object-cover ring-4 ring-primary/20"
              loading="lazy"
            />
            <h4 className="font-display text-lg font-semibold text-foreground">
              {member.name}
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">{member.subject}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
