import { practiceAreas } from "@/components/portfolio/data"
import { Reveal } from "@/components/reveal"

export function PracticeMatrix() {
  return (
    <section className="practice shell" id="practice" aria-labelledby="practice-heading">
      <header className="section-intro practice-intro">
        <p className="editorial-label">02 / Practice Matrix</p>
        <h2 id="practice-heading">Direction, Delivery, Evidence.</h2>
        <p>The work moves between these 3 disciplines. None stands alone.</p>
      </header>
      <div className="practice-table" role="list">
        {practiceAreas.map((area, index) => (
          <Reveal className="practice-row" delay={index * 60} key={area.index}>
            <article role="listitem">
              <span className="practice-index" aria-hidden="true">{area.index}</span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <ul aria-label={`${area.title} methods`}>
                {area.methods.map((method) => <li key={method}>{method}</li>)}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
