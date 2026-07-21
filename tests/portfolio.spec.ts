import { expect, test } from "@playwright/test"

test("renders the portfolio landmarks and sections", async ({ page }) => {
  await page.goto("/")

  await expect(page.locator("main")).toHaveCount(1)
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /founder-builder crafting data-rich products/i,
    })
  ).toBeVisible()

  const sections = [
    { id: "projects", heading: /ventures and tools shipping today/i },
    { id: "stack", heading: /tools i lean on to ship fast and elegantly/i },
    { id: "contact", heading: /have something ambitious in mind/i },
  ]

  for (const section of sections) {
    await expect(page.locator(`#${section.id}`)).toContainText(section.heading)
  }
})

test("exposes the primary email and projects actions", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("link", { name: /start a project/i })).toHaveAttribute(
    "href",
    "mailto:javiersvadillo@gmail.com"
  )
  await expect(page.getByRole("link", { name: /see the work/i })).toHaveAttribute(
    "href",
    "#projects"
  )
})

test("keeps project links external and safe", async ({ page }) => {
  await page.goto("/")

  const projectLinks = page.getByRole("link", { name: /visit project/i })
  const linkCount = await projectLinks.count()
  expect(linkCount).toBeGreaterThan(0)

  for (let index = 0; index < linkCount; index += 1) {
    const link = projectLinks.nth(index)
    const href = await link.getAttribute("href")
    const rel = await link.getAttribute("rel")

    expect(href).toMatch(/^https:\/\//)
    await expect(link).toHaveAttribute("target", "_blank")
    expect(rel?.split(/\s+/)).toContain("noreferrer")
  }
})

test("loads every technology logo", async ({ page }) => {
  await page.goto("/")

  const logos = page.locator("#stack img")
  const logoCount = await logos.count()
  expect(logoCount).toBeGreaterThan(0)

  for (let index = 0; index < logoCount; index += 1) {
    const logo = logos.nth(index)
    await logo.scrollIntoViewIfNeeded()
    await expect
      .poll(() =>
        logo.evaluate(
          (image) =>
            image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0
        )
      )
      .toBe(true)
  }
})

test("reveals project cards as they enter the viewport", async ({ page }) => {
  await page.goto("/")

  const revealWrappers = page.locator("#projects [data-reveal]")
  const wrapperCount = await revealWrappers.count()
  expect(wrapperCount).toBeGreaterThan(0)

  for (let index = 0; index < wrapperCount; index += 1) {
    const wrapper = revealWrappers.nth(index)
    await wrapper.scrollIntoViewIfNeeded()
    await expect(wrapper).toHaveAttribute("data-revealed", "true")
  }
})

test("emits no uncaught browser errors during load and scroll", async ({ page }) => {
  const browserErrors: Error[] = []
  page.on("pageerror", (error) => browserErrors.push(error))

  await page.goto("/")
  for (const sectionId of ["focus", "projects", "stack", "contact"]) {
    await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded()
  }

  expect(browserErrors).toEqual([])
})
