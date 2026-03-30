import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { FadeIn }         from "./FadeIn";
import { C, SKILL_GROUPS } from "@/data/portfolio";

/* ── Animated bar ────────────────────────────────────────────────────────── */
const Bar = ({ lvl, color }: { lvl: number; color: string }) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ height: 2, background: C.border, marginTop: 5 }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${lvl}%` } : {}}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: "100%", background: color }}
      />
    </div>
  );
};

/* ── Section ─────────────────────────────────────────────────────────────── */
export const Skills = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section
      id="skills"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: C.bg, position: "relative" }}
    >
      <div className="section-rule" />

      <div className="section-inner">
        <FadeIn delay={0}>
          <SectionHeading idx="— 05" title={"Core\nSkills"} />
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: "clamp(2rem, 5vw, 3.5rem)",
          }}
        >
          {SKILL_GROUPS.map((grp, gi) => (
            <motion.div
              key={grp.cat}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.1, duration: 0.8 }}
            >
              {/* Category label */}
              <div
                className="font-mono"
                style={{
                  fontSize: 9,
                  color: grp.color,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div style={{ width: 16, height: 2, background: grp.color, flexShrink: 0 }} />
                {grp.cat}
              </div>

              {/* Skills */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {grp.items.map((sk) => (
                  <div key={sk.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontSize: "var(--text-xs)", color: C.mutedHi, lineHeight: 1.4 }}>{sk.name}</span>
                      <span className="font-mono" style={{ fontSize: 9, color: C.muted, flexShrink: 0 }}>{sk.lvl}%</span>
                    </div>
                    <Bar lvl={sk.lvl} color={grp.color} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
