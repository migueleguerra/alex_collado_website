import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test("English - submit contact form", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForSelector(".service-flow");

    // Fill form
    await page.getByPlaceholder("Name *").fill("John Doe");
    await page.getByPlaceholder("Email *").fill("john@example.com");
    const phoneInput = page.locator(".react-international-phone-input");
    await phoneInput.fill("9841796461");
    await page.getByPlaceholder("Message").fill("I'd like to book a dinner");

    // Submit and intercept
    const responsePromise = page.waitForResponse("**/api/send-email");
    await page.getByRole("button", { name: /send/i }).click();
    const response = await responsePromise;
    const json = await response.json();

    expect(json.success).toBe(true);
    expect(json.testMode).toBe(true);
    expect(json.data.name).toBe("John Doe");
    expect(json.data.email).toBe("john@example.com");
    expect(json.data.message).toBe("I'd like to book a dinner");

    // Should show success
    await expect(page.getByText(/message received/i)).toBeVisible();
  });

  test("Spanish - submit contact form", async ({ page }) => {
    await page.goto("/es/contact");
    await page.waitForSelector(".service-flow");

    await page.getByPlaceholder("Nombre *").fill("María García");
    await page.getByPlaceholder("Correo *").fill("maria@ejemplo.com");
    const phoneInput = page.locator(".react-international-phone-input");
    await phoneInput.fill("9841796461");
    await page.getByPlaceholder("Mensaje").fill("Quisiera reservar una cena");

    const responsePromise = page.waitForResponse("**/api/send-email");
    await page.getByRole("button", { name: /enviar/i }).click();
    const response = await responsePromise;
    const json = await response.json();

    expect(json.success).toBe(true);
    expect(json.data.name).toBe("María García");

    await expect(page.getByText(/mensaje recibido/i)).toBeVisible();
  });

  test("Validation - shows errors for empty fields", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForSelector(".service-flow");

    // Click submit without filling anything
    await page.getByRole("button", { name: /send/i }).click();

    // Should show validation errors
    await expect(page.getByText(/love to know your name/i)).toBeVisible();
    await expect(page.getByText(/valid email/i)).toBeVisible();
    await expect(page.getByText(/phone number/i)).toBeVisible();
  });

  test("Validation - rejects invalid email", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForSelector(".service-flow");

    await page.getByPlaceholder("Name *").fill("Test");
    await page.getByPlaceholder("Email *").fill("not-an-email");
    await page.getByPlaceholder("Email *").blur();

    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("Back button returns to homepage", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForSelector(".service-flow");

    await page.locator('a[href="/"]').first().click();
    await page.waitForURL("/");

    await expect(page.locator(".header")).toBeVisible();
  });
});
