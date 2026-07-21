import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check, Mail, Sparkles } from "lucide-react"

import { RevealObserver } from "@/components/reveal-observer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Project = {
  name: string
  url: string
  tagline: string
  description: string
  highlights: string[]
  role: string
}

type FocusArea = {
  title: string
  description: string
  points: string[]
}

type TechStackItem = {
  name: string
  logo: string
  description: string
}

const projects: Project[] = [
  {
    name: "NotCode",
    url: "https://notcode.rairai.xyz",
    tagline: "Walk away from coding agents without missing the moment they need you",
    description:
      "A native macOS menu-bar app that plays local alerts and, when you are away, sends privacy-minimized WhatsApp status for Claude Code, Codex CLI, and Cursor.",
    highlights: [
      "Native Swift menu-bar app with standalone hooks for three coding agents",
      "Presence-aware sound and optional WhatsApp alerts without sending code",
      "Free, MIT-licensed, and able to chain with existing agent configuration",
    ],
    role: "Creator · product · native macOS",
  },
  {
    name: "Unicourse",
    url: "https://unicourse.education",
    tagline: "Peer-to-peer learning marketplace for top students",
    description:
      "Full product build for a campus-first marketplace where standout students package their know-how into premium, university-aligned courses.",
    highlights: [
      "Course authoring studio with approval workflows",
      "Stripe powered storefront with split payouts",
      "Analytics dashboards for creators and administrators",
    ],
    role: "Founder · product · full-stack",
  },
  {
    name: "Graphv0",
    url: "https://graphv0.vercel.app",
    tagline: "AI analytics on demand, delivered as polished charts",
    description:
      "A one-off purchase experience where users drop a CSV and receive fully themed visualisations in seconds, ready for decks or live embeds.",
    highlights: [
      "LLM prompt pipelines to interpret messy datasets",
      "Dynamic chart compositor with shareable embeds",
      "Stripe single-payment flow and instant delivery",
    ],
    role: "Founder · product · AI integrations",
  },
  {
    name: "Called",
    url: "https://called-demo.vercel.app",
    tagline: "Calendar-native AI assistant for founders and operators",
    description:
      "Conversational agent that understands your schedule, books meetings, and writes follow-ups using Clerk auth with Google Calendar sync.",
    highlights: [
      "Natural language scheduling over a chat interface",
      "Multi-tenant account model with Clerk + Google OAuth",
      "Usage-based billing experiments layered on Stripe",
    ],
    role: "Product · integrations · UX flows",
  },
  {
    name: "Opencut",
    url: "https://opencut.app",
    tagline: "Open-source CapCut alternative for fast video edits",
    description:
      "Community contributions to timeline tooling, export stability, and UI polish inside a high-velocity, collaborative project.",
    highlights: [
      "Improved keyframe scrubbing and preview accuracy",
      "Refined panel layout for faster editing muscle memory",
      "Quality-of-life PRs merged alongside core maintainers",
    ],
    role: "Open-source contributor",
  },
  {
    name: "DataLighthouse",
    url: "https://datalighthouse.dev",
    tagline: "Plug-and-play analytics templates for Next.js teams",
    description:
      "Productised starter with reusable components so builders can ship data storytelling straight inside their apps without reinventing dashboards.",
    highlights: [
      "Responsive chart blocks with copy-paste snippets",
      "Theme-aware design system powered by Tailwind",
      "Example integrations for Supabase and server actions",
    ],
    role: "Creator · developer experience",
  },
]

const focusAreas: FocusArea[] = [
  {
    title: "Founder mindset",
    description:
      "From zero to first revenue with a bias for signal-rich experiments and relentless scope shaping.",
    points: [
      "Narratives that rally investors, teammates, and users",
      "Launch plans that cut through noise and ship",
      "Operator rituals that keep momentum compounding",
    ],
  },
  {
    title: "Full-stack craft",
    description:
      "Design, build, and deploy end-to-end experiences with modern TypeScript, data, and AI-native tooling.",
    points: [
      "Next.js, React Server Components, edge delivery",
      "Stripe, Clerk, Google APIs, and AI orchestration",
      "Design systems that scale across products",
    ],
  },
  {
    title: "Data storytelling",
    description:
      "Bring insight to the surface with visual narratives that invite action from operators and execs.",
    points: [
      "LLM-assisted data prep and validation",
      "Reusable chart primitives with accessible defaults",
      "Interactive dashboards tuned for clarity",
    ],
  },
]

