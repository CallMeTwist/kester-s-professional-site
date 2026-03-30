import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { ImageSlot }      from "./ImageSlot";
import { FadeIn }         from "./FadeIn";
import { C, EXPERIENCES } from "@/data/portfolio";

/* ── Accordion card for one experience entry ─────────────────────────────── */
const ExpCard = ({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCES)[number];
  index: number;
}) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ border: `1px solid ${C.border}`, borderLeft: `2px solid ${exp.accent}`, overflow: "hidden" }}
    >
      {/* ── Header (clickable) ── */}
      <button
        onClick={() => setOpen(!open)}
        data-cur
        aria-expanded={open}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "clamp(1.25rem, 3vw, 1.75rem) clamp(1rem, 3vw, 2rem)",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, textAlign: "left",
        }}
      >
        <div style={{ flex: 1 }}>
          <div className="font-mono" style={{ fontSize: 9, color: exp.accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
            {exp.period} — {exp.tag}
          </div>
          <div
            className="font-cond"
            style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.75rem)", fontWeight: 700, color: C.cream, textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.1 }}
          >
            {exp.role}
          </div>
          <div style={{ fontSize: "var(--text-sm)", color: C.muted, marginTop: 4 }}>{exp.company}</div>
          <div style={{ fontSize: "var(--text-xs)", color: exp.accent, marginTop: 3, fontStyle: "italic" }}>
            "{exp.project}"
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.28 }}
          style={{
            width: 28, height: 28, border: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, color: exp.accent, fontSize: 20, lineHeight: 1,
          }}
        >
          +
        </motion.div>
      </button>

      {/* ── Expandable body ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 clamp(1rem, 3vw, 2rem) clamp(1.25rem, 3vw, 2rem)" }}>
              {/* Responsibilities + Achievements grid */}
              <div style={{ display: "grid", gridTemplateColumns: exp.achievements.length ? "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" : "1fr", gap: "1.5rem" }}>
                {/* Responsibilities */}
                <div>
                  <div className="font-mono" style={{ fontSize: 9, color: C.muted, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1rem" }}>
                    Responsibilities
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {exp.points.map((pt) => (
                      <li key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: exp.accent, marginTop: 5, flexShrink: 0, fontSize: 7 }}>◆</span>
                        <span style={{ color: C.mutedHi, fontSize: "var(--text-sm)", lineHeight: 1.65 }}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key achievements */}
                {exp.achievements.length > 0 && (
                  <div>
                    <div className="font-mono" style={{ fontSize: 9, color: C.muted, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1rem" }}>
                      Key Achievements
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {exp.achievements.map((ach) => (
                        <li
                          key={ach}
                          style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "0.65rem 0.85rem", background: `${exp.accent}10`, borderLeft: `2px solid ${exp.accent}` }}
                        >
                          <span style={{ color: exp.accent, marginTop: 4, flexShrink: 0, fontSize: 10 }}>✦</span>
                          <span style={{ color: C.cream, fontSize: "var(--text-sm)", lineHeight: 1.65 }}>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Section ─────────────────────────────────────────────────────────────── */
export const Experience = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section
      id="experience"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: C.bg, position: "relative" }}
    >
      <div className="section-rule" />

      <div className="section-inner">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "clamp(2.5rem, 6vw, 5rem)", alignItems: "start" }}>

          {/* ── LEFT: heading + IMAGE SLOT 2 ── */}
          <FadeIn x={-40} delay={0}>
            <SectionHeading
              idx="— 03"
              title={"Field\nExperience"}
              sub="Live oilfield environments. Real accountability. Proven delivery."
            />

            {/* ── IMAGE SLOT 2 ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, delay: 0.25 }}
            >
              <ImageSlot
                src="/kesfield.jpeg"
                alt="Field Inspection"
                label={"SLOT 2 — Place field.jpg in /public/\nSite inspection or project photo"}
                style={{ width: "100%", height: "clamp(200px, 30vw, 300px)" }}
              />

              {/* Quick-info strip */}
              <div
                style={{
                  marginTop: "1.25rem",
                  display: "flex",
                  gap: "clamp(1.25rem, 4vw, 2.5rem)",
                  borderTop: `1px solid ${C.border}`,
                  paddingTop: "1.25rem",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { v: "Gbaran CPF", u: "Location" },
                  { v: "RAEC",       u: "Client"   },
                  { v: "Feb 2025",   u: "Start"    },
                ].map((s) => (
                  <div key={s.u}>
                    <div className="font-cond" style={{ fontSize: "clamp(14px, 3vw, 18px)", fontWeight: 700, color: C.amber }}>{s.v}</div>
                    <div className="font-mono" style={{ fontSize: 9, color: C.muted, letterSpacing: "0.12em", marginTop: 2, textTransform: "uppercase" }}>{s.u}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </FadeIn>

          {/* ── RIGHT: accordion cards ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {EXPERIENCES.map((exp, i) => (
              <ExpCard key={exp.role + exp.period} exp={exp as any} index={i} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
