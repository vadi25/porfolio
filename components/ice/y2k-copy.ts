import type { Project } from "@/lib/projects"

export type Y2kBlurb = {
  yell: string
  joke: string
}

export const y2kBlurbs: Record<string, Y2kBlurb> = {
  NotCode: {
    yell: "Leave the coding agent. Keep the beeps.",
    joke: "A menu-bar companion that taps you when Claude Code, Codex CLI, or Cursor wants attention. The serious page already said it: local sound, optional WhatsApp status, and it does not route your code. NotCode is free. This webpage’s sense of taste is not.",
  },
  Unicourse: {
    yell: "Students teaching students. The faculty is not in this bit.",
    joke: "A campus marketplace where standout students package courses for their peers. Stripe storefront, split payouts, analytics. None of that required a rainbow background. The rainbow showed up anyway.",
  },
  Graphv0: {
    yell: "Your CSV called. It is upset.",
    joke: "Upload unruly data, pay once, receive a chart you can put in a deck or embed. This page will not add a red arrow. The chart product did not ask for a red arrow. The red arrow is a sickness.",
  },
  Called: {
    yell: "It books the meeting. You still have to go.",
    joke: "A calendar-native assistant: natural language in, a booking and a follow-up draft out, around a connected Google Calendar. Heroic. Tragic. Attendance remains your problem.",
  },
  OpenCut: {
    yell: "I did not found the editor.",
    joke: "Open-source video editing. The real note is timeline tooling, export stability, and interface polish beside the maintainers. I did not invent the timeline. Do not tell the fictional guestbook I invented the timeline.",
  },
  DataLighthouse: {
    yell: "Charts, without rebuilding the dashboard again.",
    joke: "A starter for Next.js teams who want data storytelling in the product. Responsive charts, themes, Supabase examples. Dancing babies are not in the repository. They are exclusively a problem on this page.",
  },
}

export function blurbFor(project: Project): Y2kBlurb {
  return (
    y2kBlurbs[project.name] ?? {
      yell: project.tagline,
      joke: `Straight copy, because the joke desk has not reached this one yet: ${project.description}`,
    }
  )
}

export const trustedBy = ["MrBreast", "my mom", "a raccoon", "Internet Explorer 6"] as const

export const guestbook = [
  {
    name: "my mom",
    quote: "He said he ships products. I said I love him. I do not know what a webhook is.",
    stars: "★★★★★",
    rating: "Five out of five. Fictional.",
  },
  {
    name: "MrBreast",
    quote: "I have never heard of Javier. I am leaving this here because a sticker told me it was not a scam.",
    stars: "★★★★★",
    rating: "Five out of five. Fictional.",
  },
  {
    name: "Internet Explorer 6",
    quote: "A menu-bar app, a campus marketplace, and a chart tool. I can render none of them. This guestbook, I understand.",
    stars: "★★★★☆",
    rating: "Four out of five. Fictional.",
  },
  {
    name: "a raccoon",
    quote: "I do not have a Google Calendar, so Called cannot help me. I still had a nice time with the bin.",
    stars: "★★★★★",
    rating: "Five out of five. Fictional.",
  },
  {
    name: "the hit counter",
    quote: "I have displayed 0000007 since this page opened. Refresh is a hobby, not a method.",
    stars: "★★★★★",
    rating: "Five out of five. Fictional.",
  },
] as const

export const fakeVisitorDigits = ["0", "0", "0", "0", "0", "0", "7"] as const
