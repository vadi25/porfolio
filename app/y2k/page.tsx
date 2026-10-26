import type { Metadata } from "next"

import { Identity } from "@/components/ice/identity"
import { Penguin } from "@/components/ice/penguin"
import { Snowballs } from "@/components/ice/snowballs"
import { VisitCounter } from "@/components/ice/visit-counter"
import { Y2kIntro, Y2kProps } from "@/components/ice/y2k-parody"
import { Y2kTrail } from "@/components/ice/y2k-trail"
import { person } from "@/lib/site"

export const metadata: Metadata = {
  title: `Year 2000 — ${person.name}`,
  description: person.bio[0],
  robots: { index: false, follow: false },
}

const ticker =
  "★ under construction ★ welcome ★ a year-2000 copy of this page ★ snow still falls ★ "

export default function Y2KPage() {
  return (
    <div className="y2k-page">
      <a className="skip-link" href="#main-content">
        Skip to Main Content
      </a>
      <main id="main-content">
        <article className="y2k-window">
          <div className="y2k-titlebar">
            <span>{person.name}</span>
            <span className="y2k-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
          <p className="marquee" aria-hidden="true">
            <span>
              {ticker}
              {ticker}
            </span>
          </p>
          <div className="y2k-body">
            <Y2kIntro />
            <Identity />
            <p className="visitor">
              Visits from this browser <VisitCounter />
            </p>
            <p className="y2k-note">
              <span className="blink" aria-hidden="true">
                ★{" "}
              </span>
              under construction
            </p>
            <div className="construction-bar" role="presentation" />
            <Y2kProps />
          </div>
          <div className="y2k-status">
            <span>{person.role}</span>
            <span>index.html</span>
          </div>
        </article>
      </main>
      <Penguin href="/" label="Return to the quiet page" variant="y2k" />
      <Y2kTrail />
      <Snowballs />
    </div>
  )
}