const techStack: TechStackItem[] = [
  {
    name: "Vercel",
    logo: "/vercel.svg",
    description: "Edge-first delivery, preview workflows, and DX superpowers.",
  },
  {
    name: "Next.js",
    logo: "/logos/nextjs.svg",
    description: "Hybrid app router builds with streamed UX and server actions.",
  },
  {
    name: "Supabase",
    logo: "/logos/supabase.svg",
    description: "Realtime data, auth, and storage that scales with product velocity.",
  },
  {
    name: "TypeScript",
    logo: "/logos/typescript.svg",
    description: "Typesafe domain models so teams ship fast without regressions.",
  },
  {
    name: "Stripe",
    logo: "/logos/stripe.svg",
    description: "Checkout, billing, and payments experiments wired for learning.",
  },
  {
    name: "Clerk",
    logo: "/logos/clerk.svg",
    description: "Authentication that keeps multi-tenant experiences frictionless.",
  },
]

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] h-[50rem] bg-[radial-gradient(circle_at_top,_rgba(255,195,255,0.35),_transparent_60%)]" />
      <main className="relative flex flex-col">
        <header className="flex min-h-screen items-center py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl space-y-10">
              <Badge variant="soft" className="w-fit uppercase tracking-[0.3em]">
                Javier Sanchez Vadillo
              </Badge>
              <div className="space-y-6">
                <h1 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                  Founder-builder crafting data-rich products that feel inevitable.
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
                  I design, code, and launch digital ventures that marry warm aesthetics with rigorous analytics. Each build below pairs rapid experiments with refined UX—showing how I turn ambitious ideas into revenue-ready products.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Button asChild size="lg">
                  <Link href="mailto:javiersvadillo@gmail.com">
                    <Mail className="mr-2 h-4 w-4" /> Start a project
                  </Link>
                </Button>
                <Button variant="ghost" asChild size="lg" className="text-foreground">
                  <Link href="#projects">
                    <Sparkles className="mr-2 h-4 w-4" /> See the work
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <section id="focus" className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-4">
                <Badge variant="outline" className="w-fit">
                  Builder OS
                </Badge>
                <h2 className="text-4xl font-semibold">
                  The product stack I bring to every venture.
                </h2>
                <p className="text-muted-foreground">
                  Operating as a founder means holding the narrative, the roadmap, and the codebase at once. These are the muscles I keep sharp.
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {focusAreas.map((area, index) => (
                <div
                  key={area.title}
                  data-reveal
                  className="translate-y-10 opacity-0 transition-all duration-700 ease-out will-change-transform data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <Card className="border-none bg-[hsl(var(--card))]/80 backdrop-blur-sm">
                    <CardHeader className="space-y-3">
                      <Badge variant="soft" className="w-fit text-xs uppercase tracking-widest">
                        {area.title}
                      </Badge>
                      <CardTitle className="text-2xl font-semibold text-foreground">
                        {area.description}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-foreground/80">
                        {area.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <Check className="mt-0.5 h-4 w-4 flex-none text-[hsl(var(--accent-foreground))]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-4">
                <Badge variant="outline" className="w-fit">
                  Launch archive
                </Badge>
                <h2 className="text-4xl font-semibold">
                  Ventures and tools shipping today.
                </h2>
                <p className="text-muted-foreground">
                  Scroll through a stream of product stories. Each card fades in as you reach it, revealing the systems, experiments, and craft layered into the build.
                </p>
              </div>
            </div>
            <div className="grid gap-10">
              {projects.map((project, index) => (
                <div
                  key={project.name}
                  data-reveal
                  className="translate-y-10 opacity-0 transition-all duration-700 ease-out will-change-transform data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <Card className="group relative overflow-hidden border-none bg-[hsl(var(--card))]/80 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:-translate-y-2 hover:bg-[hsl(var(--card))]">
                    <div className="pointer-events-none absolute -right-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[hsl(var(--accent))]/25 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                    <CardHeader className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="soft" className="uppercase tracking-wide">
                          {project.role}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{project.tagline}</span>
                      </div>
                      <CardTitle className="text-3xl font-semibold text-foreground">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="max-w-3xl text-base text-foreground/80">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <ul className="grid gap-4 text-sm text-foreground/80 md:grid-cols-3">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-3">
                            <Check className="mt-1 h-4 w-4 flex-none text-[hsl(var(--accent-foreground))]" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" asChild className="group/link gap-2 text-foreground">
                          <Link href={project.url} target="_blank" rel="noreferrer">
                            Visit project
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="stack" className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-4">
                <Badge variant="outline" className="w-fit">
                  Tech stack
                </Badge>
                <h2 className="text-4xl font-semibold">
                  Tools I lean on to ship fast and elegantly.
                </h2>
                <p className="text-muted-foreground">
                  Infrastructure and platforms chosen for velocity, stability, and founder-friendly economics.
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {techStack.map((tool, index) => (
                <div
                  key={tool.name}
                  data-reveal
                  className="translate-y-10 opacity-0 transition-all duration-700 ease-out will-change-transform data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100"
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <Card className="border-none bg-[hsl(var(--card))]/80">
                    <CardContent className="space-y-6 p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-[hsl(var(--border))]/60 bg-background/40">
                          <Image
                            src={tool.logo}
                            alt={tool.name}
                            fill
                            sizes="48px"
                            className="object-contain p-1.5"
                          />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-foreground">{tool.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80">{tool.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="pb-32 pt-12">
          <div className="container mx-auto px-6">
            <div
              data-reveal
              className="translate-y-10 opacity-0 transition-all duration-700 ease-out will-change-transform data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100"
            >
              <Card className="border-none bg-[hsl(var(--card))]/80">
                <CardContent className="flex flex-col gap-8 px-6 py-12 text-center sm:px-12">
                  <div className="space-y-3">
                    <Badge variant="soft" className="mx-auto w-fit uppercase tracking-widest">
                      Let&apos;s collaborate
                    </Badge>
                    <h2 className="text-4xl font-semibold">Have something ambitious in mind?</h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                      I&apos;m building with founders on AI-driven experiences, data products, and conversions that feel effortless. Drop a line and let&apos;s ship momentum together.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" asChild>
                      <Link href="mailto:javiersvadillo@gmail.com">
                        <Mail className="mr-2 h-4 w-4" /> javiersvadillo@gmail.com
                      </Link>
                    </Button>
                    <Button variant="ghost" size="lg" asChild>
                      <Link href="#projects">Explore the case studies again</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <RevealObserver />
      </main>
    </div>
  )
}
