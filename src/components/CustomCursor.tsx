import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { C } from "@/data/portfolio";

export const CustomCursor = () => {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { damping: 28, stiffness: 700 });
  const sy = useSpring(my, { damping: 28, stiffness: 700 });
  const tx = useSpring(mx, { damping: 45, stiffness: 180 });
  const ty = useSpring(my, { damping: 45, stiffness: 180 });
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const over  = (e: Event)     => { if ((e.target as HTMLElement).closest("a,button,[data-cur]")) setHov(true); };
    const out   = ()             => setHov(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [mx, my]);

  const base: React.CSSProperties = {
    position: "fixed", top: 0, left: 0,
    pointerEvents: "none", zIndex: 9999,
    translateX: "-50%", translateY: "-50%",
  };

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot"
        style={{ ...base, x: sx, y: sy, width: 6, height: 6, borderRadius: "50%", background: C.amber }}
      />
      {/* Ring */}
      <motion.div
        className="cursor-ring"
        animate={{ width: hov ? 52 : 28, height: hov ? 52 : 28, opacity: hov ? 1 : 0.45 }}
        transition={{ duration: 0.2 }}
        style={{ ...base, x: tx, y: ty, border: `1px solid ${C.amber}`, borderRadius: "50%" }}
      />
    </>
  );
};

export default CustomCursor;
