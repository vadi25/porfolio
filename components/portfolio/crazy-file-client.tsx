"use client"

import { useEffect, useId, useRef, useState } from "react"

import { blurbFor, guestbook, marqueeText, trustedBy, visitorDigits } from "@/components/portfolio/crazy-copy"
import styles from "@/components/portfolio/crazy-file.module.css"
import { projects } from "@/lib/projects"

type CrazyFileClientProps = {
  fontVariable: string
}

function useCursorTrail(open: boolean, stageRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const stage = stageRef.current
    if (!open || !stage) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    const layer = document.createElement("div")
    layer.className = styles.trail
    layer.setAttribute("data-crazy-trail", "")
    layer.setAttribute("aria-hidden", "true")
    const sparks = Array.from({ length: 8 }, (_, index) => {
      const spark = document.createElement("span")
      spark.className = styles.spark
      spark.textContent = index % 2 === 0 ? "★" : "✦"
      spark.style.opacity = String(1 - index * 0.1)
      layer.append(spark)
      return spark
    })
    document.body.append(layer)

    const points = sparks.map(() => ({ x: -80, y: -80 }))
    let pointerX = -80
    let pointerY = -80
    let frame = 0
    let running = false

    const draw = () => {
      points.forEach((point, index) => {
        const previous = index === 0 ? { x: pointerX, y: pointerY } : points[index - 1]
        const ease = index === 0 ? 1 : 0.38
        point.x += (previous.x - point.x) * ease
        point.y += (previous.y - point.y) * ease
        sparks[index].style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`
      })
      if (running) frame = window.requestAnimationFrame(draw)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(frame)
      layer.style.opacity = "0"
    }

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      layer.style.opacity = "1"
      if (running || document.hidden) return
      running = true
      frame = window.requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      if (document.hidden) stop()
    }

    stage.addEventListener("pointermove", onMove, { passive: true })
    stage.addEventListener("pointerleave", stop)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      stop()
      stage.removeEventListener("pointermove", onMove)
      stage.removeEventListener("pointerleave", stop)
      document.removeEventListener("visibilitychange", onVisibility)
      layer.remove()
    }
  }, [open, stageRef])
}

export function CrazyFileClient({ fontVariable }: CrazyFileClientProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [signed, setSigned] = useState(false)
  const signatureId = useId()
  useCursorTrail(open, stageRef)

  return (
    <section id="crazy" className={`${styles.file} ${fontVariable}`} aria-labelledby="crazy-heading">
      <div className={`${styles.invite} shell`}>
        <p className={`${styles.kicker} editorial-label`}>Crazy / Unfiled</p>
        <h2 id="crazy-heading" className={styles.heading}>
          Same Work. Worse Decisions.
        </h2>
        <p id="crazy-deck" className={styles.deck}>
          Same six products, retold as a 1999 homepage. The jokes are jokes. The links open the real
          work.
        </p>
      </div>
      <details
        className={styles.details}
        onToggle={(event) => setOpen(event.currentTarget.open)}
      >
        <summary className={`${styles.toggle} shell`} aria-describedby="crazy-deck">
          <span className={styles.toggleGrid}>
          <span className={styles.toggleSpacer} aria-hidden="true" />
          <span className={styles.toggleFace}>
            <span className={styles.index} aria-hidden="true">
              99
            </span>
            <span className={styles.toggleClosed}>Open the wreck</span>
            <span className={styles.toggleOpen}>Restore the file</span>
            <span className={styles.glyph} aria-hidden="true" />
          </span>
          </span>
        </summary>
        <div id="crazy-stage" ref={stageRef} className={styles.stage}>
          <div className={styles.shutter} data-crazy-shutter aria-hidden="true" />
          <p className={styles.srOnly}>
            Parody homepage. The copy in this section is a joke. Project names and the outbound links
            are the real work.
          </p>
          <div className={styles.marquee} data-crazy-marquee>
            <div className={styles.track} data-crazy-motion>
              <p>{marqueeText}</p>
              <p>{marqueeText}</p>
            </div>
          </div>
          <div className={styles.sky}>
            <div className={styles.stickers}>
              <span className={styles.stickerScam}>NOT A SCAM!!</span>
              <span className={styles.stickerHot}>HOT!!!</span>
              <span className={styles.stickerBuild}>UNDER CONSTRUCTION</span>
            </div>
            <div className={styles.window}>
              <div className={styles.titlebar} aria-hidden="true">
                <span className={styles.dots}>
                  <i />
                  <i />
                  <i />
                </span>
                <span>Javier’s Super Cool Homepage!!!! — Internet Explorer</span>
              </div>
              <div className={styles.menu}>
                <span className={styles.chrome} aria-hidden="true">
                  File
                </span>
                <span className={styles.chrome} aria-hidden="true">
                  Edit
                </span>
                <span className={styles.chrome} aria-hidden="true">
                  View
                </span>
                <a href="#crazy-exhibits" aria-label="Examples">
                  Exampels
                </a>
                <a href="#crazy-reviews" aria-label="Reviews">
                  Reveiws
                </a>
                <a href="#crazy-guestbook" aria-label="Guestbook">
                  Guestbok
                </a>
                <a href="#contact" aria-label="Contact">
                  Contakt
                </a>
              </div>
              <p className={styles.menuNote}>The menu is spelled wrong on purpose.</p>
              <div className={styles.hero}>
                <p className={styles.wordart} data-crazy-motion>
                  Javier’s Super Cool Homepage!!!!
                </p>
                <p className={styles.heroNote}>
                  Founder and product engineer. The rainbow is decorative. The six products are not.
                </p>
              </div>
              <div className={styles.meta}>
                <div className={styles.counterCard}>
                  <p>You are visitor no.</p>
                  <p className={styles.digits} aria-hidden="true">
                    {visitorDigits.map((digit, index) => (
                      <span key={`${digit}-${index}`}>{digit}</span>
                    ))}
                  </p>
                  <p className={styles.srOnly}>
                    0000007. The counter is decorative and does not count visits.
                  </p>
                  <p className={styles.aside}>It has never counted. It will not start.</p>
                </div>
                <div className={styles.trusted}>
                  <p>Trusted by exactly none of the following.</p>
                  <ul>
                    {trustedBy.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.rate}>
                  <p className={styles.rateLabel}>Web-design special</p>
                  <p className={styles.price}>
                    <s>$10,000/hr</s>
                    <strong>$0.00</strong>
                  </p>
                  <p className={styles.aside}>
                    This price is a prop. It is not an offer. The email in the contact section is the
                    real door.
                  </p>
                </div>
              </div>
              <div className={styles.barber} data-crazy-motion>
                <p>Under construction since you opened this</p>
              </div>
              <div className={styles.exhibits}>
                <header className={styles.blockHead}>
                  <h3 id="crazy-exhibits">
                    <span aria-hidden="true">Exampels</span>
                    <span className={styles.srOnly}>Examples</span>
                  </h3>
                  <p>The straight line under each joke is the real one.</p>
                </header>
                <ol className={styles.cards}>
                  {projects.map((project) => {
                    const blurb = blurbFor(project)
                    return (
                      <li key={project.name}>
                        <article className={styles.card} aria-labelledby={`crazy-${project.number}`}>
                          <p className={styles.fieldNote}>Field Note / {project.number}</p>
                          <h4 id={`crazy-${project.number}`}>{project.name}</h4>
                          <p className={styles.yell}>{blurb.yell}</p>
                          <p className={styles.joke}>{blurb.joke}</p>
                          <p className={styles.straight}>
                            Straight version · {project.tagline}
                          </p>
                          <a className={styles.ugly} href={project.url} target="_blank" rel="noreferrer">
                            <span aria-hidden="true">★ CLICK 4 {project.name.toUpperCase()}</span>
                            <span className={styles.srOnly}>Visit {project.name}</span>
                          </a>
                        </article>
                      </li>
                    )
                  })}
                </ol>
              </div>
              <div className={styles.reviews} id="crazy-reviews">
                <header className={styles.blockHead}>
                  <h3>
                    <span aria-hidden="true">Reveiws</span>
                    <span className={styles.srOnly}>Reviews</span>
                  </h3>
                  <p>Fictional guestbook. Nobody below wrote this.</p>
                </header>
                <div id="crazy-guestbook" className={styles.book}>
                  <p className={styles.disclaimer}>Fictional guestbook. Nobody here wrote this.</p>
                  <ol className={styles.entries}>
                    {guestbook.map((entry) => (
                      <li key={entry.name}>
                        <figure className={styles.quote}>
                          <blockquote>
                            <p>{entry.quote}</p>
                          </blockquote>
                          <figcaption>
                            <span aria-hidden="true">{entry.stars}</span>
                            <span className={styles.srOnly}>{entry.rating}</span>
                            <span>
                              — {entry.name}, who did not write this
                            </span>
                          </figcaption>
                        </figure>
                      </li>
                    ))}
                  </ol>
                  <form
                    className={styles.sign}
                    onSubmit={(event) => {
                      event.preventDefault()
                      setSigned(true)
                    }}
                  >
                    <label htmlFor={signatureId}>Your fictional signature</label>
                    <input
                      id={signatureId}
                      name="signature"
                      autoComplete="off"
                      maxLength={80}
                      placeholder="a raccoon"
                    />
                    <button className={styles.ugly} type="submit">
                      Sign the fictional guestbook
                    </button>
                    <p className={styles.aside}>This box does not send. It is part of the bit.</p>
                    {signed ? (
                      <p className={styles.stamp} role="status">
                        Stamped in marker, then thrown out. Nothing was saved.
                      </p>
                    ) : null}
                  </form>
                </div>
              </div>
              <footer className={styles.status}>
                <p>Best viewed in Internet Explorer 6 at 800×600. Also fine in this browser.</p>
                <p>
                  <a href="#crazy">Back to the switch ↑</a>
                  <a href="#top">Straight version</a>
                  <a href="#contact" aria-label="Contact, the real one">
                    Contakt, the real one
                  </a>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </details>
    </section>
  )
}
