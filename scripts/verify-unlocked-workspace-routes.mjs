import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:5173";
const routes = [
  "/dashboard", "/workspace/onboarding", "/workspace/project", "/workspace/files", "/workspace/preview", "/workspace/revisions", "/workspace/payments", "/workspace/downloads", "/workspace/customers", "/workspace/products", "/workspace/bookings", "/workspace/domain", "/workspace/technical-care", "/workspace/management", "/workspace/system-health", "/workspace/support", "/workspace/settings",
];

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
try {
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await desktop.goto(`${baseUrl}/dashboard`, { waitUntil: "networkidle" });
  for (const route of routes) {
    await desktop.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    if (new URL(desktop.url()).pathname !== route) throw new Error(`${route} redirected to ${desktop.url()}`);
    await desktop.locator(".workspace-shell").isVisible();
  }

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const route of routes) {
    await mobile.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    if (new URL(mobile.url()).pathname !== route) throw new Error(`Phone route ${route} redirected to ${mobile.url()}`);
    await mobile.locator(".workspace-shell").isVisible();
  }
  await mobile.screenshot({ path: "/tmp/ferixbuilder-unlocked-workspace-mobile.png", fullPage: true });
  console.log(`Unlocked preview access verified for ${routes.length} workspace routes on desktop and phone viewports.`);
} finally {
  await browser.close();
}
