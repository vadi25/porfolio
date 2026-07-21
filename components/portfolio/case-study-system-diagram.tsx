import styles from "@/components/portfolio/case-study.module.css"

const nodes = [
  "Claude Code · Codex · Cursor",
  "Standalone Hook Helper",
  "Native Menu-Bar App",
  "Local Sound · Optional Kapso / WhatsApp",
] as const

export function CaseStudySystemDiagram() {
  return (
    <figure className={styles.diagram} aria-labelledby="system-diagram-caption">
      <figcaption className={styles.diagramHeader} id="system-diagram-caption">
        <span className={styles.diagramLabel}>System Diagram / Not a Product Screenshot</span>
        <span className={styles.diagramLabel}>Attention Route</span>
      </figcaption>
      <div className={styles.diagramFlow} aria-hidden="true">
        {nodes.map((node, index) => (
          <div key={node} className={styles.diagramStep}>
            <div className={`${styles.diagramNode} ${index === 2 ? styles.diagramNodeSignal : ""}`}>
              {node}
            </div>
            {index < nodes.length - 1 ? <span className={styles.diagramArrow}>→</span> : null}
          </div>
        ))}
      </div>
      <p className={styles.diagramAlternative}>
        In prose: each supported coding tool calls a small standalone hook helper. The helper preserves
        existing handlers and sends tool, project, and state to the native menu-bar app. The app plays
        sound locally and can route that minimal status through Kapso to WhatsApp while you are away.
      </p>
    </figure>
  )
}
