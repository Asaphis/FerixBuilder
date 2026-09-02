import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:5173";
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

try {
  await page.route("**/api/trpc/contact.submit**", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify([{ result: { data: { json: { success: true } } } }]) });
  });
  await page.goto(`${baseUrl}/start-project`, { waitUntil: "networkidle" });
  await page.getByPlaceholder("Your name").fill("Mobile Brief Customer");
  await page.getByPlaceholder("Business name").fill("Mobile Brief Commerce");
  await page.getByPlaceholder("you@business.com").fill("mobile.brief@example.com");
  await page.locator("select").selectOption("online_store");
  await page.getByPlaceholder("What does your business need to make easier, clearer, or possible?").fill("A responsive online store with WhatsApp contact and online ordering.");
  await page.getByRole("button", { name: "Send project brief" }).click();
  await page.getByText("YOUR BRIEF IS IN.").isVisible();
  await page.getByRole("link", { name: "Create account to track your project" }).click();
  await page.waitForURL("**/register");
  await page.getByPlaceholder("Your name").isVisible();
  if (await page.getByPlaceholder("Your name").inputValue() !== "Mobile Brief Customer") throw new Error("Project brief name was not carried into registration.");
  if (await page.getByPlaceholder("you@example.com").inputValue() !== "mobile.brief@example.com") throw new Error("Project brief email was not carried into registration.");
  await page.getByPlaceholder("+234 000 000 0000").fill("+2347000000000");
  await page.getByPlaceholder("At least 8 characters").fill("Mobile#2026");
  await page.getByPlaceholder("Repeat your password").fill("Mobile#2026");
  await page.getByLabel("I agree to the Terms of Service and Privacy Policy.").check();
  await page.getByRole("button", { name: "Create account" }).click();
  await page.waitForURL("**/verify-email");
  await page.getByPlaceholder("000000").fill("123456");
  await page.getByRole("button", { name: "Verify and continue" }).click();
  await page.waitForURL("**/workspace/onboarding");
  if (await page.getByPlaceholder("ABC Fashion").inputValue() !== "Mobile Brief Commerce") throw new Error("Project brief business name was not carried into onboarding.");
  await page.getByRole("button", { name: /Review/ }).click();
  await page.getByText("Online store", { exact: true }).isVisible();
  await page.getByText("A responsive online store with WhatsApp contact and online ordering.", { exact: true }).isVisible();
  await page.screenshot({ path: "/tmp/ferixbuilder-mobile-project-brief-flow.png", fullPage: true });
  console.log("Mobile project brief → registration → verification → onboarding handoff passed.");
} finally {
  await browser.close();
}
