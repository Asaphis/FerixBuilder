import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "https://3000-iaailze8oirz25lf2j3nz-23cc9dd7.us4.manus.computer";
const hubs = ["/dashboard", "/workspace/project", "/workspace/review", "/workspace/delivery", "/workspace/business", "/workspace/care", "/workspace/support", "/workspace/settings"];
const legacyRoutes = ["/workspace/onboarding", "/workspace/files", "/workspace/preview", "/workspace/revisions", "/workspace/payments", "/workspace/downloads", "/workspace/customers", "/workspace/products", "/workspace/bookings", "/workspace/domain", "/workspace/technical-care", "/workspace/management", "/workspace/system-health"];

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
try {
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await desktop.route("**/api/trpc/contact.submit?**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify([{ result: { data: { json: { id: 1, accepted: true } } } }]),
    });
  });
  await desktop.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
  await desktop.getByRole("heading", { name: "LET’S BUILD SOMETHING USEFUL." }).isVisible();
  await desktop.getByLabel("Name").fill("Preview Test");
  await desktop.getByLabel("Business", { exact: true }).fill("FerixBuilder Preview");
  await desktop.getByLabel("Email").fill("preview@ferixbuilder.test");
  await desktop.getByLabel("What do you need?").selectOption("business_website");
  await desktop.getByLabel("Project context").fill("This browser submission is intercepted and never stored.");
  await desktop.getByRole("button", { name: "Send project brief" }).click();
  await desktop.getByText("YOUR BRIEF IS IN.").isVisible();
  const projectBrief = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await projectBrief.route("**/api/trpc/contact.submit?**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify([{ result: { data: { json: { id: 2, accepted: true } } } }]),
    });
  });
  await projectBrief.goto(`${baseUrl}/start-project`, { waitUntil: "networkidle" });
  await projectBrief.getByText("A focused, five-field first step").isVisible();
  await projectBrief.getByLabel("Name").fill("Preview Test");
  await projectBrief.getByLabel("Business", { exact: true }).fill("FerixBuilder Preview");
  await projectBrief.getByLabel("Email").fill("preview@ferixbuilder.test");
  await projectBrief.getByLabel("What do you need?").selectOption("business_website");
  await projectBrief.getByLabel("Project context").fill("This browser submission is intercepted and never stored.");
  await projectBrief.getByRole("button", { name: "Send project brief" }).click();
  await projectBrief.getByText("Create an account to track your project").isVisible();

  for (const route of [...hubs, ...legacyRoutes]) {
    await desktop.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    if (desktop.url().includes("/login")) throw new Error(`${route} redirected to Login`);
    await desktop.locator(".workspace-shell").isVisible();
  }

  const journeyContextChecks = [
    ["/workspace/project", "Project status"],
    ["/workspace/review", "Preview version"],
    ["/workspace/delivery", "Payment status"],
    ["/workspace/business", "Active module"],
    ["/workspace/care", "Management status"],
    ["/workspace/support", "Support route"],
    ["/workspace/settings", "Workspace profile"],
  ];
  for (const [route, contextLabel] of journeyContextChecks) {
    await desktop.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await desktop.locator(".journey-context-grid").getByText(contextLabel, { exact: true }).isVisible();
  }

  await desktop.goto(`${baseUrl}/dashboard`, { waitUntil: "networkidle" });
  await desktop.getByRole("button", { name: "Share preview link" }).click();
  await desktop.getByText("Preparing link…").isVisible();
  await desktop.getByRole("status").getByText("Private preview sharing is prepared for this preview session.").isVisible();
  await desktop.getByRole("button", { name: "This week" }).click();
  await desktop.getByText("Updating…").isVisible();
  await desktop.getByRole("status").getByText("Project progress has been refreshed for this preview.").isVisible();
  await desktop.getByRole("button", { name: "Open project" }).click();
  await desktop.getByText("Opening project…").isVisible();
  await desktop.getByRole("status").getByText("Project workspace is ready in preview mode.").isVisible();
  await desktop.waitForURL("**/workspace/project");
  await desktop.getByRole("button", { name: "Update project", exact: true }).click();
  await desktop.getByRole("button", { name: "Brief & onboarding" }).evaluate((button) => {
    if (!button.classList.contains("active")) throw new Error("Project action did not select Brief & onboarding");
  });

  await desktop.goto(`${baseUrl}/workspace/project`, { waitUntil: "networkidle" });
  await desktop.getByRole("button", { name: "Review quote decision" }).click();
  await desktop.getByText("Updating your project lifecycle…").isVisible();
  await desktop.getByRole("status").getByText("Quote decision is ready for your review in preview mode.").isVisible();

  await desktop.goto(`${baseUrl}/workspace/review`, { waitUntil: "networkidle" });
  await desktop.getByRole("button", { name: "Share private preview" }).click();
  await desktop.getByText("Updating your project lifecycle…").isVisible();
  await desktop.getByRole("status").getByText("Private preview sharing details are ready in preview mode.").isVisible();

  await desktop.goto(`${baseUrl}/workspace/delivery`, { waitUntil: "networkidle" });
  await desktop.getByRole("button", { name: "View payment route" }).click();
  await desktop.getByText("Updating your project lifecycle…").isVisible();
  await desktop.getByRole("status").getByText("The protected payment route is ready to review in preview mode.").isVisible();
  await desktop.getByRole("button", { name: "Release & downloads" }).click();
  await desktop.getByText("Released files will be protected.").isVisible();

  await desktop.goto(`${baseUrl}/workspace/review`, { waitUntil: "networkidle" });
  await desktop.getByRole("button", { name: "Approve direction" }).click();
  await desktop.getByText("Approve preview version 01?").isVisible();
  await desktop.getByRole("button", { name: "Confirm approval" }).click();
  await desktop.getByText("Preview direction approved").isVisible();

  await desktop.goto(`${baseUrl}/workspace/business`, { waitUntil: "networkidle" });
  await desktop.getByRole("button", { name: "Add customer" }).click();
  await desktop.locator(".record-list").getByText("New customer 1", { exact: true }).first().isVisible();
  await desktop.getByPlaceholder("Search customers").fill("New customer 1");
  await desktop.locator(".record-list").getByText("New customer 1", { exact: true }).first().isVisible();
  await desktop.getByRole("button", { name: "Active only" }).click();
  await desktop.getByText("No customer records match this view.").isVisible();
  await desktop.getByRole("button", { name: "Show all" }).click();
  await desktop.getByRole("button", { name: "Export view" }).click();
  await desktop.getByText("Protected export prepared in preview").isVisible();
  await desktop.locator(".record-list").getByRole("button", { name: "Open" }).click();
  await desktop.getByText("New customer 1", { exact: true }).last().isVisible();
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
  for (const [route] of journeyContextChecks) {
    await mobile.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await mobile.locator("#customer-workflow .workflow-surface").isVisible();
  }

  const compactPhone = await browser.newPage({ viewport: { width: 320, height: 740 } });
  for (const route of hubs) {
    await compactPhone.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const hasHorizontalOverflow = await compactPhone.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (hasHorizontalOverflow) throw new Error(`Compact phone ${route} has horizontal page overflow`);
  }

  await mobile.goto(`${baseUrl}/workspace/review`, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Approve direction" }).click();
  await mobile.getByRole("button", { name: "Confirm approval" }).click();
  await mobile.getByText("Preview direction approved").isVisible();

  await mobile.goto(`${baseUrl}/dashboard`, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Share preview link" }).click();
  await mobile.getByText("Preparing link…").isVisible();
  await mobile.getByRole("status").getByText("Private preview sharing is prepared for this preview session.").isVisible();
  await mobile.getByRole("button", { name: "Open project" }).click();
  await mobile.getByText("Opening project…").isVisible();
  await mobile.getByRole("status").getByText("Project workspace is ready in preview mode.").isVisible();
  await mobile.waitForURL("**/workspace/project");
  await mobile.getByRole("button", { name: "Update project", exact: true }).click();
  await mobile.getByRole("button", { name: "Brief & onboarding" }).evaluate((button) => {
    if (!button.classList.contains("active")) throw new Error("Phone Project action did not select Brief & onboarding");
  });

  await mobile.goto(`${baseUrl}/workspace/project`, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Review quote decision" }).click();
  await mobile.getByText("Updating your project lifecycle…").isVisible();
  await mobile.getByRole("status").getByText("Quote decision is ready for your review in preview mode.").isVisible();

  await mobile.goto(`${baseUrl}/workspace/review`, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Share private preview" }).click();
  await mobile.getByText("Updating your project lifecycle…").isVisible();
  await mobile.getByRole("status").getByText("Private preview sharing details are ready in preview mode.").isVisible();

  await mobile.goto(`${baseUrl}/workspace/delivery`, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "View payment route" }).click();
  await mobile.getByText("Updating your project lifecycle…").isVisible();
  await mobile.getByRole("status").getByText("The protected payment route is ready to review in preview mode.").isVisible();
  await mobile.getByRole("button", { name: "Release & downloads" }).click();
  await mobile.getByText("Released files will be protected.").isVisible();

  await mobile.goto(`${baseUrl}/workspace/business`, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Add customer" }).click();
  await mobile.locator(".record-list").getByText("New customer 1", { exact: true }).first().isVisible();
  await mobile.getByPlaceholder("Search customers").fill("New customer 1");
  await mobile.locator(".record-list").getByText("New customer 1", { exact: true }).first().isVisible();
  await mobile.getByRole("button", { name: "Active only" }).click();
  await mobile.getByText("No customer records match this view.").isVisible();
  await mobile.getByRole("button", { name: "Show all" }).click();
  await mobile.getByRole("button", { name: "Export view" }).click();
  await mobile.getByText("Protected export prepared in preview").isVisible();
  await mobile.locator(".record-list").getByRole("button", { name: "Open" }).click();
  await mobile.getByText("New customer 1", { exact: true }).last().isVisible();
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
  console.log("Dashboard hubs verified: intercepted public-form submission, lifecycle loading and success feedback, 8 customer journeys, 13 legacy entry routes, controlled approval, module-isolated records, support tickets, management requests, settings members, desktop, phone interactions, and 320px overflow safety.");
} finally {
  await browser.close();
}
