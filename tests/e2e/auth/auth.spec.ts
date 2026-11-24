import { test, expect } from "@playwright/test";
import { ROUTES } from "../../../src/shared/lib/routes";

test.describe("Auth pages (no session)", () => {
  test("redirects guests away from protected routes", async ({ page }) => {
    for (const route of [ROUTES.dashboard, ROUTES.users]) {
      await page.goto(route);
      await expect(page).toHaveURL(ROUTES.home);
    }
  });

  test("shows Login and Register links to guests", async ({ page }) => {
    await page.goto(ROUTES.home);
    const header = page.locator("header");

    await expect(header.getByRole("link", { name: "Login" })).toBeVisible();
    await expect(header.getByRole("link", { name: "Register" })).toBeVisible();
    await expect(header.getByRole("link", { name: "Users" })).toHaveCount(0);
  });

  test("validates the login form", async ({ page }) => {
    await page.goto(ROUTES.login);

    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByText("Invalid email")).toBeVisible();
    await expect(page.getByText("at least 8 characters")).toBeVisible();
  });

  test("validates the register form", async ({ page }) => {
    await page.goto(ROUTES.register);

    await page.locator("#password-field").fill("Secret123!");
    await page.locator("#confirmPassword-field").fill("Different1!");
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Passwords do not match")).toBeVisible();
  });

  test("links between login and register", async ({ page }) => {
    await page.goto(ROUTES.login);
    await page.getByRole("link", { name: "Register" }).last().click();
    await expect(page).toHaveURL(ROUTES.register);

    await page.getByRole("link", { name: "Sign in" }).click();
    await expect(page).toHaveURL(ROUTES.login);
  });
});
