import { Identity } from "@/components/ice/identity"
import { Penguin } from "@/components/ice/penguin"
import { Snow } from "@/components/ice/snow"
import { Snowballs } from "@/components/ice/snowballs"

export default function HomePage() {
  return (
    <div className="ice-page">
      <a className="skip-link" href="#main-content">
        Skip to Main Content
      </a>
      <Snow />
      <main id="main-content">
        <Identity />
      </main>
      <Penguin href="/y2k" label="Open the year 2000 version of this page" />
      <Snowballs />
    </div>
  )
}
