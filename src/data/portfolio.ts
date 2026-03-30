// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
export const C = {
  bg:        "#07090c",
  bg1:       "#0d1014",
  bg2:       "#111518",
  border:    "#1c2128",
  amber:     "#e07b2a",
  amberDim:  "#b85f18",
  amberGlow: "#e07b2a22",
  steel:     "#4a7fa5",
  cream:     "#dde4ec",
  muted:     "#52606d",
  mutedHi:   "#8898a8",
} as const;

// ─── NAV ─────────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  "About",
  "Experience",
  "Certifications",
  "Skills",
  "Contact",
] as const;

// ─── HERO STATS ──────────────────────────────────────────────────────────────
export const HERO_STATS = [
  { v: "0",   u: "Major NCRs"       },
  { v: "25%", u: "Faster Reporting" },
  { v: "21",  u: "Day TAM Delivered"},
] as const;

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────
export const EXPERIENCES = [
  {
    role:     "QA/QC Inspector",
    company:  "Seflam SGL Limited",
    project:  "Gbaran Phase 3B: UZU WITH CPF UPGRADE",
    client:   "Renaissance Africa Energy Company (RAEC)",
    period:   "February 2025 – Present",
    tag:      "Current Role",
    accent:   "#e07b2a",
    points: [
      "Overseeing QA/QC for mechanical works and coating applications — ASME, API, client standards",
      "Reviewing quality documentation, ITPs, WPS, method statements and MTCs",
      "Coordinating with construction, welding, painting, and subcontractor teams",
      "Preparing NCR reports, inspection records and audit-ready documentation",
      "Achieved zero major NCRs through proactive monitoring and early resolution",
      "Standardized inspection templates — reduced documentation turnaround time by 25%",
    ],
    achievements: [
      "21-day Turnaround Maintenance (TAM) — zero rework on all tie-in joints",
      "Verified welds, pressure tests, and full material traceability before commissioning",
      "On-time delivery of all TAM deliverables within the scheduled 21-day window",
      "Collaborated with cross-functional teams to efficiently clear all punch list items",
    ],
  },
  {
    role:     "QA/QC Trainee",
    company:  "Seflam SGL Limited",
    project:  "Port Harcourt Operations",
    client:   "Internal Training Programme",
    period:   "August 2024 – February 2025",
    tag:      "Trainee",
    accent:   "#4a7fa5",
    points: [
      "On-the-job training in QAQC processes, industry standards, and company procedures",
      "Assisted inspections of materials, components, and welds",
      "Supported NDT execution — RT, MT, PT techniques in the field",
      "Participated in preparation of test packs and inspection reports",
      "Maintained quality records and material traceability documentation",
      "Complied with QHSE policies and all regulatory requirements",
    ],
    achievements: [],
  },
] as const;

// ─── NDT METHODS ─────────────────────────────────────────────────────────────
export const NDT_METHODS = [
  { code: "VT", name: "Visual Testing",            desc: "Surface discontinuity detection through systematic visual examination" },
  { code: "MT", name: "Magnetic Particle Testing", desc: "Surface and near-surface flaw detection in ferromagnetic materials" },
  { code: "PT", name: "Dye Penetrant Testing",     desc: "Detection of surface-breaking defects via capillary action" },
  { code: "RT", name: "Radiographic Testing",      desc: "Volumetric inspection using X-ray or gamma-ray radiation" },
  { code: "UT", name: "Ultrasonic Testing",         desc: "Thickness measurement and flaw detection using ultrasonic sound waves" },
] as const;

// ─── SKILLS ──────────────────────────────────────────────────────────────────
export const SKILL_GROUPS = [
  {
    cat:   "Inspection",
    color: "#e07b2a",
    items: [
      { name: "Welding & Piping Inspection (ASME/API/AWS)", lvl: 95 },
      { name: "Pressure Testing & Material Traceability",   lvl: 92 },
      { name: "Coating Inspection",                          lvl: 88 },
      { name: "NDT Coordination (RT/UT/PT/MT)",             lvl: 93 },
    ],
  },
  {
    cat:   "Documentation",
    color: "#4a7fa5",
    items: [
      { name: "QA/QC Documentation & Mech. Completion", lvl: 95 },
      { name: "ITPs, WPS, Method Statements & MTCs",   lvl: 90 },
      { name: "NCR Preparation & Punch List Mgmt",     lvl: 88 },
      { name: "Audit Report Preparation",              lvl: 85 },
    ],
  },
  {
    cat:   "Standards",
    color: "#6a9c7e",
    items: [
      { name: "ASME Standards",          lvl: 94 },
      { name: "API Standards",           lvl: 92 },
      { name: "NACE Standards",          lvl: 85 },
      { name: "HSE Compliance & Audits", lvl: 90 },
    ],
  },
  {
    cat:   "Professional",
    color: "#8898a8",
    items: [
      { name: "Cross-functional Team Coordination", lvl: 93 },
      { name: "Client Interface & Reporting",       lvl: 90 },
      { name: "Turnaround Maintenance Support",     lvl: 92 },
      { name: "Problem Resolution",                 lvl: 88 },
    ],
  },
] as const;

// ─── CONTACT INFO ─────────────────────────────────────────────────────────────
export const CONTACT_INFO = [
  { lbl: "Email",        val: "Kestereluke6@gmail.com",            href: "mailto:Kestereluke6@gmail.com" },
  { lbl: "Phone",        val: "(+234) 8160035364",                  href: "tel:+2348160035364"           },
  { lbl: "Location",     val: "Port Harcourt, Rivers State, Nigeria" },
  { lbl: "Availability", val: "Open to new opportunities"           },
] as const;

// ─── EDUCATION ───────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    deg:  "MSc Environmental Chemistry",
    inst: "Ignatius Ajuru University of Education, Port Harcourt",
    yr:   "March 2024",
  },
  {
    deg:  "BSc Pure & Industrial Chemistry",
    inst: "University of Nigeria, Nsukka",
    yr:   "September 2019",
  },
] as const;

export const STANDARDS = ["ASME", "API", "NACE", "AWS", "SNT-TC-1A", "HSE"] as const;
