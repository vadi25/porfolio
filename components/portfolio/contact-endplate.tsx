import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/reveal"

export function ContactEndplate() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <Reveal className="contact-inner shell">
        <p className="editorial-label">03 / Contact</p>
        <h2 id="contact-heading">Bring the Difficult Thing.</h2>
        <p className="contact-copy">
          Product direction, full-stack builds, and focused collaborations for ideas worth making
          concrete.
        </p>
        <a className="contact-link" href="mailto:javiersvadillo@gmail.com">
          javiersvadillo@gmail.com <ArrowUpRight aria-hidden="true" />
        </a>
        <div className="contact-note">
          <span>Direct email</span>
          <span>No contact funnel</span>
        </div>
        <div data-plan-008-slot="contact-intake" hidden />
      </Reveal>
    </section>
  )
}
