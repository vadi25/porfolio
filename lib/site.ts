import { projects } from "@/lib/projects"

export const person = {
  name: "Javier Sánchez Vadillo",
  greeting: "Hi, I'm Javier Sánchez Vadillo.",
  role: "Founder & Product Engineer",
  email: "javiersvadillo@gmail.com",
  haiku: ["one small penguin", "swims an ocean of noise", "snow keeps its own time"],
  bio: [
    "Founder and product engineer working across product direction, interface systems, and full-stack delivery.",
    "I turn stubborn ideas into shipped products.",
  ],
} as const

export type SiteLink = {
  label: string
  href: string
  external?: boolean
}

export const siteLinks: readonly SiteLink[] = [
  { label: "email", href: `mailto:${person.email}` },
  { label: "blog", href: "/blog" },
  ...projects.flatMap((project) => {
    const links: SiteLink[] = [{ label: project.name.toLowerCase(), href: project.url, external: true }]
    if (project.caseStudyHref) links.push({ label: "case study", href: project.caseStudyHref })
    return links
  }),
]

export function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (configured) return configured.replace(/\/$/, "")
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}
