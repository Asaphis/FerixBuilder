import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:5173";
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

try {
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.locator(".mobile-nav").getByRole("link", { name: "Log in" }).click();
  await page.waitForURL("**/dashboard");
  await page.getByText("Your project request is in progress").isVisible();
  await page.screenshot({ path: "/tmp/ferixbuilder-mobile-preview-login.png", fullPage: true });
  console.log("Visible mobile Login action → dashboard preview passed.");
} finally {
  await browser.close();
}
