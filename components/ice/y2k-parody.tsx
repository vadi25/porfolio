import { blurbFor, fakeVisitorDigits, guestbook, trustedBy } from "@/components/ice/y2k-copy"
import { Y2kGuestbookForm } from "@/components/ice/y2k-guestbook"
import { projects } from "@/lib/projects"
import { person } from "@/lib/site"

export function Y2kIntro() {
  return (
    <div className="y2k-intro">
      <p className="y2k-sr">
        Parody props. The jokes in this window are jokes. Project names, taglines, and the outbound links are the real
        work.
      </p>
      <div className="y2k-stickers">
        <span className="y2k-sticker y2k-sticker-scam">NOT A SCAM!!</span>
        <span className="y2k-sticker y2k-sticker-hot">HOT!!!</span>
        <span className="y2k-sticker y2k-sticker-ie">BEST IN IE6</span>
      </div>
      <p className="y2k-wordmark">Javier’s Super Cool Homepage!!!!</p>
      <p className="y2k-hero-note">The rainbow is decorative. The name, the work, and the links are not.</p>
      <div className="y2k-menu">
        <span aria-hidden="true">File</span>
        <span aria-hidden="true">Edit</span>
        <span aria-hidden="true">View</span>
        <a href="#y2k-exhibits" aria-label="Examples">
          Exampels
        </a>
        <a href="#y2k-reviews" aria-label="Reviews">
          Reveiws
        </a>
        <a href="#y2k-guestbook" aria-label="Guestbook">
          Guestbok
        </a>
        <a href={`mailto:${person.email}`} aria-label="Contact">
          Contakt
        </a>
      </div>
      <p className="y2k-menu-note">The menu is spelled wrong on purpose.</p>
    </div>
  )
}

export function Y2kProps() {
  return (
    <div className="y2k-props">
      <div className="y2k-fake-counter">
        <p>You are visitor no.</p>
        <p className="y2k-digits" aria-hidden="true">
          {fakeVisitorDigits.map((digit, index) => (
            <span key={`${digit}-${index}`}>{digit}</span>
          ))}
        </p>
        <p className="y2k-sr">0000007. This counter is decorative and does not count visits.</p>
        <p className="y2k-aside">It has never counted. It will not start. The green counter above is the only real tally, and it only counts this browser.</p>
      </div>
      <div className="y2k-trusted">
        <p>Trusted by exactly none of the following.</p>
        <ul>
          {trustedBy.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="y2k-rate">
        <p>Web-design special</p>
        <p className="y2k-price">
          <s>$10,000/hr</s>
          <strong>$0.00</strong>
        </p>
        <p className="y2k-aside">This price is a prop. It is not an offer. The email link is the real door.</p>
      </div>
      <section className="y2k-exhibits" aria-labelledby="y2k-exhibits">
        <h2 id="y2k-exhibits">
          <span aria-hidden="true">Exampels</span>
          <span className="y2k-sr">Examples</span>
        </h2>
        <p className="y2k-aside">The straight line under each joke is the real tagline.</p>
        <ol>
          {projects.map((project) => {
            const blurb = blurbFor(project)
            return (
              <li key={project.name}>
                <article aria-labelledby={`y2k-${project.number}`}>
                  <h3 id={`y2k-${project.number}`}>{project.name}</h3>
                  <p className="y2k-yell">{blurb.yell}</p>
                  <p className="y2k-joke">{blurb.joke}</p>
                  <p className="y2k-straight">Straight version · {project.tagline}</p>
                  <a className="y2k-ugly" href={project.url} target="_blank" rel="noreferrer">
                    <span aria-hidden="true">★ CLICK 4 {project.name.toUpperCase()}</span>
                    <span className="y2k-sr">Visit {project.name}</span>
                  </a>
                </article>
              </li>
            )
          })}
        </ol>
      </section>
      <section className="y2k-reviews" id="y2k-reviews" aria-labelledby="y2k-reviews-heading">
        <h2 id="y2k-reviews-heading">
          <span aria-hidden="true">Reveiws</span>
          <span className="y2k-sr">Reviews</span>
        </h2>
        <div id="y2k-guestbook" className="y2k-book">
          <p className="y2k-disclaimer">Fictional guestbook. Nobody here wrote this.</p>
          <ol>
            {guestbook.map((entry) => (
              <li key={entry.name}>
                <figure>
                  <blockquote>
                    <p>{entry.quote}</p>
                  </blockquote>
                  <figcaption>
                    <span aria-hidden="true">{entry.stars}</span>
                    <span className="y2k-sr">{entry.rating}</span>
                    <span>— {entry.name}, who did not write this</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
          <Y2kGuestbookForm />
        </div>
      </section>
    </div>
  )
}
