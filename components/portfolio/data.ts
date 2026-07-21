export type PracticeArea = {
  index: string
  title: string
  description: string
  methods: readonly string[]
}

export const practiceAreas: readonly PracticeArea[] = [
  {
    index: "A",
    title: "Founder Practice",
    description: "Find the smallest credible version, ship it, and learn from the signal.",
    methods: ["Narrative & scope", "Launch systems", "Operating cadence"],
  },
  {
    index: "B",
    title: "Full-Stack Craft",
    description: "Carry an idea through interface, application logic, billing, and delivery.",
    methods: ["Next.js & TypeScript", "Payments & identity", "Design systems"],
  },
  {
    index: "C",
    title: "Data Storytelling",
    description: "Turn complex inputs into an interface that makes the next decision obvious.",
    methods: ["Data preparation", "Chart grammar", "Accessible dashboards"],
  },
]

export const tools = [
  { name: "Vercel", logo: "/vercel.svg" },
  { name: "Next.js", logo: "/logos/nextjs.svg" },
  { name: "Supabase", logo: "/logos/supabase.svg" },
  { name: "TypeScript", logo: "/logos/typescript.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
  { name: "Clerk", logo: "/logos/clerk.svg" },
] as const
