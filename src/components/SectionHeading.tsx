import { C } from "@/data/portfolio";

interface SectionHeadingProps {
  idx: string;
  title: string;
  sub?: string;
}

export const SectionHeading = ({ idx, title, sub }: SectionHeadingProps) => (
  <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: "0.8rem",
      }}
    >
      <span
        className="font-mono"
        style={{ fontSize: 10, color: C.amber, letterSpacing: "0.22em" }}
      >
        {idx}
      </span>
      <div style={{ width: 36, height: 2, background: C.amber }} />
    </div>

    <h2
      className="font-cond"
      style={{
        fontSize: "clamp(2rem, 5vw, 5rem)",
        fontWeight: 700,
        color: C.cream,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        lineHeight: 1,
        whiteSpace: "pre-line",
      }}
    >
      {title}
    </h2>

    {sub && (
      <p
        style={{
          marginTop: "0.9rem",
          color: C.muted,
          fontSize: "clamp(0.8rem, 1.5vw, 0.88rem)",
          maxWidth: 480,
          lineHeight: 1.75,
        }}
      >
        {sub}
      </p>
    )}
  </div>
);

export default SectionHeading;
