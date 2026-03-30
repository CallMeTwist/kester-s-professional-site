import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

import { SectionHeading } from "./SectionHeading";
import { FadeIn }         from "./FadeIn";
import { C, CONTACT_INFO } from "@/data/portfolio";

/* ── EmailJS config ─────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = "service_hbo6r5c";
const EMAILJS_TEMPLATE_ID = "template_uelxdjl";
const EMAILJS_PUBLIC_KEY  = "hW1XRzt9mFTghJEbk";
const YOUR_EMAIL          = "Kestereluke6@gmail.com";

/* ── Types ──────────────────────────────────────────────────────────────── */
type FormData = {
  name:    string;
  email:   string;
  company: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

/* ── Validation ─────────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim())                      errors.name    = "Please enter your name";
  if (!form.email.trim())                     errors.email   = "Please enter your email";
  else if (!EMAIL_RE.test(form.email.trim())) errors.email   = "Please enter a valid email address";
  if (!form.message.trim())                   errors.message = "Please write a message";
  return errors;
}

/* ── Shake animation (fires on invalid submit) ──────────────────────────── */
const shakeVariants = {
  idle:  { x: 0 },
  shake: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

/* ── Floating label field ────────────────────────────────────────────────── */
interface FloatFieldProps {
  label:    string;
  name:     keyof FormData;
  type?:    string;
  value:    string;
  onChange: (v: string) => void;
  error?:   string;
  multi?:   boolean;
  shake?:   boolean;
}

const FloatField = ({
  label, name, type = "text", value, onChange, error, multi = false, shake = false,
}: FloatFieldProps) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || !!value;

  const shared = {
    name,
    value,
    onFocus:  () => setFocused(true),
    onBlur:   () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    style: {
      paddingTop: "1.3rem", paddingBottom: "0.4rem",
      fontSize: "var(--text-base)",
      background: "transparent", border: "none", outline: "none",
      width: "100%", color: C.cream,
      fontFamily: "'Barlow', sans-serif", fontWeight: 300,
      resize: "none" as const,
    },
  };

  return (
    <motion.div
      variants={shakeVariants}
      animate={shake ? "shake" : "idle"}
      style={{ position: "relative", marginBottom: error ? "1.4rem" : "2rem" }}
    >
      {/* Floating label */}
      <motion.label
        animate={{
          y:     lifted ? -20 : 0,
          scale: lifted ? 0.78 : 1,
          color: error ? "#e05555" : focused ? C.amber : C.muted,
        }}
        transition={{ duration: 0.22 }}
        style={{
          position: "absolute", top: "1.1rem", left: 0,
          transformOrigin: "left", pointerEvents: "none",
          fontSize: "var(--text-base)", fontFamily: "'Barlow', sans-serif",
        }}
      >
        {label}
        {name !== "company" && <span style={{ color: C.amber }}> *</span>}
      </motion.label>

      {multi ? <textarea {...shared} rows={4} /> : <input type={type} {...shared} />}

      {/* Animated underline */}
      <div style={{ position: "relative", height: 1, background: error ? "#e0555540" : C.border }}>
        <motion.div
          animate={{ scaleX: focused || !!error ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute", inset: 0,
            background: error ? "#e05555" : C.amber,
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Inline error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-mono"
            style={{
              fontSize: 9, color: "#e05555",
              letterSpacing: "0.1em", marginTop: 6,
              display: "flex", alignItems: "center", gap: 5,
            }}
          >
            <span aria-hidden>⚠</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Spinner icon ────────────────────────────────────────────────────────── */
const SpinnerIcon = () => (
  <motion.svg
    width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </motion.svg>
);

/* ── Section ─────────────────────────────────────────────────────────────── */
export const Contact = () => {
  const [form, setForm]         = useState<FormData>({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors]     = useState<FormErrors>({});
  const [shakeFields, setShake] = useState<(keyof FormData)[]>([]);
  const [status, setStatus]     = useState<"idle" | "sending" | "sent" | "error">("idle");

  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const upd = useCallback(
    (k: keyof FormData) => (v: string) => {
      setForm((f) => ({ ...f, [k]: v }));
      // Clear this field's error as soon as user types
      setErrors((e) => { const next = { ...e }; delete next[k]; return next; });
    },
    []
  );

  const submit = async () => {
    // Validate first — stop here if anything is wrong
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const invalid = Object.keys(errs) as (keyof FormData)[];
      setShake(invalid);
      setTimeout(() => setShake([]), 600);
      return; // do NOT proceed to send
    }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name.trim(),
          from_email: form.email.trim(),
          company:    form.company.trim() || "Not provided",
          message:    form.message.trim(),
          to_email:   YOUR_EMAIL,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: C.bg1, position: "relative" }}
    >
      <div className="section-rule" />
      <div className="section-inner">
        <div className="two-col">

          {/* ── LEFT: contact info ── */}
          <FadeIn x={-50} delay={0}>
            <SectionHeading
              idx="— 06"
              title={"Get In\nTouch"}
              sub="Available for QA/QC roles, NDT coordination, and project engagements across oil & gas sectors."
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {CONTACT_INFO.map((c) => (
                <div key={c.lbl}>
                  <div
                    className="font-mono"
                    style={{ fontSize: 9, color: C.amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}
                  >
                    {c.lbl}
                  </div>
                  {"href" in c && c.href ? (
                    <a
                      href={c.href as string}
                      style={{ color: C.cream, fontSize: "var(--text-base)", textDecoration: "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = C.amber)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = C.cream)}
                    >
                      {c.val}
                    </a>
                  ) : (
                    <div style={{ color: C.cream, fontSize: "var(--text-base)" }}>{c.val}</div>
                  )}
                </div>
              ))}
            </div>

            <p className="font-mono" style={{ fontSize: 9, color: C.muted, letterSpacing: "0.12em", marginTop: "2rem" }}>
              <span style={{ color: C.amber }}>*</span> Required fields
            </p>
          </FadeIn>

          {/* ── RIGHT: form ── */}
          <FadeIn x={50} delay={0.15}>
            <AnimatePresence mode="wait">

              {/* SUCCESS STATE */}
              {status === "sent" && (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: "clamp(2.5rem, 6vw, 4rem) 2rem", textAlign: "center",
                    border: `1px solid ${C.amberDim}`, background: C.amberGlow,
                  }}
                >
                  <div className="font-cond" style={{ fontSize: 56, fontWeight: 700, color: C.amber }}>✦</div>
                  <div
                    className="font-cond"
                    style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)", fontWeight: 700, color: C.cream, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0.75rem 0 0.5rem" }}
                  >
                    Message Sent
                  </div>
                  <div style={{ color: C.mutedHi, fontSize: "var(--text-sm)", lineHeight: 1.7 }}>
                    Your message has been delivered to Kester.<br />He'll respond within 24 hours.
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", company: "", message: "" });
                      setErrors({});
                    }}
                    style={{
                      marginTop: "1.75rem", background: "transparent", color: C.amber,
                      border: `1px solid ${C.amberDim}`, padding: "10px 24px", cursor: "pointer",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                    }}
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              )}

              {/* FORM STATE (idle, sending, or error) */}
              {status !== "sent" && (
                <motion.div key="form">
                  <FloatField
                    label="Full Name" name="name" value={form.name} onChange={upd("name")}
                    error={errors.name} shake={shakeFields.includes("name")}
                  />
                  <FloatField
                    label="Email Address" name="email" type="email" value={form.email} onChange={upd("email")}
                    error={errors.email} shake={shakeFields.includes("email")}
                  />
                  <FloatField
                    label="Company / Organisation (optional)" name="company"
                    value={form.company} onChange={upd("company")}
                  />
                  <FloatField
                    label="Your Message" name="message" value={form.message} onChange={upd("message")} multi
                    error={errors.message} shake={shakeFields.includes("message")}
                  />

                  {/* Send button */}
                  <motion.button
                    whileHover={{ scale: status === "sending" ? 1 : 1.03 }}
                    whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
                    onClick={submit}
                    disabled={status === "sending"}
                    style={{
                      width: "100%", padding: "1rem",
                      background: C.amber, color: C.bg, border: "none",
                      cursor: status === "sending" ? "wait" : "pointer",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500,
                      opacity: status === "sending" ? 0.75 : 1,
                      transition: "opacity 0.3s",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={status}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                      >
                        {status === "sending" ? <><SpinnerIcon /> Sending…</> : "Send Message →"}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>

                  {/* Send error fallback */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #e0555560", background: "#e0555510" }}
                    >
                      <p className="font-mono" style={{ fontSize: 9, color: "#e05555", letterSpacing: "0.12em" }}>
                        ⚠ Delivery failed — please email{" "}
                        <a href="mailto:Kestereluke6@gmail.com" style={{ color: C.amber }}>
                          Kestereluke6@gmail.com
                        </a>{" "}
                        directly.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="font-mono"
                        style={{ background: "none", border: "none", color: C.amber, cursor: "pointer", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 8 }}
                      >
                        ← Try Again
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </FadeIn>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;