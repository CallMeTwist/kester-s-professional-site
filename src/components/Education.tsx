// Education component — standalone version for reuse
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { C, EDUCATION } from "@/data/portfolio";

export const Education = () => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref}>
      <div className="font-mono" style={{ fontSize: 9, color: C.amber, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
        — Education
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {EDUCATION.map((edu, i) => (
          <motion.div
            key={edu.deg}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12 }}
            whileHover={{ x: 6 }}
            style={{
              padding: "1.5rem",
              border: `1px solid ${C.border}`,
              borderLeft: `2px solid ${C.amber}`,
              background: `${C.bg}99`,
            }}
          >
            <div style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: C.cream, marginBottom: 4 }}>{edu.deg}</div>
            <div style={{ fontSize: "var(--text-xs)", color: C.muted, marginBottom: 8 }}>{edu.inst}</div>
            <div className="font-mono" style={{ fontSize: 9, color: C.amber, letterSpacing: "0.15em" }}>{edu.yr}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
