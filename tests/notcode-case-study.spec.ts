import { expect, test } from "@playwright/test"

const orderedSections = [
  { id: "problem", heading: "Async Work, Synchronous Waiting." },
  { id: "thesis", heading: "Route Attention by Presence." },
  { id: "anatomy", heading: "A Small Route From Hook to Human." },
  { id: "decisions", heading: "Three Boundaries Shaped the Build." },
  { id: "distribution", heading: "Install It. Inspect It. Own the Route." },
  { id: "result", heading: "Three Tools, One Native Signal." },
] as const

test("NotCode case study presents the factual narrative in order", async ({ page }) => {
  await page.goto("/work/notcode")

  await expect(page).toHaveTitle(/NotCode Case Study/)
  await expect(page.getByRole("heading", { level: 1, name: /NotCode/ })).toHaveCount(1)
  await expect(page.locator("main article")).toHaveCount(1)

  const headings = page.locator("main article section > h2")
  await expect(headings).toHaveCount(orderedSections.length)
  for (let index = 0; index < orderedSections.length; index += 1) {
    const section = orderedSections[index]
    await expect(page.locator(`#${section.id}`)).toBeVisible()
    await expect(headings.nth(index)).toHaveText(section.heading)
  }

  await expect(page.getByText(/Two-way WhatsApp session replies are in beta/)).toBeVisible()
  await expect(page.getByText(/no accounts and no tracking/i)).toBeVisible()
})

test("NotCode case study exposes product, source, and return actions", async ({ page }) => {
  await page.goto("/work/notcode")

  const productLinks = page.locator('a[href="https://notcode.rairai.xyz"]')
  const sourceLinks = page.locator('a[href="https://github.com/vadi25/notcode"]')
  await expect(productLinks).toHaveCount(2)
  await expect(sourceLinks).toHaveCount(2)
  await expect(page.getByRole("link", { name: /Return to Work Index/ })).toHaveAttribute(
    "href",
    "/#projects"
  )

  for (const link of await page.locator('main a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute("rel", "noreferrer")
  }
})

test("NotCode case study labels its diagram and includes a prose equivalent", async ({ page }) => {
  await page.goto("/work/notcode")

  const figure = page.getByRole("figure", { name: /System Diagram \/ Not a Product Screenshot/ })
  await expect(figure).toBeVisible()
  await expect(figure).toContainText(/In prose: each supported coding tool calls a small standalone hook helper/)
  await expect(page.locator("main img")).toHaveCount(0)
})

test("NotCode case study remains readable without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    baseURL: testInfo.project.use.baseURL,
    javaScriptEnabled: false,
  })
  const page = await context.newPage()

  try {
    await page.goto("/work/notcode")
    for (const section of orderedSections) await expect(page.locator(`#${section.id}`)).toBeVisible()
  } finally {
    await context.close()
  }
})

test("NotCode case study has no 320 pixel overflow or browser errors", async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    baseURL: testInfo.project.use.baseURL,
    viewport: { width: 320, height: 800 },
  })
  const page = await context.newPage()
  const errors: Error[] = []
  page.on("pageerror", (error) => errors.push(error))

  try {
    await page.goto("/work/notcode")
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)
    ).toBe(true)
    await page.locator("#result").scrollIntoViewIfNeeded()
    expect(errors).toEqual([])
  } finally {
    await context.close()
  }
})
