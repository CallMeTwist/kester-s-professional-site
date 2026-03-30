import { motion, useScroll, useSpring } from "framer-motion";
import { C } from "@/data/portfolio";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: C.amber,
        scaleX,
        transformOrigin: "0%",
        zIndex: 200,
        pointerEvents: "none",
      }}
    />
  );
};

export default ScrollProgress;
