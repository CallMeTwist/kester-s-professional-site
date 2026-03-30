import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "./NavLink";
import { C, NAV_LINKS } from "@/data/portfolio";

const scrollTo = (id: string) =>
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => {
    scrollTo(id);
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 64,
          padding: "0 clamp(1.25rem, 5vw, 5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? `${C.bg1}f0` : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "none",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        {/* ── KE LOGO ── */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            userSelect: "none",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              background: C.amber,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              className="font-cond"
              style={{ fontSize: 16, fontWeight: 700, color: C.bg, letterSpacing: "0.04em" }}
            >
              KE
            </span>
          </div>
          <span
            className="font-mono"
            style={{
              fontSize: 9,
              letterSpacing: "0.18em",
              color: C.mutedHi,
              textTransform: "uppercase",
              display: "none", // hidden on very small screens, shown via below
            }}
            id="nav-title"
          >
            QA/QC Inspector
          </span>
        </motion.div>

        {/* ── DESKTOP LINKS ── */}
        <nav
          style={{
            display: "flex",
            gap: "2.5rem",
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((lnk, i) => (
            <NavLink
              key={lnk}
              label={lnk}
              delay={0.08 * i + 0.4}
              onClick={() => go(lnk)}
            />
          ))}
        </nav>

        {/* ── HAMBURGER ── */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 10,
            display: "none",
          }}
          className="nav-hamburger"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 5, width: 24 }}>
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                animate={{
                  rotate: open ? (i === 0 ? 45 : -45) : 0,
                  y:      open ? (i === 0 ? 9  : -9)  : 0,
                }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  height: 1.5,
                  width: "100%",
                  background: C.cream,
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </button>
      </motion.nav>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 98,
                background: `${C.bg}80`,
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(320px, 100vw)",
                zIndex: 99,
                background: C.bg1,
                borderLeft: `1px solid ${C.border}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "2rem clamp(2rem, 8vw, 4rem)",
                gap: "2.5rem",
              }}
            >
              {/* KE in panel */}
              <div style={{ position: "absolute", top: "1.5rem", left: "2rem", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, background: C.amber, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="font-cond" style={{ fontSize: 13, fontWeight: 700, color: C.bg }}>KE</span>
                </div>
              </div>

              {NAV_LINKS.map((lnk, i) => (
                <motion.button
                  key={lnk}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => go(lnk)}
                  className="font-cond"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: C.cream,
                    fontSize: "clamp(2rem, 9vw, 3rem)",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    textAlign: "left",
                    padding: 0,
                    lineHeight: 1.1,
                  }}
                >
                  <motion.span
                    whileHover={{ color: C.amber }}
                    style={{ display: "block", transition: "color 0.2s" }}
                  >
                    {lnk}
                  </motion.span>
                </motion.button>
              ))}

              {/* Bottom email */}
              <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
                <div style={{ height: 1, background: C.border, marginBottom: "1rem" }} />
                <a
                  href="mailto:Kestereluke6@gmail.com"
                  className="font-mono"
                  style={{ fontSize: 10, color: C.amber, letterSpacing: "0.14em", textDecoration: "none" }}
                >
                  Kestereluke6@gmail.com
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Inline responsive styles for nav */}
      <style>{`
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-hamburger { display: none !important; }
          #nav-title { display: block !important; }
        }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
