import { ContactEndplate } from "@/components/portfolio/contact-endplate"
import { Masthead } from "@/components/portfolio/masthead"
import { PracticeMatrix } from "@/components/portfolio/practice-matrix"
import { ProjectLedger } from "@/components/portfolio/project-ledger"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { ToolStrip } from "@/components/portfolio/tool-strip"
import { TopRail } from "@/components/portfolio/top-rail"
import { RevealObserver } from "@/components/reveal-observer"

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to Main Content
      </a>
      <TopRail />
      <main id="main-content">
        <Masthead />
        <ProjectLedger />
        <PracticeMatrix />
        <ToolStrip />
        <ContactEndplate />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  )
}
