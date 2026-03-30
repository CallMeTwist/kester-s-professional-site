import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { FadeIn }         from "./FadeIn";
import { C, EDUCATION, STANDARDS } from "@/data/portfolio";

const CONTACT_ITEMS = [
  { lbl: "Email",    val: "Kestereluke6@gmail.com" },
  { lbl: "Phone",    val: "(+234) 8160035364"      },
  { lbl: "Location", val: "Port Harcourt, Rivers State, Nigeria" },
  { lbl: "DOB",      val: "October 18, 1999"       },
] as const;

export const About = () => {
  const ref   = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: C.bg1, position: "relative" }}
    >
      <div className="section-rule" />

      <div className="section-inner">
        <div className="two-col">

          {/* ── LEFT: bio + contact ── */}
          <FadeIn x={-50} delay={0}>
            <SectionHeading idx="— 02" title={"Quality\nDriven."} />

            <p style={{ color: C.mutedHi, lineHeight: 1.9, marginBottom: "1.4rem", fontSize: "var(--text-base)" }}>
              Quality-driven QA/QC Inspector with hands-on experience in oil and gas facility projects.
              Specializing in inspection, documentation, and compliance with{" "}
              <strong style={{ color: C.cream, fontWeight: 500 }}>ASME, API, and NACE standards</strong>.
            </p>
            <p style={{ color: C.mutedHi, lineHeight: 1.9, marginBottom: "2.5rem", fontSize: "var(--text-base)" }}>
              Proven ability to maintain zero major NCRs, streamline reporting processes, and coordinate
              cross-disciplinary teams to meet client quality expectations in live oilfield environments.
            </p>

            {/* Contact strip */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {CONTACT_ITEMS.map((item) => (
                <div key={item.lbl} style={{ display: "flex", gap: 16, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span
                    className="font-mono"
                    style={{ fontSize: 9, color: C.amber, letterSpacing: "0.2em", minWidth: 72, textTransform: "uppercase", flexShrink: 0 }}
                  >
                    {item.lbl}
                  </span>
                  <span style={{ color: C.cream, fontSize: "var(--text-sm)" }}>{item.val}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ── RIGHT: education + standards ── */}
          <FadeIn x={50} delay={0.15}>
            <div className="font-mono" style={{ fontSize: 9, color: C.amber, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              — Education
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.deg}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.12 }}
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

            {/* Standards badges */}
            <div className="font-mono" style={{ fontSize: 9, color: C.amber, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1rem" }}>
              — Standards
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {STANDARDS.map((s) => (
                <motion.div
                  key={s}
                  whileHover={{ scale: 1.05, borderColor: C.amber }}
                  style={{ border: `1px solid ${C.amberDim}`, padding: "5px 14px", background: C.amberGlow, cursor: "default" }}
                >
                  <span className="font-cond" style={{ fontSize: 14, fontWeight: 600, color: C.amber, letterSpacing: "0.08em" }}>{s}</span>
                </motion.div>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </motion.section>
  );
};

export default About;
