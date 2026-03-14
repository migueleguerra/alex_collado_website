import { test, expect, Page } from "@playwright/test";

// Helper: click a button by its visible text
async function clickButton(page: Page, text: string) {
  await page.getByRole("button", { name: text, exact: true }).click();
}

// Helper: fill the contact form and submit, intercept API response
async function fillContactAndSubmit(page: Page) {
  await page.getByPlaceholder("Name *").fill("Test User");
  await page.getByPlaceholder("Email *").fill("test@example.com");

  // Phone input — type into the phone input field
  const phoneInput = page.locator(".react-international-phone-input");
  await phoneInput.fill("9841796461");

  await page.getByPlaceholder("Message").fill("E2E test booking");

  // Intercept the API call
  const responsePromise = page.waitForResponse("**/api/send-email");
  await page.getByRole("button", { name: /send|enviar/i }).click();
  const response = await responsePromise;
  const json = await response.json();

  return json;
}

// Helper: handle single-date step
async function fillDate(page: Page) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const dateStr = tomorrow.toISOString().split("T")[0];
  await page.locator('input[type="date"]').fill(dateStr);
  await page.getByRole("button", { name: /continue|siguiente/i }).click();
}

// Helper: handle date-range step
async function fillDateRange(page: Page) {
  const start = new Date();
  start.setDate(start.getDate() + 2);
  const end = new Date();
  end.setDate(end.getDate() + 5);
  const inputs = page.locator('input[type="date"]');
  await inputs.nth(0).fill(start.toISOString().split("T")[0]);
  await inputs.nth(1).fill(end.toISOString().split("T")[0]);
  await page.getByRole("button", { name: /continue|siguiente/i }).click();
}

// Helper: handle counter step (just click Continue with defaults)
async function fillCounter(page: Page) {
  await page.getByRole("button", { name: /continue|siguiente/i }).click();
}

// Helper: handle multi-select step (select first option + continue)
async function fillMultiSelect(page: Page, optionText: string) {
  await page.getByRole("button", { name: optionText, exact: true }).click();
  await page.getByRole("button", { name: /continue|siguiente/i }).click();
}

// Kitchen steps (stove, hobs, oven) — same across all flows
async function fillKitchenSteps(page: Page) {
  // Stove: Gas (index 0)
  await clickButton(page, "Gas");
  await page.waitForTimeout(300);
  // Hobs: 3-4 hobs (index 1)
  await clickButton(page, "3 - 4 hobs");
  await page.waitForTimeout(300);
  // Oven: Yes (index 0)
  await clickButton(page, "Yes");
  await page.waitForTimeout(300);
}

