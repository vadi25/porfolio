import { expect, test } from "@playwright/test"

import { projects } from "../lib/projects"

test("adds the parody props without replacing the real year-2000 page", async ({ page }) => {
  await page.goto("/y2k")

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hi, I'm Javier Sánchez Vadillo.")
  await expect(page.getByText("Visits from this browser")).toBeVisible()
  await expect(page.locator(".y2k-note")).toContainText("under construction")
  await expect(page.getByText("Javier’s Super Cool Homepage!!!!")).toBeVisible()
  await expect(page.getByText("NOT A SCAM!!", { exact: true })).toBeVisible()
  await expect(page.getByText("HOT!!!", { exact: true })).toBeVisible()
  await expect(page.getByText("The menu is spelled wrong on purpose.")).toBeVisible()
  await expect(page.getByText("It has never counted.")).toBeVisible()
  await expect(page.getByText("Trusted by exactly none of the following.")).toBeVisible()
  await expect(page.getByText("This price is a prop.")).toBeVisible()
  await expect(page.getByText("Fictional guestbook. Nobody here wrote this.")).toBeVisible()

  await expect(page.getByRole("link", { name: "Examples" })).toHaveAttribute("href", "#y2k-exhibits")
  await expect(page.getByRole("link", { name: "Reviews" })).toHaveAttribute("href", "#y2k-reviews")
  await expect(page.getByRole("link", { name: "Guestbook" })).toHaveAttribute("href", "#y2k-guestbook")
  await expect(page.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "mailto:javiersvadillo@gmail.com")

  for (const project of projects) {
    const link = page.getByRole("link", { name: `Visit ${project.name}` })
    await expect(link).toHaveAttribute("href", project.url)
    await expect(link).toHaveAttribute("target", "_blank")
    expect((await link.getAttribute("rel"))?.split(/\s+/)).toContain("noreferrer")
    await expect(page.getByText(`Straight version · ${project.tagline}`)).toBeVisible()
  }

  await page.getByLabel("Your fictional signature").fill("a raccoon")
  await page.getByRole("button", { name: "Sign the fictional guestbook" }).click()
  await expect(page.getByRole("status")).toHaveText(/Nothing was saved/)
  await expect(page).toHaveURL("/y2k")
})

test("draws a cursor trail on the year-2000 page only for fine pointers", async ({ page }) => {
  await page.goto("/y2k")
  await page.mouse.move(180, 220)
  await expect(page.locator("[data-y2k-trail]")).toHaveCount(1)
})

test("drops the year-2000 trail and wordmark shift when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/y2k")
  await page.mouse.move(180, 220)
  await expect(page.locator("[data-y2k-trail]")).toHaveCount(0)
  await expect(page.locator(".y2k-wordmark")).toHaveCSS("animation-name", "none")
})
