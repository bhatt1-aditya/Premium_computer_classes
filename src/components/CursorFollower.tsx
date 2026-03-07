import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CursorFollower = () => {
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const dotSpringConfig = { damping: 40, stiffness: 300 };
  const dotX = useSpring(0, dotSpringConfig);
  const dotY = useSpring(0, dotSpringConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [visible, x, y, dotX, dotY]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border-2 border-light-teal mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-light-teal"
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
};

export default CursorFollower;
