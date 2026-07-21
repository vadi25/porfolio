const navItems = [
  { index: "01", label: "Work", href: "#projects" },
  { index: "02", label: "Practice", href: "#practice" },
  { index: "03", label: "Contact", href: "#contact" },
] as const

type TopRailProps = {
  homeHref?: string
  sectionPrefix?: string
}

export function TopRail({ homeHref = "#top", sectionPrefix = "" }: TopRailProps) {
  return (
    <header className="top-rail" aria-label="Site header">
      <a className="identity-mark" href={homeHref} aria-label="Javier Sánchez Vadillo, home">
        <span aria-hidden="true">JSV</span>
        <span className="identity-name">Javier Sánchez Vadillo</span>
      </a>
      <nav aria-label="Portfolio index">
        <ol className="rail-index">
          {navItems.map((item) => (
            <li key={item.index}>
              <a href={`${sectionPrefix}${item.href}`}>
                <span aria-hidden="true">{item.index}</span> {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <a className="rail-email" href="mailto:javiersvadillo@gmail.com">
        Email
      </a>
    </header>
  )
}
