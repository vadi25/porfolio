import { getPosts } from "@/lib/posts"
import { person, siteUrl } from "@/lib/site"

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export function GET() {
  const origin = siteUrl()
  const posts = getPosts()
  const items = posts
    .map((post) => {
      const title = post.draft ? `[Draft] ${post.title}` : post.title
      const link = `${origin}/blog/${post.slug}`
      const [year, month, day] = post.date.split("-").map(Number)
      const pubDate = new Date(Date.UTC(year || 1970, (month || 1) - 1, day || 1)).toUTCString()
      return `<item>
  <title>${xmlEscape(title)}</title>
  <link>${xmlEscape(link)}</link>
  <guid isPermaLink="true">${xmlEscape(link)}</guid>
  <pubDate>${pubDate}</pubDate>
  <description>${xmlEscape(post.description)}</description>
</item>`
    })
    .join("\n")

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${xmlEscape(person.name)}</title>
  <link>${xmlEscape(`${origin}/blog`)}</link>
  <description>${xmlEscape(person.bio[0])}</description>
  ${items}
</channel>
</rss>
`

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
