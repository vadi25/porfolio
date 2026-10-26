import Link from "next/link"

import { person, siteLinks, type SiteLink } from "@/lib/site"

function SiteAnchor({ link }: { link: SiteLink }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    )
  }
  if (link.href.startsWith("mailto:")) return <a href={link.href}>{link.label}</a>
  return <Link href={link.href}>{link.label}</Link>
}

export function Identity() {
  return (
    <div className="identity">
      <blockquote className="haiku">
        <p>
          {person.haiku.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </blockquote>
      <h1 className="greeting">{person.greeting}</h1>
      {person.bio.map((line) => (
        <p className="bio" key={line}>
          {line}
        </p>
      ))}
      <nav id="projects" className="links" aria-label="Links">
        <ul>
          {siteLinks.map((link) => (
            <li key={`${link.label}-${link.href}`}>
              <SiteAnchor link={link} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
