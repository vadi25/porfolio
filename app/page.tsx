import { Identity } from "@/components/ice/identity"
import { Penguin } from "@/components/ice/penguin"
import { Polar } from "@/components/ice/polar"
import { Snowballs } from "@/components/ice/snowballs"

export default function HomePage() {
  return (
    <div className="ice-page">
      <a className="skip-link" href="#main-content">
        Skip to Main Content
      </a>
      <Polar />
      <main id="main-content">
        <Identity />
      </main>
      <Penguin href="/y2k" label="Open the year 2000 version of this page" />
      <Snowballs />
    </div>
  )
}
