import { motion } from "framer-motion";
import { C } from "@/data/portfolio";

interface NavLinkProps {
  label: string;
  delay?: number;
  onClick: () => void;
}

export const NavLink = ({ label, delay = 0, onClick }: NavLinkProps) => (
  <motion.button
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    onClick={onClick}
    className="font-mono"
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 11,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      position: "relative",
      padding: "4px 0",
    }}
  >
    <motion.span
      whileHover={{ color: C.cream }}
      style={{ display: "block", transition: "color 0.25s" }}
    >
      {label}
    </motion.span>
    <motion.span
      whileHover={{ scaleX: 1 }}
      initial={{ scaleX: 0 }}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: C.amber,
        transformOrigin: "left",
      }}
    />
  </motion.button>
);

export default NavLink;
