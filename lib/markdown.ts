export type Frontmatter = Record<string, string>

export function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const normalized = raw.replace(/\r\n/g, "\n")
  if (!normalized.startsWith("---\n")) return { data: {}, body: normalized }
  const end = normalized.indexOf("\n---\n", 4)
  if (end === -1) return { data: {}, body: normalized }
  const data: Frontmatter = {}
  for (const line of normalized.slice(4, end).split("\n")) {
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line.trim())
    if (!match) continue
    let value = match[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[match[1]] = value
  }
  return { data, body: normalized.slice(end + 5).trim() }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function sanitizeUrl(url: string) {
  if (/^(https?:\/\/|mailto:|\/)/.test(url) && !url.startsWith("//")) return url
  return null
}

function renderInline(source: string) {
  const escaped = escapeHtml(source)
  const withCode = escaped.replace(/`([^`]+)`/g, "<code>$1</code>")
  const withLinks = withCode.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, text: string, href: string) => {
    const safe = sanitizeUrl(href)
    if (!safe) return text
    const external = safe.startsWith("http")
    const attrs = external ? ' target="_blank" rel="noreferrer"' : ""
    return `<a href="${safe}"${attrs}>${text}</a>`
  })
  const withBold = withLinks.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  return withBold.replace(/(^|[\s(])\*([^*]+)\*/g, "$1<em>$2</em>")
}

export function renderMarkdown(body: string) {
  const lines = body.replace(/\r\n/g, "\n").split("\n")
  const html: string[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    if (!line.trim()) {
      index += 1
      continue
    }
    if (line.startsWith("### ")) {
      html.push(`<h3>${renderInline(line.slice(4))}</h3>`)
      index += 1
      continue
    }
    if (line.startsWith("## ")) {
      html.push(`<h2>${renderInline(line.slice(3))}</h2>`)
      index += 1
      continue
    }
    if (line.startsWith("# ")) {
      html.push(`<h2>${renderInline(line.slice(2))}</h2>`)
      index += 1
      continue
    }
    if (line.startsWith("> ")) {
      const quote: string[] = []
      while (index < lines.length && lines[index].startsWith("> ")) {
        quote.push(lines[index].slice(2))
        index += 1
      }
      html.push(`<blockquote><p>${renderInline(quote.join(" "))}</p></blockquote>`)
      continue
    }
    if (line.startsWith("- ")) {
      const items: string[] = []
      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(`<li>${renderInline(lines[index].slice(2))}</li>`)
        index += 1
      }
      html.push(`<ul>${items.join("")}</ul>`)
      continue
    }
    const paragraph: string[] = []
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith("#") &&
      !lines[index].startsWith("> ") &&
      !lines[index].startsWith("- ")
    ) {
      paragraph.push(lines[index].trim())
      index += 1
    }
    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`)
  }

  return html.join("\n")
}
