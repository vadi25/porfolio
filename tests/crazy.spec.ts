import { expect, test } from "@playwright/test"

const projectLinks = [
  ["Visit NotCode", "https://notcode.rairai.xyz"],
  ["Visit Unicourse", "https://unicourse.education"],
  ["Visit Graphv0", "https://graphv0.vercel.app"],
  ["Visit Called", "https://called-demo.vercel.app"],
  ["Visit OpenCut", "https://opencut.app"],
  ["Visit DataLighthouse", "https://datalighthouse.dev"],
] as const

test("keeps the crazy detour closed until the wreck is opened", async ({ page }) => {
  await page.goto("/")

  const crazy = page.locator("#crazy")
  await expect(crazy.getByRole("heading", { level: 2, name: "Same Work. Worse Decisions." })).toBeVisible()
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/I turn stubborn ideas into shipped products/i)
  await expect(page.locator("#crazy-stage")).toBeHidden()
  await expect(page.locator('a[href="mailto:javiersvadillo@gmail.com"]')).toHaveCount(2)

  await crazy.locator("summary").click()
  const stage = page.locator("#crazy-stage")
  await expect(stage).toBeVisible()
  await expect(stage.getByText("NOT A SCAM!!", { exact: true })).toBeVisible()
  await expect(stage.getByText("Fictional guestbook. Nobody here wrote this.")).toBeVisible()
  await expect(stage.getByText("$10,000/hr")).toBeVisible()
  await expect(stage.getByText("Trusted by exactly none of the following.")).toBeVisible()
  await expect(stage.getByRole("link", { name: "Examples" })).toBeVisible()
  await expect(stage.getByRole("link", { name: "Reviews" })).toBeVisible()

  for (const [name, href] of projectLinks) {
    const link = stage.getByRole("link", { name })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute("href", href)
    await expect(link).toHaveAttribute("target", "_blank")
    expect((await link.getAttribute("rel"))?.split(/\s+/)).toContain("noreferrer")
  }

  await stage.getByLabel("Your fictional signature").fill("a raccoon")
  await stage.getByRole("button", { name: "Sign the fictional guestbook" }).click()
  await expect(stage.getByRole("status")).toHaveText(/Nothing was saved/)

  await crazy.locator("summary").click()
  await expect(stage).toBeHidden()
})

test("opens the crazy detour from the keyboard", async ({ page }) => {
  await page.goto("/")
  await page.locator("#crazy summary").focus()
  await page.keyboard.press("Enter")
  await expect(page.locator("#crazy-stage")).toBeVisible()
})

test("opens the crazy detour without javascript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    baseURL: testInfo.project.use.baseURL,
    javaScriptEnabled: false,
  })
  const page = await context.newPage()
  try {
    await page.goto("/")
    await expect(page.locator("#crazy")).toBeVisible()
    await expect(page.locator("#crazy-stage")).toBeHidden()
    await page.locator("#crazy summary").click()
    await expect(page.locator("#crazy-stage")).toBeVisible()
    await expect(page.locator("#crazy-stage").getByText("NOT A SCAM!!", { exact: true })).toBeVisible()
  } finally {
    await context.close()
  }
})

test("drops crazy motion when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  await page.locator("#crazy summary").click()

  const track = page.locator("[data-crazy-marquee] [data-crazy-motion]")
  await expect
    .poll(() =>
      track.evaluate((element) => {
        const styles = getComputedStyle(element)
        return { animationName: styles.animationName, transform: styles.transform }
      })
    )
    .toEqual({ animationName: "none", transform: "none" })

  await expect(page.locator("[data-crazy-trail]")).toHaveCount(0)
})

test("keeps the open crazy section inside the viewport width", async ({ browser }, testInfo) => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    const context = await browser.newContext({
      baseURL: testInfo.project.use.baseURL,
      viewport: { width, height: 900 },
    })
    const page = await context.newPage()
    await page.goto("/")
    await page.locator("#crazy summary").click()
    await expect(page.locator("#crazy-stage")).toBeVisible()
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1),
      `overflow at ${width}px`
    ).toBe(true)
    await context.close()
  }
})
