import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"

import styles from "@/components/portfolio/case-study.module.css"
import { CaseStudySection } from "@/components/portfolio/case-study-section"
import { CaseStudySystemDiagram } from "@/components/portfolio/case-study-system-diagram"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { TopRail } from "@/components/portfolio/top-rail"

export const metadata: Metadata = {
  title: "NotCode Case Study — Javier Sánchez Vadillo",
  description:
    "How Javier Sánchez Vadillo built NotCode, a native macOS companion for Claude Code, Codex CLI, and Cursor attention alerts.",
}

const decisions = [
  {
    title: "Native Swift, Not Electron",
    copy: "I chose a native Swift menu-bar app because the product belongs beside macOS system controls. It stays focused on presence, sound, and notification routing without carrying a browser runtime.",
  },
  {
    title: "Chain, Never Clobber",
    copy: "The helper adds NotCode to supported agent configuration while preserving existing handlers. A notification tool should not break the automation already in place.",
  },
  {
    title: "Send Status, Not Work",
    copy: "The optional remote payload is limited to tool, project, and state. Code, prompts, and output stay out of the WhatsApp message path.",
  },
] as const

export default function NotCodeCaseStudy() {
  return (
    <>
      <a className="skip-link" href="#case-study">
        Skip to Case Study
      </a>
      <TopRail homeHref="/" sectionPrefix="/" />
      <main id="case-study" className={`${styles.caseStudy} shell`}>
        <article>
          <header className={styles.hero} id="top">
            <p className={styles.eyebrow}>
              <span>Case File / 01</span>
              <span>Native macOS · Open Source</span>
            </p>
            <h1 className={styles.heroTitle}>
              NotCode
              <em>Leave the agent. Keep the signal.</em>
            </h1>
            <div className={styles.heroAside}>
              <p>
                A native menu-bar companion that calls you back when Claude Code, Codex CLI, or
                Cursor reaches the moment that needs human judgment.
              </p>
            </div>
            <dl className={styles.proofGrid} aria-label="NotCode project facts">
              <div>
                <dt>Role</dt>
                <dd>Creator · Product · Native macOS</dd>
              </div>
              <div>
                <dt>Platform</dt>
                <dd>Swift Menu-Bar App + Hook Helper</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Shipped · Free · MIT</dd>
              </div>
            </dl>
            <nav className={styles.heroActions} aria-label="NotCode project actions">
              <span className={styles.actionLabel}>Primary Evidence</span>
              <a href="https://notcode.rairai.xyz" target="_blank" rel="noreferrer">
                Visit NotCode <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="https://github.com/vadi25/notcode" target="_blank" rel="noreferrer">
                Inspect the Source <ArrowUpRight aria-hidden="true" />
              </a>
            </nav>
          </header>

          <CaseStudySection index="01 / Attention Problem" title="Async Work, Synchronous Waiting." id="problem">
            <div className={styles.prose}>
              <p>
                Coding agents work asynchronously. The awkward part is the human loop: a permission,
                a question, or completion can arrive while attention is somewhere else.
              </p>
              <p>
                Babysitting that loop creates idle time on both sides. Leave too early and the agent
                waits. Stay at the screen and the promised leverage becomes another thing to watch.
              </p>
            </div>
          </CaseStudySection>

          <section className={styles.section} id="thesis" aria-labelledby="thesis-heading">
            <p className={styles.sectionIndex}>02 / Thesis</p>
            <h2 className={styles.sectionHeading} id="thesis-heading">Route Attention by Presence.</h2>
            <div className={styles.sectionBody}>
              <div className={styles.prose}>
                <p>
                  NotCode starts with the quietest useful behavior: <strong>play sound at the keyboard.</strong>
                  Phone delivery is optional and only matters while away.
                </p>
                <p>Return when human judgment is needed. Ignore the rest.</p>
              </div>
            </div>
            <blockquote className={styles.thesis}>
              Sound when you are near. Minimal status when you are away.
            </blockquote>
          </section>

          <section className={styles.section} id="anatomy" aria-labelledby="anatomy-heading">
            <p className={styles.sectionIndex}>03 / System Anatomy</p>
            <h2 className={styles.sectionHeading} id="anatomy-heading">A Small Route From Hook to Human.</h2>
            <div className={styles.sectionBody}>
              <div className={styles.prose}>
                <p>
                  Claude Code uses Notification and Stop hooks. Codex uses its <code>notify</code> integration.
                  Cursor uses stop hooks. A small standalone helper normalizes those signals for the native app.
                </p>
                <p>
                  Local sound is the default. Away-aware WhatsApp status through Kapso is optional, and
                  its payload contains tool, project, and state—not code, prompt, or output.
                </p>
              </div>
            </div>
            <CaseStudySystemDiagram />
          </section>

          <section className={styles.section} id="decisions" aria-labelledby="decisions-heading">
            <p className={styles.sectionIndex}>04 / Decisions</p>
            <h2 className={styles.sectionHeading} id="decisions-heading">Three Boundaries Shaped the Build.</h2>
            <div className={styles.sectionBody}>
              <p className={styles.prose}>
                The product gets its character from what it refuses to make complicated.
              </p>
            </div>
            <ol className={styles.decisions}>
              {decisions.map((decision, index) => (
                <li className={styles.decision} key={decision.title}>
                  <span className={styles.decisionNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.copy}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.section} id="distribution" aria-labelledby="distribution-heading">
            <p className={styles.sectionIndex}>05 / Distribution</p>
            <h2 className={styles.sectionHeading} id="distribution-heading">Install It. Inspect It. Own the Route.</h2>
            <div className={styles.sectionBody}>
              <div className={styles.prose}>
                <p>
                  NotCode ships as a DMG and through a one-command installer. The source is public under
                  the MIT license.
                </p>
                <p>The product claims no accounts and no tracking.</p>
              </div>
            </div>
            <dl className={styles.releaseLedger} aria-label="NotCode release details">
              <div>
                <dt>Install</dt>
                <dd>DMG or One Command</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>GitHub · MIT</dd>
              </div>
              <div>
                <dt>Account Model</dt>
                <dd>No Account · No Tracking</dd>
              </div>
            </dl>
          </section>

          <CaseStudySection index="06 / Shipped Result" title="Three Tools, One Native Signal." id="result">
            <div className={styles.prose}>
              <p>
                The shipped result is a native, open-source macOS app with integrations for Claude Code,
                Codex CLI, and Cursor.
              </p>
              <p>
                Two-way WhatsApp session replies are in beta. That is the next edge: moving from status
                delivery toward carefully bounded remote responses without widening the payload.
              </p>
            </div>
          </CaseStudySection>

          <footer className={styles.closing}>
            <p className={styles.routeNote}>Case File / End</p>
            <h2>Follow the Evidence.</h2>
            <p className={styles.closingCopy}>
              Use the product, inspect the source, or return to the six-project work ledger.
            </p>
            <nav className={styles.nextActions} aria-label="Case study next actions">
              <a href="https://notcode.rairai.xyz" target="_blank" rel="noreferrer">
                Visit NotCode <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="https://github.com/vadi25/notcode" target="_blank" rel="noreferrer">
                Inspect Source <ArrowUpRight aria-hidden="true" />
              </a>
              <Link href="/#projects">
                <ArrowLeft aria-hidden="true" /> Return to Work Index
              </Link>
            </nav>
          </footer>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
