import { ArrowUpRight } from "lucide-react"

import { projects } from "@/components/portfolio/data"
import { Reveal } from "@/components/reveal"

export function ProjectLedger() {
  return (
    <section className="ledger shell" id="projects" aria-labelledby="work-heading">
      <header className="section-intro">
        <p className="editorial-label">01 / Work Ledger</p>
        <h2 id="work-heading">Six Products. One Bias: Make It Real.</h2>
        <p>Selected founder work, product systems, and open-source contributions.</p>
      </header>
      <ol className="project-list">
        {projects.map((project, index) => (
          <li key={project.name} className={project.featured ? "project-entry is-featured" : "project-entry"}>
            <Reveal delay={Math.min(index * 45, 180)}>
              <article aria-labelledby={`project-${project.number}`}>
                <div className="project-number" aria-hidden="true">
                  {project.number}
                </div>
                <header className="project-heading">
                  <p className="project-role">{project.role}</p>
                  <h3 id={`project-${project.number}`}>{project.name}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                </header>
                <div className="project-body">
                  <p>{project.description}</p>
                  <ul className="project-proof-list" aria-label={`${project.name} proof points`}>
                    {project.proofs.map((proof) => (
                      <li key={proof}>{proof}</li>
                    ))}
                  </ul>
                </div>
                <footer className="project-footer">
                  {project.featured ? (
                    <span className="case-study-slot" data-case-study-slot="/work/notcode">
                      Case Study / Filed Next
                    </span>
                  ) : (
                    <span aria-hidden="true">Field Note / {project.number}</span>
                  )}
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Visit {project.name} <ArrowUpRight aria-hidden="true" />
                  </a>
                </footer>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
