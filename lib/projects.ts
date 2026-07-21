export type Project = {
  number: string
  name: string
  url: string
  role: string
  tagline: string
  description: string
  proofs: readonly string[]
  featured?: boolean
  caseStudyHref?: string
}

export const projects: readonly Project[] = [
  {
    number: "01",
    name: "NotCode",
    url: "https://notcode.rairai.xyz",
    caseStudyHref: "/work/notcode",
    role: "Creator · product · native macOS",
    tagline: "Leave the coding agent. Keep the signal.",
    description:
      "A native macOS menu-bar companion that alerts you locally—or by privacy-minimized WhatsApp status—when Claude Code, Codex CLI, or Cursor needs attention.",
    proofs: [
      "Native Swift menu-bar app with standalone hooks for 3 coding agents",
      "Presence-aware local sound and optional WhatsApp status",
      "Free, MIT-licensed, and built to chain with existing configuration",
    ],
    featured: true,
  },
  {
    number: "02",
    name: "Unicourse",
    url: "https://unicourse.education",
    role: "Founder · product · full-stack",
    tagline: "A marketplace where top students teach what they know.",
    description:
      "A campus-first learning product where standout students package university-aligned courses for their peers.",
    proofs: [
      "Course authoring and approval workflows",
      "Stripe storefront with split payouts",
      "Creator and administrator analytics",
    ],
  },
  {
    number: "03",
    name: "Graphv0",
    url: "https://graphv0.vercel.app",
    role: "Founder · product · AI integrations",
    tagline: "Turn an unruly CSV into a chart worth showing.",
    description:
      "A focused, one-off purchase flow that interprets uploaded data and returns polished visualisations for decks or live embeds.",
    proofs: [
      "Prompt pipelines for messy datasets",
      "Dynamic chart composition and sharing",
      "Single-payment delivery flow",
    ],
  },
  {
    number: "04",
    name: "Called",
    url: "https://called-demo.vercel.app",
    role: "Product · integrations · UX flows",
    tagline: "Scheduling shaped like a conversation.",
    description:
      "A calendar-native assistant that interprets requests, books meetings, and drafts follow-ups around a connected Google Calendar.",
    proofs: [
      "Natural-language scheduling interface",
      "Clerk and Google OAuth account model",
      "Stripe billing experiments",
    ],
  },
  {
    number: "05",
    name: "OpenCut",
    url: "https://opencut.app",
    role: "Open-source contributor",
    tagline: "Fast video editing in an open codebase.",
    description:
      "Community contributions to timeline tooling, export stability, and interface polish inside a high-velocity open-source editor.",
    proofs: [
      "Keyframe scrubbing and preview work",
      "Panel-layout refinements",
      "Quality-of-life changes alongside maintainers",
    ],
  },
  {
    number: "06",
    name: "DataLighthouse",
    url: "https://datalighthouse.dev",
    role: "Creator · developer experience",
    tagline: "Analytics building blocks for Next.js teams.",
    description:
      "A reusable starter for teams that need clear data storytelling inside their product without rebuilding a dashboard system.",
    proofs: [
      "Responsive chart primitives",
      "Theme-aware component system",
      "Supabase and server-action examples",
    ],
  },
]
