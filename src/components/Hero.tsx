import { motion, useScroll, useTransform } from "framer-motion";
import { TechParticles } from "./TechParticles";
import { ImageSlot }     from "./ImageSlot";
import { C, HERO_STATS } from "@/data/portfolio";

const scrollToSection = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const Hero = () => {
  const { scrollY } = useScroll();

  // Parallax — desktop only (mobile uses CSS to turn off)
  const textY = useTransform(scrollY, [0, 600], [0, -80]);
  const imgY  = useTransform(scrollY, [0, 600], [0,  60]);
  const fade  = useTransform(scrollY, [0, 350], [1,   0]);

  return (
    <>
      {/* ── MOBILE HERO ──────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="hero-mobile"
        style={{ position: "relative", overflow: "hidden", background: C.bg }}
      >
        {/* Three.js particles behind everything */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <TechParticles />
        </div>

        {/* ── IMAGE: full-width, top of screen on mobile ── */}
        <div style={{ position: "relative", width: "100%", height: "55vmax", maxHeight: 500, zIndex: 1 }}>
          <ImageSlot
            src="/kesboy.PNG"
            alt="Kester Eluke"
            label={"SLOT 1 — Place hero.jpg in /public/\nYour professional portrait"}
            style={{ width: "100%", height: "100%" }}
          />
          {/* Bottom gradient fade into dark bg */}
          <div
            style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "60%",
              background: `linear-gradient(to top, ${C.bg}, transparent)`,
              pointerEvents: "none",
            }}
          />
          {/* Particle overlay so particles show through */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "transparent",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        </div>

        {/* ── TEXT content stacked below image ── */}
        <div style={{ position: "relative", zIndex: 2, padding: "2rem clamp(1.25rem, 6vw, 3rem) 4rem" }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}
          >
            <div style={{ width: 24, height: 2, background: C.amber }} />
            <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.22em", color: C.amber, textTransform: "uppercase" }}>
              QA / QC Inspector · Oil & Gas
            </span>
          </motion.div>

          {/* Name */}
          <div className="font-cond" style={{ marginBottom: "0.6rem" }}>
            {["Kester", "Eluke"].map((word, i) => (
              <div key={word} style={{ overflow: "hidden", lineHeight: 0.88 }}>
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: "clamp(3.2rem, 15vw, 6rem)",
                    fontWeight: 700,
                    color: i === 0 ? C.cream : C.amber,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    paddingBottom: "0.04em",
                  }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1,
              background: `linear-gradient(to right, ${C.amberDim}, transparent)`,
              transformOrigin: "left",
              marginBottom: "1.25rem",
              maxWidth: 280,
            }}
          />

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            style={{ fontSize: "clamp(0.82rem, 3.5vw, 0.92rem)", color: C.mutedHi, lineHeight: 1.8, marginBottom: "2rem", maxWidth: 380 }}
          >
            ASNT Level II NDT professional with proven field experience at live oilfield facilities. Zero major NCRs. Precision-driven quality assurance.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            style={{ display: "flex", gap: "clamp(1.25rem, 5vw, 2.5rem)", marginBottom: "2rem", flexWrap: "wrap" }}
          >
            {HERO_STATS.map((s) => (
              <div key={s.u}>
                <div className="font-cond" style={{ fontSize: "clamp(1.8rem, 7vw, 2.8rem)", fontWeight: 700, color: C.amber, lineHeight: 1 }}>{s.v}</div>
                <div className="font-mono" style={{ fontSize: 9, color: C.muted, letterSpacing: "0.14em", marginTop: 4, textTransform: "uppercase" }}>{s.u}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("experience")}
              style={{ background: C.amber, color: C.bg, border: "none", padding: "12px 26px", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}
            >
              View Experience
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: C.cream, color: C.cream }} whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("contact")}
              style={{ background: "transparent", color: C.muted, border: `1px solid ${C.border}`, padding: "12px 26px", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", transition: "all 0.3s" }}
            >
              Contact
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── DESKTOP HERO ─────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="hero-desktop"
        style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: C.bg }}
      >
        {/* Three.js */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <TechParticles />
        </div>

        {/* Radial vignette */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: `radial-gradient(ellipse 80% 70% at 30% 55%, transparent 20%, ${C.bg}cc 100%)`,
            pointerEvents: "none",
          }}
        />

        {/* Diagonal split keeping left text readable */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: `linear-gradient(108deg, ${C.bg} 0%, ${C.bg} 52%, transparent 52.5%)`,
            pointerEvents: "none",
          }}
        />

        {/* ── IMAGE SLOT 1: right diagonal panel ── */}
        <motion.div
          style={{
            position: "absolute", top: 0, right: 0,
            width: "50%", height: "100%",
            zIndex: 1, y: imgY,
          }}
        >
          <ImageSlot
            src="/kestermain1.PNG"
            alt="Kester Eluke"
            label={"SLOT 1 — Place hero.jpg in /public/\nYour professional portrait photo"}
            style={{ width: "100%", height: "100%" }}
          />
          {/* Feather into left panel */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${C.bg} 0%, transparent 18%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: `linear-gradient(to top, ${C.bg}, transparent)`, pointerEvents: "none" }} />
        </motion.div>

        {/* ── LEFT TEXT ── */}
        <motion.div
          style={{
            position: "relative", zIndex: 2,
            width: "58%", minHeight: "100vh",
            display: "flex", flexDirection: "column", justifyContent: "center",
            paddingLeft: "clamp(2rem, 6vw, 7rem)",
            paddingRight: "3rem",
            y: textY, opacity: fade,
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.75rem" }}
          >
            <div style={{ width: 28, height: 2, background: C.amber }} />
            <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: C.amber, textTransform: "uppercase" }}>
              QA / QC Inspector · Oil & Gas
            </span>
          </motion.div>

          {/* Name */}
          <div className="font-cond" style={{ marginBottom: "0.5rem" }}>
            {["Kester", "Eluke"].map((word, i) => (
              <div key={word} style={{ overflow: "hidden", lineHeight: 0.9 }}>
                <motion.div
                  initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontSize: "clamp(4rem, 9vw, 10rem)", fontWeight: 700, color: i === 0 ? C.cream : C.amber, letterSpacing: "0.02em", textTransform: "uppercase", paddingBottom: "0.04em" }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 1, background: `linear-gradient(to right, ${C.amberDim}, transparent)`, transformOrigin: "left", marginBottom: "1.75rem", maxWidth: 400 }}
          />

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)", color: C.mutedHi, lineHeight: 1.85, maxWidth: 400, marginBottom: "2.5rem", fontWeight: 300 }}
          >
            ASNT Level II NDT professional with proven field experience at live oilfield facilities. Zero major NCRs. Precision-driven quality assurance.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            style={{ display: "flex", gap: "2.5rem", marginBottom: "2.75rem", flexWrap: "wrap" }}
          >
            {HERO_STATS.map((s) => (
              <div key={s.u}>
                <div className="font-cond" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: C.amber, lineHeight: 1 }}>{s.v}</div>
                <div className="font-mono" style={{ fontSize: 9, color: C.muted, letterSpacing: "0.15em", marginTop: 4, textTransform: "uppercase" }}>{s.u}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("experience")}
              style={{ background: C.amber, color: C.bg, border: "none", padding: "13px 30px", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}
            >
              View Experience
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: C.cream, color: C.cream }} whileTap={{ scale: 0.96 }}
              onClick={() => scrollToSection("contact")}
              style={{ background: "transparent", color: C.muted, border: `1px solid ${C.border}`, padding: "13px 30px", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", transition: "all 0.3s" }}
            >
              Contact
            </motion.button>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            style={{ position: "absolute", bottom: "2.5rem", left: "clamp(2rem, 6vw, 7rem)", display: "flex", alignItems: "center", gap: 10 }}
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
              <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${C.amber}, transparent)` }} />
            </motion.div>
            {/* <span className="font-mono" style={{ fontSize: 9, color: C.muted, letterSpacing: "0.18em", textTransform: "uppercase" }}>Scroll</span> */}
          </motion.div>
        </motion.div>

        {/* Page index */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="font-mono"
          style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", zIndex: 2, fontSize: 10, color: C.muted, letterSpacing: "0.12em" }}
        >
          01 / 06
        </motion.div>
      </section>

      {/* Responsive visibility */}
      <style>{`
        .hero-mobile  { display: block;  }
        .hero-desktop { display: none;   }
        @media (min-width: 768px) {
          .hero-mobile  { display: none;  }
          .hero-desktop { display: block; }
        }
      `}</style>
    </>
  );
};

export default Hero;