test.describe("Booking Wizard - All Flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/service");
    await page.waitForSelector(".service-flow");
  });

  test("Flow 1: Private Chef - One Service", async ({ page }) => {
    // Where: Playa del Carmen (index 1)
    await clickButton(page, "Playa del Carmen");
    await page.waitForTimeout(300);

    // What: Private Chef (index 0)
    await clickButton(page, "Private Chef");
    await page.waitForTimeout(300);

    // Type Service: One Service (index 0)
    await clickButton(page, "One Service");
    await page.waitForTimeout(300);

    // How Many: use defaults (2 adults, 0 children)
    await fillCounter(page);
    await page.waitForTimeout(300);

    // Meal: Dinner (index 2)
    await clickButton(page, "Dinner");
    await page.waitForTimeout(300);

    // Food: select Mexican
    await fillMultiSelect(page, "Mexican");
    await page.waitForTimeout(300);

    // Kitchen steps
    await fillKitchenSteps(page);

    // Calendar: single date
    await fillDate(page);
    await page.waitForTimeout(300);

    // Allergies: select Gluten Free
    await fillMultiSelect(page, "Gluten Free");
    await page.waitForTimeout(300);

    // Contact form
    const json = await fillContactAndSubmit(page);

    expect(json.success).toBe(true);
    expect(json.testMode).toBe(true);
    expect(json.data.name).toBe("Test User");
    expect(json.data.email).toBe("test@example.com");
    expect(json.data.where).toBe("Playa del Carmen");
    expect(json.data.what).toBe("Private Chef");
    expect(json.data.typeService).toBe("One Service");
    expect(json.data.meal).toBe("Dinner");
    expect(json.data.stove).toBe("Gas");

    // Should show success page
    await expect(page.getByText(/message received|mensaje recibido/i)).toBeVisible();
  });

  test("Flow 2: Private Chef - Multiple Services", async ({ page }) => {
    // Where: Tulum (index 5)
    await clickButton(page, "Tulum");
    await page.waitForTimeout(300);

    // What: Private Chef (index 0)
    await clickButton(page, "Private Chef");
    await page.waitForTimeout(300);

    // Type Service: Multiple Services (index 1)
    await clickButton(page, "Multiple Services");
    await page.waitForTimeout(300);

    // Calendar Range
    await fillDateRange(page);
    await page.waitForTimeout(300);

    // How Many
    await fillCounter(page);
    await page.waitForTimeout(300);

    // Food: select Fusion
    await fillMultiSelect(page, "Fusion");
    await page.waitForTimeout(300);

    // Kitchen steps
    await fillKitchenSteps(page);

    // Allergies: select Vegan
    await fillMultiSelect(page, "Vegan");
    await page.waitForTimeout(300);

    // Contact form
    const json = await fillContactAndSubmit(page);

    expect(json.success).toBe(true);
    expect(json.data.where).toBe("Tulum");
    expect(json.data.what).toBe("Private Chef");
    expect(json.data.typeService).toBe("Multiple Services");
    expect(json.data.fromDate).toBeTruthy();
    expect(json.data.toDate).toBeTruthy();

    await expect(page.getByText(/message received|mensaje recibido/i)).toBeVisible();
  });

  test("Flow 3: Cooking Experience", async ({ page }) => {
    // Where: Cancún (index 0)
    await clickButton(page, "Cancún");
    await page.waitForTimeout(300);

    // What: Cooking Experience (index 1)
    await clickButton(page, "Cooking Experience");
    await page.waitForTimeout(300);

    // Calendar: single date
    await fillDate(page);
    await page.waitForTimeout(300);

    // Kitchen steps
    await fillKitchenSteps(page);

    // Allergies: skip (just continue with no selection)
    await page.getByRole("button", { name: /continue|siguiente/i }).click();
    await page.waitForTimeout(300);

    // Contact form
    const json = await fillContactAndSubmit(page);

    expect(json.success).toBe(true);
    expect(json.data.where).toBe("Cancún");
    expect(json.data.what).toBe("Cooking Experience");
    expect(json.data.typeService).toBeUndefined();
    expect(json.data.oneServiceDate).toBeTruthy();

    await expect(page.getByText(/message received|mensaje recibido/i)).toBeVisible();
  });

  test("Flow 4: Mezcal Experience", async ({ page }) => {
    // Where: Puerto Morelos (index 2)
    await clickButton(page, "Puerto Morelos");
    await page.waitForTimeout(300);

    // What: Mezcal Experience (index 2)
    await clickButton(page, "Mezcal Experience");
    await page.waitForTimeout(300);

    // How Many: increase adults to 4
    await page.getByText("+").first().click();
    await page.getByText("+").first().click();
    await fillCounter(page);
    await page.waitForTimeout(300);

    // Calendar: single date
    await fillDate(page);
    await page.waitForTimeout(300);

    // Kitchen steps
    await fillKitchenSteps(page);

    // Allergies: select Nut Free and Dairy Free
    await page.getByRole("button", { name: "Nut Free", exact: true }).click();
    await page.getByRole("button", { name: "Dairy Free", exact: true }).click();
    await page.getByRole("button", { name: /continue|siguiente/i }).click();
    await page.waitForTimeout(300);

    // Contact form
    const json = await fillContactAndSubmit(page);

    expect(json.success).toBe(true);
    expect(json.data.where).toBe("Puerto Morelos");
    expect(json.data.what).toBe("Mezcal Experience");
    expect(json.data.adults).toBe("4");
    expect(json.data.selectedAllergies).toContain("Nut Free");
    expect(json.data.selectedAllergies).toContain("Dairy Free");

    await expect(page.getByText(/message received|mensaje recibido/i)).toBeVisible();
  });

  test("Flow 5: Spanish language - Private Chef", async ({ page }) => {
    await page.goto("/es/service");
    await page.waitForSelector(".service-flow");

    // Where: Playa del Carmen
    await clickButton(page, "Playa del Carmen");
    await page.waitForTimeout(300);

    // What: Chef Privado (index 0)
    await clickButton(page, "Chef Privado");
    await page.waitForTimeout(300);

    // Type: Servicio único (index 0)
    await clickButton(page, "Servicio único");
    await page.waitForTimeout(300);

    // How many
    await page.getByRole("button", { name: /siguiente/i }).click();
    await page.waitForTimeout(300);

    // Meal: Cena (index 2)
    await clickButton(page, "Cena");
    await page.waitForTimeout(300);

    // Food: Mexicano
    await page.getByRole("button", { name: "Mexicano", exact: true }).click();
    await page.getByRole("button", { name: /siguiente/i }).click();
    await page.waitForTimeout(300);

    // Kitchen: Gas, 3-4 quemadores, Sí
    await clickButton(page, "Gas");
    await page.waitForTimeout(300);
    await clickButton(page, "3 - 4 quemadores");
    await page.waitForTimeout(300);
    await clickButton(page, "Sí");
    await page.waitForTimeout(300);

    // Calendar
    await fillDate(page);
    await page.waitForTimeout(300);

    // Allergies: Sin gluten
    await page.getByRole("button", { name: "Sin gluten", exact: true }).click();
    await page.getByRole("button", { name: /siguiente/i }).click();
    await page.waitForTimeout(300);

    // Contact form
    await page.getByPlaceholder("Nombre *").fill("Usuario Prueba");
    await page.getByPlaceholder("Correo *").fill("prueba@ejemplo.com");
    const phoneInput = page.locator(".react-international-phone-input");
    await phoneInput.fill("9841796461");
    await page.getByPlaceholder("Mensaje").fill("Prueba E2E");

    const responsePromise = page.waitForResponse("**/api/send-email");
    await page.getByRole("button", { name: /enviar/i }).click();
    const response = await responsePromise;
    const json = await response.json();

    expect(json.success).toBe(true);
    expect(json.data.where).toBe("Playa del Carmen");
    expect(json.data.what).toBe("Chef Privado");

    await expect(page.getByText(/mensaje recibido/i)).toBeVisible();
  });
});
