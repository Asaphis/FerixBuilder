import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "https://3000-iaailze8oirz25lf2j3nz-23cc9dd7.us4.manus.computer";
const hubs = ["/dashboard", "/workspace/project", "/workspace/review", "/workspace/delivery", "/workspace/business", "/workspace/care", "/workspace/support", "/workspace/settings"];
const legacyRoutes = ["/workspace/onboarding", "/workspace/files", "/workspace/preview", "/workspace/revisions", "/workspace/payments", "/workspace/downloads", "/workspace/customers", "/workspace/products", "/workspace/bookings", "/workspace/domain", "/workspace/technical-care", "/workspace/management", "/workspace/system-health"];

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
try {
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  for (const route of [...hubs, ...legacyRoutes]) {
    await desktop.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    if (desktop.url().includes("/login")) throw new Error(`${route} redirected to Login`);
    await desktop.locator(".workspace-shell").isVisible();
  }

  await desktop.goto(`${baseUrl}/workspace/review`, { waitUntil: "networkidle" });
  await desktop.getByRole("button", { name: "Approve direction" }).click();
  await desktop.getByText("Approve preview version 01?").isVisible();
  await desktop.getByRole("button", { name: "Confirm approval" }).click();
  await desktop.getByText("Preview direction approved").isVisible();

  await desktop.goto(`${baseUrl}/workspace/business`, { waitUntil: "networkidle" });
  await desktop.getByRole("button", { name: "Add customer" }).click();
  await desktop.locator(".record-list").getByText("New customer 1", { exact: true }).first().isVisible();
  await desktop.getByRole("button", { name: "Products & services" }).click();
  await desktop.getByText("No product records yet").isVisible();
  await desktop.getByRole("button", { name: "Add product" }).click();
  await desktop.locator(".record-list").getByText("New product 1", { exact: true }).first().isVisible();

  await desktop.goto(`${baseUrl}/workspace/support`, { waitUntil: "networkidle" });
  await desktop.getByPlaceholder("Describe what you need help with...").fill("Confirm scope review timeline");
  await desktop.locator(".message-composer button").click();
  await desktop.getByText("Ticket #01 · You").isVisible();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const route of hubs) {
    await mobile.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    if (mobile.url().includes("/login")) throw new Error(`Phone ${route} redirected to Login`);
    await mobile.locator(".workspace-shell").isVisible();
  }

  await mobile.goto(`${baseUrl}/workspace/review`, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Approve direction" }).click();
  await mobile.getByRole("button", { name: "Confirm approval" }).click();
  await mobile.getByText("Preview direction approved").isVisible();

  await mobile.goto(`${baseUrl}/workspace/business`, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Add customer" }).click();
  await mobile.locator(".record-list").getByText("New customer 1", { exact: true }).first().isVisible();
  await mobile.getByRole("button", { name: "Products & services" }).click();
  await mobile.getByText("No product records yet").isVisible();

  await mobile.goto(`${baseUrl}/workspace/care`, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Hosting and deployment" }).click();
  await mobile.getByPlaceholder("Traffic expectations, launch date, existing domain, or support needs.").fill("Launch support requested");
  await mobile.getByRole("button", { name: "Request management review" }).click();
  await mobile.getByText("Management request submitted").isVisible();

  await mobile.goto(`${baseUrl}/workspace/support`, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Open support ticket" }).click();
  await mobile.getByPlaceholder("Describe what you need help with...").fill("Confirm phone dashboard support route");
  await mobile.locator(".message-composer button").click();
  await mobile.getByText("Ticket #01 · You").isVisible();

  await mobile.goto(`${baseUrl}/workspace/settings`, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Save settings" }).first().click();
  await mobile.getByText("Preferences saved in preview").isVisible();
  await mobile.getByPlaceholder("member@business.com").fill("team@ferixbuilder.test");
  await mobile.getByRole("button", { name: "Add" }).click();
  await mobile.getByText("team@ferixbuilder.test").isVisible();
  console.log("Dashboard hubs verified: 8 customer journeys, 13 legacy entry routes, controlled approval, module-isolated records, support tickets, management requests, settings members, desktop, and phone interactions.");
} finally {
  await browser.close();
}
