import { expect, test } from "@playwright/test"

test("blog index lists the sample draft", async ({ page }) => {
  await page.goto("/blog")

  await expect(page).toHaveTitle(/Blog — Javier Sánchez Vadillo/)
  await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible()
  const draft = page.getByRole("link", { name: /A draft, for now/ })
  await expect(draft).toBeVisible()
  await expect(draft).toContainText("Draft")
  await expect(draft).toContainText("placeholder")
  await expect(page.getByRole("link", { name: "RSS" })).toHaveAttribute("href", "/rss.xml")
})

test("draft post reads as a placeholder", async ({ page }) => {
  await page.goto("/blog/a-draft-for-now")

  await expect(page).toHaveTitle(/A draft, for now \(Draft\)/)
  await expect(page.getByRole("heading", { level: 1, name: "A draft, for now" })).toBeVisible()
  await expect(page.locator(".draft-flag")).toHaveText("Draft")
  await expect(page.getByText("This is a draft.")).toBeVisible()
  await expect(page.getByText("not a finished essay")).toBeVisible()
  await expect(page.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog")
})

test("blog is readable without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    baseURL: testInfo.project.use.baseURL,
    javaScriptEnabled: false,
  })
  const page = await context.newPage()

  try {
    await page.goto("/blog/a-draft-for-now")
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("A draft, for now")
    await expect(page.getByText("This is a draft.")).toBeVisible()
  } finally {
    await context.close()
  }
})

test("rss feed lists the draft", async ({ request }) => {
  const response = await request.get("/rss.xml")
  expect(response.ok()).toBeTruthy()
  expect(response.headers()["content-type"]).toContain("application/rss+xml")
  const xml = await response.text()
  expect(xml).toContain("[Draft] A draft, for now")
  expect(xml).toContain("/blog/a-draft-for-now")
  expect(xml).toContain("Javier Sánchez Vadillo")
})
