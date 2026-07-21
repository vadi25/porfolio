import Image from "next/image"

import { tools } from "@/components/portfolio/data"

export function ToolStrip() {
  return (
    <section className="tools shell" id="stack" aria-labelledby="tools-heading">
      <div className="tools-heading">
        <p className="editorial-label">Working Set</p>
        <h2 id="tools-heading">Tools Earn Their Place.</h2>
      </div>
      <ul>
        {tools.map((tool, index) => (
          <li key={tool.name}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <Image src={tool.logo} alt={`${tool.name} logo`} width={28} height={28} loading="lazy" />
            <strong>{tool.name}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}
