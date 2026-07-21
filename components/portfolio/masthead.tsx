import { ArrowDown, ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/reveal"

function PresenceDiagram() {
  return (
    <figure className="presence-diagram" aria-labelledby="presence-caption">
      <div className="diagram-flow" aria-hidden="true">
        <span className="diagram-node">Agent Hook</span>
        <span className="diagram-line" />
        <span className="diagram-node diagram-node-signal">Needs You</span>
        <span className="diagram-line" />
        <span className="diagram-output">Local Sound</span>
        <span className="diagram-output">WhatsApp</span>
      </div>
      <figcaption id="presence-caption">System diagram · attention routing, not a product screenshot</figcaption>
    </figure>
  )
}

export function Masthead() {
  return (
    <section className="masthead shell" id="top" aria-labelledby="masthead-title">
      <div className="masthead-kicker editorial-label">
        <span>Independent Product Practice</span>
        <span>Selected Work · 2024—26</span>
      </div>
      <Reveal className="masthead-statement">
        <h1 id="masthead-title">
          I turn stubborn ideas
          <em> into shipped products.</em>
        </h1>
      </Reveal>
      <aside className="masthead-proof" aria-label="Practice summary">
        <p className="proof-index">Field Note / 00</p>
        <p>
          Founder and product engineer working across product direction, interface systems, and
          full-stack delivery.
        </p>
        <a href="#projects">
          Read the Work <ArrowDown aria-hidden="true" />
        </a>
      </aside>
      <Reveal className="current-work" delay={100}>
        <div className="current-work-copy">
          <span className="editorial-label">On the Workbench / NotCode</span>
          <h2>Walk away. The agent will find you.</h2>
          <p>
            A native macOS companion that routes coding-agent attention without routing your code.
          </p>
          <a href="https://notcode.rairai.xyz" target="_blank" rel="noreferrer">
            Open NotCode <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <PresenceDiagram />
      </Reveal>
    </section>
  )
}
