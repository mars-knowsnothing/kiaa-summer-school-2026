import {test, expect} from "@playwright/test";

test("home shows title and dates", async ({page}) => {
  await page.goto("/en");
  await expect(page.getByRole("heading", {name: /KIAA Summer School/i})).toBeVisible();
  await expect(page.getByText(/July 20 - August 28, 2026/).first()).toBeVisible();
});

test("zh home renders header and language switch", async ({page}) => {
  await page.goto("/zh");
  await expect(page.getByRole("navigation").getByRole("link", {name: "讲者"})).toBeVisible();
  await expect(
    page.getByRole("heading", {name: "原行星盘与行星形成暑期学校及讨论班"})
  ).toBeVisible();
  await expect(page.getByRole("main").getByText("2026年7月20日 - 8月28日").first()).toBeVisible();
  const switchButton = page.getByRole("button", {name: /EN|中/});
  await expect(switchButton).toBeVisible();
  await switchButton.click();
  await expect(page).toHaveURL(/\/en$/);
});
