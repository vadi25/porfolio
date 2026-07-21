import type { ReactNode } from "react"

import styles from "@/components/portfolio/case-study.module.css"

type CaseStudySectionProps = {
  index: string
  title: string
  id: string
  children: ReactNode
}

export function CaseStudySection({ index, title, id, children }: CaseStudySectionProps) {
  return (
    <section className={styles.section} id={id} aria-labelledby={`${id}-heading`}>
      <p className={styles.sectionIndex}>{index}</p>
      <h2 className={styles.sectionHeading} id={`${id}-heading`}>
        {title}
      </h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}
