import { motion } from "framer-motion";
import { C } from "@/data/portfolio";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      {/* Amber KE mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: "2rem" }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            background: C.amber,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <span
            className="font-cond"
            style={{ fontSize: 22, fontWeight: 700, color: C.bg, letterSpacing: "0.04em" }}
          >
            KE
          </span>
        </div>
      </motion.div>

      {/* 404 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <div
          className="font-cond"
          style={{
            fontSize: "clamp(5rem, 20vw, 10rem)",
            fontWeight: 700,
            color: C.amber,
            lineHeight: 1,
            letterSpacing: "0.04em",
          }}
        >
          404
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        <p
          className="font-mono"
          style={{
            fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
            color: C.muted,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          — Page not found
        </p>

        <motion.a
          href="/"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            display: "inline-block",
            background: C.amber,
            color: C.bg,
            padding: "12px 28px",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          ← Return Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
