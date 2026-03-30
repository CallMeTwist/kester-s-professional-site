import { useState } from "react";
import { motion } from "framer-motion";
import { C } from "@/data/portfolio";

interface ImageSlotProps {
  src?: string;
  alt: string;
  label: string;
  style?: React.CSSProperties;
  className?: string;
}

const CameraIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.amberDim} strokeWidth="1.5" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export const ImageSlot = ({ src, alt, label, style = {}, className }: ImageSlotProps) => {
  const [loaded, setLoaded] = useState(false);
  const [err,    setErr]    = useState(false);
  const show = src && !err;

  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {show ? (
        <>
          <motion.img
            src={src}
            alt={alt}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: loaded ? 1 : 1.1, opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            onLoad={() => setLoaded(true)}
            onError={() => setErr(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              filter: "contrast(1.05) brightness(0.78)",
              display: "block",
            }}
          />
          {/* Amber scan sweep on mount */}
          <motion.div
            initial={{ top: "-5%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 1.6, delay: 0.5, ease: "linear" }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(to right, transparent, ${C.amber}, transparent)`,
              boxShadow: `0 0 16px ${C.amber}`,
              pointerEvents: "none",
            }}
          />
        </>
      ) : (
        /* Placeholder */
        <div
          style={{
            width: "100%",
            height: "100%",
            background: C.bg2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: `1px dashed ${C.border}`,
            gap: 14,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              border: `2px solid ${C.amberDim}`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CameraIcon />
          </div>
          <span
            className="font-mono"
            style={{
              fontSize: 9,
              color: C.muted,
              letterSpacing: "0.14em",
              textAlign: "center",
              padding: "0 1.25rem",
              whiteSpace: "pre-line",
              lineHeight: 1.8,
            }}
          >
            {label}
          </span>
        </div>
      )}

      {/* Precision corner brackets */}
      {(["tl", "tr", "bl", "br"] as const).map((corner) => (
        <div
          key={corner}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 18,
            height: 18,
            pointerEvents: "none",
            top:    corner[0] === "t" ? 8 : "auto",
            bottom: corner[0] === "b" ? 8 : "auto",
            left:   corner[1] === "l" ? 8 : "auto",
            right:  corner[1] === "r" ? 8 : "auto",
            borderTop:    corner[0] === "t" ? `2px solid ${C.amber}` : "none",
            borderBottom: corner[0] === "b" ? `2px solid ${C.amber}` : "none",
            borderLeft:   corner[1] === "l" ? `2px solid ${C.amber}` : "none",
            borderRight:  corner[1] === "r" ? `2px solid ${C.amber}` : "none",
          }}
        />
      ))}
    </div>
  );
};

export default ImageSlot;
