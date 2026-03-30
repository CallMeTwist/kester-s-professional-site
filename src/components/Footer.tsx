import { motion } from "framer-motion";
import { C } from "@/data/portfolio";

export const Footer = () => (
  <footer
    style={{
      background: C.bg,
      borderTop: `1px solid ${C.border}`,
    }}
  >
    {/* ── Main footer row ── */}
    <div
      style={{
        padding: "1.75rem clamp(1.25rem, 7vw, 7rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {/* KE logo + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 28,
            height: 28,
            background: C.amber,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span className="font-cond" style={{ fontSize: 12, fontWeight: 700, color: C.bg }}>
            KE
          </span>
        </div>
        <span
          className="font-mono"
          style={{ fontSize: 9, color: C.muted, letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          Kester Eluke · QA/QC Inspector
        </span>
      </div>

      {/* Copyright */}
      <span className="font-mono" style={{ fontSize: 9, color: C.muted, letterSpacing: "0.12em" }}>
        © {new Date().getFullYear()} — All rights reserved
      </span>

      {/* Email link */}
      <a
        href="mailto:Kestereluke6@gmail.com"
        className="font-mono"
        style={{ fontSize: 9, color: C.amberDim, letterSpacing: "0.12em", textDecoration: "none" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = C.amber)}
        onMouseLeave={(e) => (e.currentTarget.style.color = C.amberDim)}
      >
        Kestereluke6@gmail.com
      </a>
    </div>

    {/* ── Powered by DevEd bar ── */}
    <div
      style={{
        borderTop: `1px solid ${C.border}`,
        padding: "0.9rem clamp(1.25rem, 7vw, 7rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <span className="font-mono" style={{ fontSize: 9, color: C.muted, letterSpacing: "0.14em" }}>
        Designed &amp; built by
      </span>

      <motion.a
        href="https://deved-portfolio.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}
      >
        {/* Small amber D square */}
        <div
          style={{
            width: 18,
            height: 18,
            background: C.amber,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            className="font-cond"
            style={{ fontSize: 9, fontWeight: 700, color: C.bg, letterSpacing: "0.04em" }}
          >
            D
          </span>
        </div>

        <span
          className="font-mono"
          style={{
            fontSize: 10,
            fontWeight: 500,
            color: C.amber,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          DevEd
        </span>
      </motion.a>
    </div>
  </footer>
);

export default Footer;