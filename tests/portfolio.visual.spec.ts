import { expect, test } from "@playwright/test"

async function prepare(page: import("@playwright/test").Page) {
  await page.goto("/")
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; } *, *::before, *::after { caret-color: transparent !important; }",
  })
  await page.evaluate(() => document.fonts.ready)
}

test("@visual mobile full dossier", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await prepare(page)
  await expect(page).toHaveScreenshot("dossier-mobile.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  })
})

test("@visual desktop full dossier", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await prepare(page)
  await expect(page).toHaveScreenshot("dossier-desktop.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  })
})

test("@visual masthead composition", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await prepare(page)
  await expect(page.locator(".masthead")).toHaveScreenshot("masthead-desktop.png", {
    animations: "disabled",
    maxDiffPixelRatio: 0.02,
  })
})

test("@visual NotCode ledger plate", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await prepare(page)
  await expect(page.locator(".project-entry.is-featured article")).toHaveScreenshot("notcode-plate.png", {
    animations: "disabled",
    maxDiffPixelRatio: 0.02,
  })
})
