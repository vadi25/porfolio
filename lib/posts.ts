import fs from "fs"
import path from "path"

import { parseFrontmatter, renderMarkdown } from "@/lib/markdown"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export type Post = {
  slug: string
  title: string
  date: string
  description: string
  draft: boolean
  html: string
}

function readPost(file: string): Post {
  const slug = file.replace(/\.mdx?$/, "")
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8")
  const { data, body } = parseFrontmatter(raw)
  return {
    slug,
    title: data.title || slug,
    date: data.date || "1970-01-01",
    description: data.description || "",
    draft: data.draft === "true",
    html: renderMarkdown(body),
  }
}

export function getPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug) ?? null
}

export function formatPostDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  if (!year || !month || !day) return iso
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)))
}
