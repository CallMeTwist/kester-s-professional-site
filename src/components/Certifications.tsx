import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { ImageSlot }      from "./ImageSlot";
import { FadeIn }         from "./FadeIn";
import { C, NDT_METHODS } from "@/data/portfolio";

export const Certifications = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section
      id="certifications"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: C.bg1, position: "relative" }}
    >
      <div className="section-rule" />

      <div className="section-inner">
        <SectionHeading
          idx="— 04"
          title={"Certified\nProfessional"}
          sub="American Society for Nondestructive Testing (ASNT) — certified in accordance with SNT-TC-1A. Valid 2026."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "clamp(2.5rem, 6vw, 4rem)", alignItems: "start" }}>

          {/* ── LEFT: cert card + IMAGE SLOT 3 ── */}
          <FadeIn x={-40} delay={0}>
            {/* ASNT Level II badge card */}
            <div
              style={{
                border: `1px solid ${C.amberDim}`,
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                marginBottom: "1.75rem",
                position: "relative",
                background: C.amberGlow,
              }}
            >
              {/* Active badge */}
              <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                <div className="font-mono" style={{ fontSize: 9, color: C.amber, letterSpacing: "0.15em", border: `1px solid ${C.amberDim}`, padding: "3px 10px" }}>
                  ACTIVE · 2026
                </div>
              </div>

              <div className="font-mono" style={{ fontSize: 9, color: C.amber, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1rem" }}>
                ASNT Level II
              </div>
              <div
                className="font-cond"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", fontWeight: 700, color: C.cream, textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.1, marginBottom: "0.6rem" }}
              >
                Non-Destructive Testing
              </div>
              <div style={{ fontSize: "var(--text-sm)", color: C.muted, lineHeight: 1.75 }}>
                ASNT — issued in accordance with SNT-TC-1A. Qualified across 5 NDT disciplines covering VT, MT, PT, RT, and UT.
              </div>

              {/* Corner deco */}
              <div style={{ position: "absolute", bottom: 12, left: 12, width: 20, height: 20, borderBottom: `2px solid ${C.amber}`, borderLeft: `2px solid ${C.amber}` }} />
              <div style={{ position: "absolute", top: 12, right: 12, width: 20, height: 20, borderTop: `2px solid ${C.amber}`, borderRight: `2px solid ${C.amber}` }} />
            </div>

            {/* ── IMAGE SLOT 3 ── */}
            {/* <ImageSlot
              src="/cert.jpg"
              alt="Certification or NDT equipment"
              label={"SLOT 3 — Place cert.jpg in /public/\nCertification or NDT equipment photo"}
              style={{ width: "100%", height: "clamp(180px, 25vw, 240px)" }}
            /> */}
          </FadeIn>

          {/* ── RIGHT: NDT method list ── */}
          <div>
            <div className="font-mono" style={{ fontSize: 9, color: C.muted, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              — Qualified NDT Methods
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {NDT_METHODS.map((m, i) => (
                <motion.div
                  key={m.code}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 6, borderColor: C.amberDim }}
                  style={{
                    padding: "clamp(1rem, 2.5vw, 1.2rem) clamp(1rem, 2.5vw, 1.5rem)",
                    border: `1px solid ${C.border}`,
                    display: "flex",
                    gap: "clamp(0.75rem, 2vw, 1.25rem)",
                    alignItems: "flex-start",
                    cursor: "default",
                  }}
                >
                  <div
                    className="font-cond"
                    style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, color: C.amber, lineHeight: 1, minWidth: 40, textTransform: "uppercase", letterSpacing: "0.03em", flexShrink: 0 }}
                  >
                    {m.code}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, color: C.cream, fontSize: "var(--text-sm)", marginBottom: 3 }}>{m.name}</div>
                    <div style={{ fontSize: "var(--text-xs)", color: C.muted, lineHeight: 1.65 }}>{m.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Certifications;
