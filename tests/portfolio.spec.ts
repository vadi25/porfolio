import { expect, test } from "@playwright/test"

const sectionIds = ["projects", "practice", "stack", "contact"] as const
const projectUrls = [
  "https://notcode.rairai.xyz",
  "https://unicourse.education",
  "https://graphv0.vercel.app",
  "https://called-demo.vercel.app",
  "https://opencut.app",
  "https://datalighthouse.dev",
] as const

test("keeps the complete portfolio visible when JavaScript is disabled", async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    baseURL: testInfo.project.use.baseURL,
    javaScriptEnabled: false,
  })
  const page = await context.newPage()

  try {
    await page.goto("/")
    for (const id of sectionIds) await expect(page.locator(`#${id}`)).toBeVisible()
    await expect(page.locator(".project-entry")).toHaveCount(6)
    await expect(page.locator(".practice-row")).toHaveCount(3)
    await expect(page.locator("#stack img")).toHaveCount(6)

    const revealWrappers = page.locator("[data-reveal]")
    await expect
      .poll(() =>
        revealWrappers.evaluateAll((elements) =>
          elements.every((element) => {
            const styles = getComputedStyle(element)
            return styles.display !== "none" && styles.visibility !== "hidden" && styles.opacity === "1"
          })
        )
      )
      .toBe(true)
  } finally {
    await context.close()
  }
})

test("renders a semantic field dossier with a usable jump index", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/Javier Sánchez Vadillo/)
  await expect(page.locator("main")).toHaveCount(1)
  await expect(page.locator("footer.site-footer")).toHaveCount(1)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /I turn stubborn ideas into shipped products/i
  )
  await expect(page.getByRole("heading", { level: 2, name: /Six Products/i })).toBeVisible()

  const nav = page.getByRole("navigation", { name: "Portfolio index" })
  await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#projects")
  await expect(nav.getByRole("link", { name: "Practice" })).toHaveAttribute("href", "#practice")
  await expect(nav.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact")

  const skip = page.getByRole("link", { name: "Skip to Main Content" })
  await skip.focus()
  await expect(skip).toBeInViewport()
  await expect(skip).toHaveAttribute("href", "#main-content")
})

test("exposes direct email and safe project actions", async ({ page }) => {
  await page.goto("/")

  const emailLinks = page.locator('a[href="mailto:javiersvadillo@gmail.com"]')
  await expect(emailLinks).toHaveCount(2)

  const projectLinks = page.locator("#projects article footer a")
  await expect(projectLinks).toHaveCount(6)
  await expect(page.locator('#projects a[href="https://notcode.rairai.xyz"]')).toHaveCount(1)
  await expect(page.locator('#projects a[href="https://called-demo.vercel.app"]')).toHaveCount(1)

  for (let index = 0; index < 6; index += 1) {
    const link = projectLinks.nth(index)
    expect(await link.getAttribute("href")).toMatch(/^https:\/\//)
    await expect(link).toHaveAttribute("target", "_blank")
    expect((await link.getAttribute("rel"))?.split(/\s+/)).toContain("noreferrer")
  }
})

test("tabs through ledger links in project order", async ({ page }) => {
  await page.goto("/")

  const projectLinks = page.locator("#projects article footer a")
  await projectLinks.first().focus()

  for (let index = 0; index < projectUrls.length; index += 1) {
    const link = projectLinks.nth(index)
    await expect(link).toBeFocused()
    await expect(link).toHaveAttribute("href", projectUrls[index])
    if (index < projectUrls.length - 1) await page.keyboard.press("Tab")
  }
})

test("loads every technology logo with stable dimensions", async ({ page }) => {
  await page.goto("/")

  const logos = page.locator("#stack img")
  await expect(logos).toHaveCount(6)
  for (let index = 0; index < 6; index += 1) {
    const logo = logos.nth(index)
    await logo.scrollIntoViewIfNeeded()
    await expect(logo).toHaveAttribute("width", "28")
    await expect(logo).toHaveAttribute("height", "28")
    await expect
      .poll(() => logo.evaluate((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))
      .toBe(true)
  }
})

test("reveals project entries as they enter the viewport", async ({ page }) => {
  await page.goto("/")

  const wrappers = page.locator("#projects [data-reveal]")
  await expect(wrappers).toHaveCount(6)
  for (let index = 0; index < 6; index += 1) {
    const wrapper = wrappers.nth(index)
    await wrapper.scrollIntoViewIfNeeded()
    await expect(wrapper).toHaveAttribute("data-revealed", "true")
  }
})

test("removes reveal motion when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")

  const wrapper = page.locator("#projects [data-reveal]").first()
  await wrapper.scrollIntoViewIfNeeded()
  await expect(wrapper).toHaveAttribute("data-revealed", "true")
  await expect
    .poll(() =>
      wrapper.evaluate((element) => {
        const styles = getComputedStyle(element)
        return { animationName: styles.animationName, opacity: styles.opacity, transform: styles.transform }
      })
    )
    .toEqual({ animationName: "none", opacity: "1", transform: "none" })
})

test("keeps content visible when IntersectionObserver is unavailable", async ({ page }) => {
  const browserErrors: Error[] = []
  page.on("pageerror", (error) => browserErrors.push(error))
  await page.addInitScript(() => Reflect.deleteProperty(window, "IntersectionObserver"))
  await page.goto("/")

  expect(await page.evaluate(() => "IntersectionObserver" in window)).toBe(false)
  const revealWrappers = page.locator("[data-reveal]")
  await expect
    .poll(() =>
      revealWrappers.evaluateAll((elements) =>
        elements.every((element) => {
          const styles = getComputedStyle(element)
          return styles.visibility !== "hidden" && styles.opacity === "1"
        })
      )
    )
    .toBe(true)
  expect(browserErrors).toEqual([])
})

test("has no horizontal overflow from 320 through 1440 pixels", async ({ browser }, testInfo) => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    const context = await browser.newContext({
      baseURL: testInfo.project.use.baseURL,
      viewport: { width, height: 900 },
    })
    const page = await context.newPage()
    await page.goto("/")
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
      `overflow at ${width}px`
    ).toBe(true)
    await context.close()
  }
})

test("emits no uncaught browser errors during load and scroll", async ({ page }) => {
  const browserErrors: Error[] = []
  page.on("pageerror", (error) => browserErrors.push(error))

  await page.goto("/")
  for (const id of sectionIds) await page.locator(`#${id}`).scrollIntoViewIfNeeded()
  expect(browserErrors).toEqual([])
})
