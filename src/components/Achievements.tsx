// Achievements component — reusable list of highlighted achievements
// Used inside Experience accordion and can be used standalone elsewhere

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { C } from "@/data/portfolio";

interface AchievementsProps {
  items: readonly string[];
  accent?: string;
}

export const Achievements = ({ items, accent = C.amber }: AchievementsProps) => {
  const ref    = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  if (!items.length) return null;

  return (
    <ul ref={ref} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {items.map((ach, i) => (
        <motion.li
          key={ach}
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.08 }}
          style={{
            display: "flex", gap: 10, alignItems: "flex-start",
            padding: "0.65rem 0.85rem",
            background: `${accent}10`,
            borderLeft: `2px solid ${accent}`,
          }}
        >
          <span style={{ color: accent, marginTop: 4, flexShrink: 0, fontSize: 10 }}>✦</span>
          <span style={{ color: C.cream, fontSize: "var(--text-sm)", lineHeight: 1.65 }}>{ach}</span>
        </motion.li>
      ))}
    </ul>
  );
};

export default Achievements;
