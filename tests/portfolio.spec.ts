import { expect, test } from "@playwright/test"

import { projects } from "../lib/projects"

const projectUrls = projects.map((project) => project.url)

test("renders the quiet homepage", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/Javier Sánchez Vadillo/)
  await expect(page.locator("main")).toHaveCount(1)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hi, I'm Javier Sánchez Vadillo.")
  await expect(page.getByText("one small penguin")).toBeVisible()
  await expect(page.getByText("swims an ocean of noise")).toBeVisible()
  await expect(page.getByText("snow keeps its own time")).toBeVisible()
  await expect(page.getByText(/Founder and product engineer working across product direction/)).toBeVisible()
  await expect(page.getByText("I turn stubborn ideas into shipped products.")).toBeVisible()

  const icons = await page.locator('link[rel~="icon"], link[rel="apple-touch-icon"]').evaluateAll((elements) =>
    elements.map((element) => `${element.getAttribute("rel")} ${element.getAttribute("href")}`),
  )
  expect(icons.some((entry) => entry.includes("icon"))).toBe(true)
  expect(icons.some((entry) => entry.includes("apple"))).toBe(true)

  const skip = page.getByRole("link", { name: "Skip to Main Content" })
  await skip.focus()
  await expect(skip).toBeInViewport()
  await expect(skip).toHaveAttribute("href", "#main-content")
})

test("keeps the real links and opens outside work safely", async ({ page }) => {
  await page.goto("/")

  await expect(page.locator('a[href="mailto:javiersvadillo@gmail.com"]')).toHaveCount(1)
  await expect(page.locator('a[href="/blog"]')).toHaveCount(1)
  await expect(page.locator('a[href="/work/notcode"]')).toHaveCount(1)

  for (const url of projectUrls) {
    const link = page.locator(`a[href="${url}"]`)
    await expect(link).toHaveCount(1)
    await expect(link).toHaveAttribute("target", "_blank")
    await expect(link).toHaveAttribute("rel", "noreferrer")
  }
})

test("shows the page without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    baseURL: testInfo.project.use.baseURL,
    javaScriptEnabled: false,
  })
  const page = await context.newPage()

  try {
    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hi, I'm Javier Sánchez Vadillo.")
    await expect(page.getByText("one small penguin")).toBeVisible()
    await expect(page.locator('a[href="mailto:javiersvadillo@gmail.com"]')).toBeVisible()
    await expect(page.locator('a[href="/y2k"]')).toHaveCount(1)
    for (const url of projectUrls) await expect(page.locator(`a[href="${url}"]`)).toBeVisible()
  } finally {
    await context.close()
  }
})

test("hides falling snow when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  await expect(page.locator(".snow")).toBeHidden()
})

test("throws a snowball that leaves a mark", async ({ page }) => {
  await page.goto("/")
  await page.mouse.click(48, 520)
  await expect(page.locator(".snowball, .snow-splat")).toHaveCount(1)
})

test("does not throw a snowball from the penguin", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  await page.locator(".corner-trigger").click({ noWaitAfter: true })
  await expect(page.locator(".snowball, .snow-splat")).toHaveCount(0)
})

test("the penguin and the year-2000 trigger share a corner", async ({ page }) => {
  await page.goto("/")
  const home = await page.locator(".corner-trigger").boundingBox()
  await page.goto("/y2k")
  const y2k = await page.locator(".corner-trigger").boundingBox()
  expect(home).not.toBeNull()
  expect(y2k).not.toBeNull()
  expect(Math.abs((home?.x ?? 0) - (y2k?.x ?? 0))).toBeLessThan(2)
  expect(Math.abs((home?.y ?? 0) - (y2k?.y ?? 0))).toBeLessThan(2)
  expect(home?.width).toBe(y2k?.width)
  expect(home?.height).toBe(y2k?.height)
})

test("reduced motion fades between the quiet page and the year 2000 page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  const world = page.locator(".world")

  await page.getByRole("link", { name: "Open the year 2000 version of this page" }).click({ noWaitAfter: true })
  await expect(page).toHaveURL("/y2k")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hi, I'm Javier Sánchez Vadillo.")
  await expect(page.locator(".y2k-note")).toContainText("under construction")
  await expect(page.getByText("Visits from this browser")).toBeVisible()
  await expect(page.locator('a[href="mailto:javiersvadillo@gmail.com"]')).toBeVisible()
  await expect
    .poll(() => world.evaluate((element) => getComputedStyle(element).transform))
    .toBe("none")

  await page.getByRole("link", { name: "Return to the quiet page" }).click({ noWaitAfter: true })
  await expect(page).toHaveURL("/")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hi, I'm Javier Sánchez Vadillo.")
})

test("warps through an iris when motion is allowed", async ({ page }) => {
  await page.goto("/")
  const world = page.locator(".world")

  await page.getByRole("link", { name: "Open the year 2000 version of this page" }).click({ noWaitAfter: true })
  await expect(world).toHaveAttribute("data-warping", "out")
  await expect(page).toHaveURL("/y2k")
  await expect(world).toHaveAttribute("data-warping", "in")
  await expect(world).not.toHaveAttribute("data-warping", { timeout: 4000 })

  await page.getByRole("link", { name: "Return to the quiet page" }).click({ noWaitAfter: true })
  await expect(world).toHaveAttribute("data-warping", "out")
  await expect(page).toHaveURL("/")
  await expect(world).not.toHaveAttribute("data-warping", { timeout: 4000 })
})

test("keyboard activates the year 2000 page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  await page.locator(".corner-trigger").focus()
  await page.keyboard.press("Enter")
  await expect(page).toHaveURL("/y2k")
})

test("has no horizontal overflow from 320 through 1440 pixels", async ({ browser }, testInfo) => {
  for (const path of ["/", "/y2k", "/blog"]) {
    for (const width of [320, 375, 768, 1024, 1440]) {
      const context = await browser.newContext({
        baseURL: testInfo.project.use.baseURL,
        viewport: { width, height: 900 },
      })
      const page = await context.newPage()
      await page.goto(path)
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1),
        `overflow at ${path} ${width}px`,
      ).toBe(true)
      await context.close()
    }
  }
})

test("emits no uncaught browser errors on the ice pages", async ({ page }) => {
  const browserErrors: Error[] = []
  page.on("pageerror", (error) => browserErrors.push(error))

  for (const path of ["/", "/y2k", "/blog"]) {
    await page.goto(path)
  }

  expect(browserErrors).toEqual([])
})
