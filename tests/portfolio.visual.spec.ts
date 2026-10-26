import { expect, test } from "@playwright/test"

async function prepare(page: import("@playwright/test").Page, path = "/") {
  await page.goto(path)
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; } .reveal { animation: none !important; opacity: 1 !important; transform: none !important; } *, *::before, *::after { caret-color: transparent !important; }",
  })
  await page.locator("[data-reveal]").evaluateAll((elements) => {
    for (const element of elements) (element as HTMLElement).dataset.revealed = "true"
  })
  await page.evaluate(() => document.fonts.ready)
}

test("@visual NotCode case study mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await prepare(page, "/work/notcode")
  await expect(page).toHaveScreenshot("notcode-case-mobile.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  })
})

test("@visual NotCode case study desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await prepare(page, "/work/notcode")
  await expect(page).toHaveScreenshot("notcode-case-desktop.png", {
    animations: "disabled",
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  })
})
